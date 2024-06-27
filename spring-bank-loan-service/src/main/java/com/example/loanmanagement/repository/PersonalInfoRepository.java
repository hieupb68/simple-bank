package com.example.loanmanagement.repository;

import com.example.loanmanagement.entity.PersonalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonalInfoRepository extends JpaRepository<PersonalInfo, Long> {
    // Add custom query methods if needed
    Optional<PersonalInfo> findByIdNumber(String idNumber);
}
