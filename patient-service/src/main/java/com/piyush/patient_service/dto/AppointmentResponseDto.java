package com.piyush.patient_service.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentResponseDto {
    private Long id;
    private LocalDateTime appointmentTime;
    private String symptoms;
    private DoctorResponseDto doctor;
}
