package com.piyush.patient_service.repo;

import com.piyush.patient_service.model.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuranceRepo extends JpaRepository<Insurance,Long> {
}
