package com.piyush.doctor_service.client;

import com.piyush.doctor_service.dto.PatientResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

@FeignClient(name = "patient-service", contextId = "patientClient")
public interface PatientClient {

    @GetMapping("/patients/{id}")
    PatientResponseDto getPatientById(@PathVariable Long id);

    @GetMapping("/patients")
    List<PatientResponseDto> getAllPatients(
            @RequestParam Integer page,
            @RequestParam Integer size,
            @RequestParam String sortBy,
            @RequestParam String sortDir);
}
