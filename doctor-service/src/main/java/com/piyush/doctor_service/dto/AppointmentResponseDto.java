package com.piyush.doctor_service.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AppointmentResponseDto {
    private Long id;
    private String symptoms;
    private String status;
    private String doctorName;
    private LocalDateTime appointmentTime;
    private PatientResponseDto patient;
}