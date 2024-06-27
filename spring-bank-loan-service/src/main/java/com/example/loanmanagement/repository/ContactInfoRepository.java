package com.example.loanmanagement.repository;

import com.example.loanmanagement.entity.ContactInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactInfoRepository extends JpaRepository<ContactInfo, Long> {
    // Add custom query methods if needed
}