package com.example.loanmanagement.repository;

import com.example.loanmanagement.entity.CapitalUsage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CapitalUsageRepository extends JpaRepository<CapitalUsage, Long> {
    // Add custom query methods if needed
}