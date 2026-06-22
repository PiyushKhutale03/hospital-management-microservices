package com.piyush.doctor_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {
    @Id
    private Long id;

    private Long userId;

    @Column(nullable = false, length = 100)
    private String name;
    @Column(length = 100)
    private String specialization;

    private String phoneNumber;

    @Column(unique = true, length = 100)
    private String email;

    private boolean available;

    @ManyToMany(mappedBy = "doctors")
    private Set<Department> department = new HashSet<>();

    @OneToMany(mappedBy = "doctor")
    private List<Appointment> appointments = new ArrayList<>();
}