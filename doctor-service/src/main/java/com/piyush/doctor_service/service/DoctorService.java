package com.piyush.doctor_service.service;

import com.piyush.doctor_service.client.UserClient;
import com.piyush.doctor_service.dto.DoctorResponseDto;
import com.piyush.doctor_service.dto.OnboardDoctorRequestDto;
import com.piyush.doctor_service.dto.UserResponseDto;
import com.piyush.doctor_service.model.Doctor;
import com.piyush.doctor_service.model.User;
import com.piyush.doctor_service.model.type.RoleType;
import com.piyush.doctor_service.repo.DoctorRepo;
import com.piyush.doctor_service.repo.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class DoctorService {
    private final DoctorRepo doctorRepo;
    private final ModelMapper modelMapper;
    private final UserClient userClient;   // ✅ UserRepo hata diya, UserClient add kiya

    @Transactional
    public DoctorResponseDto onBoardNewDoctor(OnboardDoctorRequestDto onboardDoctorRequestDto) {
        UserResponseDto user = userClient.getUserById(onboardDoctorRequestDto.getUserId());

        if (doctorRepo.existsById(user.getId())) {
            throw new IllegalArgumentException("Already a Doctor");
        }

        Doctor doctor = Doctor.builder()
                .id(user.getId())
                .userId(user.getId())
                .name(onboardDoctorRequestDto.getName())
                .specialization(onboardDoctorRequestDto.getSpecialization())
                .build();

        return modelMapper.map(doctorRepo.save(doctor), DoctorResponseDto.class);
    }

    public List<DoctorResponseDto> getAllDoctors() {
        return doctorRepo.findAll()
                .stream()
                .map(doctor -> modelMapper.map(doctor, DoctorResponseDto.class))
                .collect(Collectors.toList());
    }
}
