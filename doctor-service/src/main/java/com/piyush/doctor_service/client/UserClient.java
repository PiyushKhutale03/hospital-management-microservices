package com.piyush.doctor_service.client;

import com.piyush.doctor_service.dto.UserResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "patient-service", contextId = "userClient")
public interface UserClient {

    @GetMapping("/users/{id}")
    UserResponseDto getUserById(@PathVariable Long id);
}