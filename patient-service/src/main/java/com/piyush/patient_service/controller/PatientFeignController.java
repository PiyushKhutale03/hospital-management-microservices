package com.piyush.patient_service.controller;

import com.piyush.patient_service.dto.AppointmentResponseDto;
import com.piyush.patient_service.dto.PatientResponseDto;
import com.piyush.patient_service.dto.UserResponseDto;
import com.piyush.patient_service.model.User;
import com.piyush.patient_service.repo.UserRepo;
import com.piyush.patient_service.service.AppointmentService;
import com.piyush.patient_service.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class PatientFeignController {

    private final PatientService patientService;
    private final UserRepo userRepo;
    private final AppointmentService appointmentService;

    @GetMapping("/patients")
    public ResponseEntity<List<PatientResponseDto>> getAllPatients(
            @RequestParam Integer page,
            @RequestParam Integer size,
            @RequestParam String sortBy,
            @RequestParam String sortDir) {
        return ResponseEntity.ok(patientService.getAllPatients(page, size, sortBy, sortDir));
    }

    @GetMapping("/patients/{id}")
    public ResponseEntity<PatientResponseDto> getPatientByIdForFeign(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    @GetMapping("/appointments/doctor")
    public ResponseEntity<List<AppointmentResponseDto>> getAppointmentsByDoctorId(@RequestParam Long doctorId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByDoctorId(doctorId));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        User user = userRepo.findById(id).orElseThrow();
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRoles(user.getRoles().stream().map(Enum::name).collect(Collectors.toSet()));
        return ResponseEntity.ok(dto);
    }
}