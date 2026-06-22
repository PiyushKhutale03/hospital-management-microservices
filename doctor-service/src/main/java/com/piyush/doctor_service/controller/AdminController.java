package com.piyush.doctor_service.controller;

import com.piyush.doctor_service.client.PatientClient;
import com.piyush.doctor_service.dto.DoctorResponseDto;
import com.piyush.doctor_service.dto.OnboardDoctorRequestDto;
import com.piyush.doctor_service.dto.PatientResponseDto;
import com.piyush.doctor_service.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final PatientClient patientClient;   // PatientService gone, Feign client aa gaya
    private final DoctorService doctorService;

    @GetMapping("/patients")
    public ResponseEntity<List<PatientResponseDto>> getAllPatients(
            @RequestParam(value = "page", defaultValue = "0") Integer pageNumber,
            @RequestParam(value = "size", defaultValue = "10") Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = "name") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir
    ) {
        return ResponseEntity.ok(patientClient.getAllPatients(pageNumber, pageSize, sortBy, sortDir));
    }

    @PostMapping("/onBoardNewDoctor")
    public ResponseEntity<DoctorResponseDto> onBoardNewDoctor(@RequestBody OnboardDoctorRequestDto onboardDoctorRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(doctorService.onBoardNewDoctor(onboardDoctorRequestDto));
    }
}