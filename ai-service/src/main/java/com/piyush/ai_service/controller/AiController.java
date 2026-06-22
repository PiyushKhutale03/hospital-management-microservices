package com.piyush.ai_service.controller;

import com.piyush.ai_service.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService; // ✅ Service inject karo

    @PostMapping("/symptom-check")
    public String checkSymptoms(@RequestBody String symptoms) {
        return aiService.checkSymptoms(symptoms);
    }

    @PostMapping("/doctor-recommend")
    public String recommendDoctor(@RequestBody String condition) {
        return aiService.recommendDoctor(condition);
    }

    @PostMapping("/medicine-info")
    public String getMedicineInfo(@RequestBody String medicine) {
        return aiService.getMedicineInfo(medicine);
    }

    @PostMapping("/medicine-interaction")
    public String checkMedicineInteraction(@RequestBody String medicines) {
        return aiService.checkMedicineInteraction(medicines);
    }

    @PostMapping("/emergency-check")
    public String checkEmergency(@RequestBody String symptoms) {
        return aiService.checkEmergency(symptoms);
    }

    @PostMapping("/diet-advice")
    public String getDietAdvice(@RequestBody String condition) {
        return aiService.getDietAdvice(condition);
    }
}