package com.piyush.patient_service.controller;

import com.piyush.patient_service.dto.LoginRequestDto;
import com.piyush.patient_service.dto.LoginResponseDto;
import com.piyush.patient_service.dto.SignUpRequestDto;
import com.piyush.patient_service.dto.SignUpResponseDto;
import com.piyush.patient_service.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity.ok(authService.login(loginRequestDto));
    }

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponseDto> login(@RequestBody SignUpRequestDto signUpRequestDto){
        return ResponseEntity.ok(authService.signup(signUpRequestDto));
    }


}
