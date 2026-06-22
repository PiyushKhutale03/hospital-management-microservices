package com.piyush.doctor_service.client;

import com.piyush.doctor_service.dto.AppointmentResponseDto;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class AppointmentClientFallback implements AppointmentClient {

    @Override
    public List<AppointmentResponseDto> getAppointmentsByDoctorId(Long doctorId) {
        return List.of(); // patient-service down ho toh empty list
    }
}