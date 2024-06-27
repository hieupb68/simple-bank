package com.example.loanmanagement.repository;

import com.example.loanmanagement.entity.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    // Add custom query methods if needed
    List<LoanApplication> findAllByAccountInfoId(Long accountId);
}