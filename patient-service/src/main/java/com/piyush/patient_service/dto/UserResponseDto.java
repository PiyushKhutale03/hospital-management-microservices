package com.piyush.patient_service.dto;

import lombok.Data;
import java.util.Set;

@Data
public class UserResponseDto {
    private Long id;
    private String username;
    private Set<String> roles;
}