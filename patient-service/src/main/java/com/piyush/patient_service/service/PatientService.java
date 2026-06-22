package com.piyush.patient_service.service;

import com.piyush.patient_service.dto.PatientResponseDto;
import com.piyush.patient_service.model.Patient;
import com.piyush.patient_service.repo.PatientRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepo patientRepo;
    private final ModelMapper modelMapper;

    @Transactional
    public PatientResponseDto getPatientById(Long patientId) {
        Patient patient = patientRepo.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient Not Found with id: " + patientId));
        return modelMapper.map(patient, PatientResponseDto.class);
    }

    // Method signature updated with Sort parameters
    public List<PatientResponseDto> getAllPatients(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        return patientRepo.findAllPatients(pageable)
                .getContent()
                .stream()
                .map(patient -> modelMapper.map(patient, PatientResponseDto.class))
                .collect(Collectors.toList());
    }
}