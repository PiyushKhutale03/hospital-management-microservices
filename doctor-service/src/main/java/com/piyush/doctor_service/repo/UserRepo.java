package com.piyush.doctor_service.repo;

import com.piyush.doctor_service.model.User;
import com.piyush.doctor_service.model.type.AuthProviderType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByProviderIdAndProviderType(String providerId, AuthProviderType providerType);
}
