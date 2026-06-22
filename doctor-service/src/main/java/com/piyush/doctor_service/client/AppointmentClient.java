package com.piyush.doctor_service.client;

import com.piyush.doctor_service.dto.AppointmentResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

@FeignClient(name = "patient-service", contextId = "appointmentClient", fallback = AppointmentClientFallback.class)
public interface AppointmentClient {

    @GetMapping("/appointments/doctor")
    List<AppointmentResponseDto> getAppointmentsByDoctorId(@RequestParam Long doctorId);
}
