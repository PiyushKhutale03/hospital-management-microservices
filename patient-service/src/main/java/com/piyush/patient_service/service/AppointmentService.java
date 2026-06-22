package com.piyush.patient_service.service;

import com.piyush.patient_service.client.DoctorClient;
import com.piyush.patient_service.dto.AppointmentResponseDto;
import com.piyush.patient_service.dto.CreateAppointmentRequestDto;
import com.piyush.patient_service.dto.DoctorResponseDto;
import com.piyush.patient_service.model.Appointment;
import com.piyush.patient_service.model.Patient;
import com.piyush.patient_service.repo.AppointmentRepo;
import com.piyush.patient_service.repo.PatientRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepo appointmentRepo;
    private final PatientRepo patientRepo;
    private final DoctorClient doctorClient;
    private final ModelMapper modelMapper;

    @Transactional
    public AppointmentResponseDto createNewAppointment(CreateAppointmentRequestDto dto) {
        Patient patient = patientRepo.findById(dto.getPatientId())
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        DoctorResponseDto doctor = doctorClient.getDoctorById(dto.getDoctorId());

        Appointment appointment = Appointment.builder()
                .symptoms(dto.getReason())
                .appointmentTime(dto.getAppointmentTime())
                .doctorName(doctor.getName())
                .patient(patient)
                .build();

        appointment = appointmentRepo.save(appointment);

        AppointmentResponseDto response = modelMapper.map(appointment, AppointmentResponseDto.class);
        response.setDoctor(doctor);
        return response;
    }

    public List<AppointmentResponseDto> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepo.findByDoctorId(doctorId)
                .stream()
                .map(a -> modelMapper.map(a, AppointmentResponseDto.class))
                .collect(Collectors.toList());
    }
}