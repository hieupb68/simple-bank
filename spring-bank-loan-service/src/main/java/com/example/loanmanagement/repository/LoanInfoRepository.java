package com.example.loanmanagement.repository;

import com.example.loanmanagement.entity.LoanInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanInfoRepository extends JpaRepository<LoanInfo, Long> {
    // Add custom query methods if needed
}
