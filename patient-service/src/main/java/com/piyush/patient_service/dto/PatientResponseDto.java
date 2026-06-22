package com.piyush.patient_service.dto;

import com.piyush.patient_service.model.type.BloodGroupType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PatientResponseDto {
    private Long id;
    private String name;
    private String gender;
    private LocalDate birthDate;
    private BloodGroupType bloodGroup;
}
