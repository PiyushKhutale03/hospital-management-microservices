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
                .user("Patient reports these symptoms: " + symptoms +
                        ". What could be the possible health condition or disease? Provide possible causes, severity level, and which specialist doctor they should consult.")
                .call()
                .content();
    }

    public String recommendDoctor(String condition) {
        return chatClient.prompt()
                .user("For medical condition: " + condition +
                        ". Which specialist physician or surgeon should the patient consult and why? Mention diagnostic tests they might need.")
                .call()
                .content();
    }

    public String getMedicineInfo(String medicine) {
        return chatClient.prompt()
                .user("Provide a detailed clinical profile for medicine/supplement: " + medicine +
                        ". Include primary uses, typical adult dosage guidelines, precautions, common side effects, and contraindications.")
                .call()
                .content();
    }

    public String checkMedicineInteraction(String medicines) {
        return chatClient.prompt()
                .user("Analyze drug-to-drug interactions and safety for taking these together: " + medicines +
                        ". Are there any dangerous interactions, timing recommendations, or precautions?")
                .call()
                .content();
    }

    public String checkEmergency(String symptoms) {
        return chatClient.prompt()
                .user("Emergency Triage Evaluation for symptoms: " + symptoms +
                        ". Is this an acute or life-threatening medical emergency? Provide immediate first-aid guidance and specify whether they should call 108 / 112 ambulance or visit the ER immediately.")
                .call()
                .content();
    }

    public String getDietAdvice(String query) {
        return chatClient.prompt()
                .user("Clinical Diet & Nutrition advice for: " + query +
                        ". Provide detailed nutritional facts, protein/macro breakdown if applicable, foods to eat, foods to avoid, and health tips.")
                .call()
                .content();
    }
}
