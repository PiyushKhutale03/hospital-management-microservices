package com.piyush.ai_service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiService {

    private final ChatClient chatClient;

    public String checkSymptoms(String symptoms) {
        return chatClient.prompt()
                .user("Patient has these symptoms: " + symptoms +
                        ". What could be the possible disease? Which doctor to consult?")
                .call()
                .content();
    }

    public String recommendDoctor(String condition) {
        return chatClient.prompt()
                .user("For condition: " + condition +
                        ". Which specialist doctor should patient consult?")
                .call()
                .content();
    }

    public String getMedicineInfo(String medicine) {
        return chatClient.prompt()
                .user("Tell me about medicine: " + medicine +
                        ". Uses, side effects, dosage, precautions.")
                .call()
                .content();
    }

    public String checkMedicineInteraction(String medicines) {
        return chatClient.prompt()
                .user("Check if safe to take together: " + medicines +
                        ". Any dangerous interactions?")
                .call()
                .content();
    }

    public String checkEmergency(String symptoms) {
        return chatClient.prompt()
                .user("Symptoms: " + symptoms +
                        ". Is this a medical emergency? Should patient go to ER?")
                .call()
                .content();
    }

    public String getDietAdvice(String condition) {
        return chatClient.prompt()
                .user("Diet advice for patient with: " + condition +
                        ". Foods to eat and avoid.")
                .call()
                .content();
    }
}
