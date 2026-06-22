package com.piyush.patient_service.service;

import com.piyush.patient_service.dto.LoginRequestDto;
import com.piyush.patient_service.dto.LoginResponseDto;
import com.piyush.patient_service.dto.SignUpRequestDto;
import com.piyush.patient_service.dto.SignUpResponseDto;
import com.piyush.patient_service.model.Patient;
import com.piyush.patient_service.model.User;
import com.piyush.patient_service.model.type.AuthProviderType;
import com.piyush.patient_service.repo.PatientRepo;
import com.piyush.patient_service.repo.UserRepo;
import com.piyush.patient_service.security.AuthUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final PatientRepo patientRepo;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getUsername(),
                        loginRequestDto.getPassword()
                )
        );
        User user = (User) authentication.getPrincipal();
        String token = authUtil.generateAccessToken(user);
        return new LoginResponseDto(token, user.getId());
    }

    @Transactional
    public SignUpResponseDto signup(SignUpRequestDto signUpRequestDto) {
        User user = User.builder()
                .username(signUpRequestDto.getUsername())
                .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
                .providerType(AuthProviderType.EMAIL)
                .roles(signUpRequestDto.getRoles())
                .build();
        user = userRepo.save(user);

        Patient patient = Patient.builder()
                .name(signUpRequestDto.getName())
                .email(signUpRequestDto.getUsername())
                .user(user)
                .build();
        patientRepo.save(patient);

        return new SignUpResponseDto(user.getId(), user.getUsername());
    }
}
