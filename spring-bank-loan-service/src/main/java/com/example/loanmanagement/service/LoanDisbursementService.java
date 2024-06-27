package com.example.loanmanagement.service;

import com.example.loanmanagement.entity.LoanDisbursement;
import com.example.loanmanagement.repository.LoanDisbursementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.ranges.RangeException;

import java.time.DateTimeException;
import java.util.List;
import java.util.Optional;

@Service
public class LoanDisbursementService {

    @Autowired
    private LoanDisbursementRepository loanDisbursementRepository;

    public LoanDisbursement createLoanDisbursement(LoanDisbursement loanDisbursement) {
        if (loanDisbursement.getMonthlyRepaymentDay() < 1 || loanDisbursement.getMonthlyRepaymentDay() > 30) {
            throw new RuntimeException("The payment day of the loan should be between 1 and 30");
        }
        // Implement logic to create a new loan disbursement
        return loanDisbursementRepository.save(loanDisbursement);
    }

    public Optional<LoanDisbursement> getLoanDisbursementById(Long id) {
        return loanDisbursementRepository.findById(id);
    }

    public List<LoanDisbursement> getAllLoanDisbursements() {
        return loanDisbursementRepository.findAll();
    }

    public void deleteLoanDisbursement(Long id) {
        loanDisbursementRepository.deleteById(id);
    }
}