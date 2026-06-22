package com.piyush.doctor_service.controller;

import com.piyush.doctor_service.client.AppointmentClient;
import com.piyush.doctor_service.dto.AppointmentResponseDto;
import com.piyush.doctor_service.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final AppointmentClient appointmentClient;  // AppointmentService gone, Feign client aa gaya

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentResponseDto>> getAllAppointmentsOfDoctor() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(appointmentClient.getAppointmentsByDoctorId(user.getId()));
    }
}