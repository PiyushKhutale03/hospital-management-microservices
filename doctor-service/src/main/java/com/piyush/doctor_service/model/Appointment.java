package com.piyush.doctor_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor @AllArgsConstructor
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symptoms;
    private LocalDateTime appointmentTime;
    private String status;

    @ManyToOne
    @JoinColumn(name = "doctor_user_id")
    private Doctor doctor;
}
