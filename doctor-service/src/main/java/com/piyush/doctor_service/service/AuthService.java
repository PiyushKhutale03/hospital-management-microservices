package com.piyush.doctor_service.service;

import com.piyush.doctor_service.dto.LoginRequestDto;
import com.piyush.doctor_service.dto.LoginResponseDto;
import com.piyush.doctor_service.dto.SignUpRequestDto;
import com.piyush.doctor_service.dto.SignUpResponseDto;
import com.piyush.doctor_service.model.User;
import com.piyush.doctor_service.model.type.AuthProviderType;
import com.piyush.doctor_service.repo.UserRepo;
import com.piyush.doctor_service.security.AuthUtil;
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

    public SignUpResponseDto signup(SignUpRequestDto signUpRequestDto) {
        User user = User.builder()
                .username(signUpRequestDto.getUsername())
                .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
                .providerType(AuthProviderType.EMAIL)
                .roles(signUpRequestDto.getRoles())
                .build();
        user = userRepo.save(user);
        return new SignUpResponseDto(user.getId(), user.getUsername());
    }
}