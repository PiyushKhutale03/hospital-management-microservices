package com.piyush.patient_service.client;

import com.piyush.patient_service.dto.DoctorResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "doctor-service", contextId = "doctorClient")
public interface DoctorClient {

    @GetMapping("/doctors/{id}")
    DoctorResponseDto getDoctorById(@PathVariable Long id);
}