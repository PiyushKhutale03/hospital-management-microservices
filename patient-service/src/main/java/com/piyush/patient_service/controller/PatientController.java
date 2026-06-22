package com.piyush.patient_service.controller;


import com.piyush.patient_service.dto.AppointmentResponseDto;
import com.piyush.patient_service.dto.CreateAppointmentRequestDto;
import com.piyush.patient_service.dto.PatientResponseDto;
import com.piyush.patient_service.model.User;
import com.piyush.patient_service.service.AppointmentService;
import com.piyush.patient_service.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patient")
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;
    private final AppointmentService appointmentService;

    @PostMapping("/appointments")
    public ResponseEntity<AppointmentResponseDto> createNewAppointment(@RequestBody CreateAppointmentRequestDto createAppointmentRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(appointmentService.createNewAppointment(createAppointmentRequestDto));
    }

    @GetMapping("/profile")
    private ResponseEntity<PatientResponseDto> getPatientProfile() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long patientId = user.getId();
        return ResponseEntity.ok(patientService.getPatientById(patientId));
    }

    @GetMapping("/appointments/doctor")
    public ResponseEntity<List<AppointmentResponseDto>> getAppointmentsByDoctorId(
            @RequestParam Long doctorId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByDoctorId(doctorId));
    }

}
