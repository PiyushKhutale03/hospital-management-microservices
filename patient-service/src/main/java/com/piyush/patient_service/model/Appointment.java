package com.piyush.patient_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Appointment {

    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @ToString.Exclude
//    @JoinColumn(nullable = false)
//    private Doctor doctor;

    @Column(nullable = false)
    private Long doctorId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer age;

    @Column(length = 500)
    private String symptoms;

    private String phoneNumber;

    @Column(nullable = false)
    private LocalDateTime appointmentTime;

    private String status;
    private String doctorName;
}
