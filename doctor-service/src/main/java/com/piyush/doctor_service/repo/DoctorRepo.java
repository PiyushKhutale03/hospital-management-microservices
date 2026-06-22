package com.piyush.doctor_service.repo;

import com.piyush.doctor_service.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepo extends JpaRepository<Doctor,Long> {
}
