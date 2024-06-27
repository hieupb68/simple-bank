package com.example.loanmanagement.repository;

import com.example.loanmanagement.entity.LoanInsurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanInsuranceRepository extends JpaRepository<LoanInsurance, Long> {
    // Add custom query methods if needed
}