package com.example.loanmanagement.service;

import com.example.loanmanagement.entity.*;
import com.example.loanmanagement.model.payload.response.InterestCalculationResponse;
import com.example.loanmanagement.repository.LoanApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LoanApplicationService {
    private final LoanApplicationRepository loanApplicationRepository;

    @Autowired
    public LoanApplicationService(LoanApplicationRepository loanApplicationRepository) {
        this.loanApplicationRepository = loanApplicationRepository;
    }

    public List<LoanApplication> getAllLoanApplications() {
        return loanApplicationRepository.findAll();
    }

    public LoanApplication getLoanApplicationById(Long id) {
        return loanApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan application not found with id: " + id));
    }

    public LoanApplication saveLoanApplication(LoanApplication loanApplication) {
        return loanApplicationRepository.save(loanApplication);
    }

    public void deleteLoanApplication(Long id) {
        loanApplicationRepository.deleteById(id);
    }

    public double calculateInterest(Long id, EInterestCalculator type) {
        LoanApplication loanApplication = loanApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan application not found with id: " + id));
        LoanInfo loanInfo = loanApplication.getLoanInfo();
        if (loanInfo.getLoanInterestRate() < 0 || loanInfo.getLoanInterestRate() > 100) {
            throw new RuntimeException("Interest rate is out of range (0, 100) %");
        }
        // Calculate interest based on the provided loan information
        return (type == EInterestCalculator.SIMPLE) ? calculateSimpleInterest(loanInfo) : calculateCompoundInterest(loanInfo);
    }

    private double calculateSimpleInterest(LoanInfo loanInfo) {
        double principal = loanInfo.getLoanAmount();
        double rate = (loanInfo.getLoanInterestRate() + loanInfo.getInterestRateMargin()) / 100; // Add interest margin
        int term = loanInfo.getLoanTerm();

        return principal * rate * term;
    }

    // Function to calculate compound interest
    private double calculateCompoundInterest(LoanInfo loanInfo) {
        double principal = loanInfo.getLoanAmount();
        double rate = (loanInfo.getLoanInterestRate() + loanInfo.getInterestRateMargin()) / 100; // Add interest margin
        int term = loanInfo.getLoanTerm();

        return principal * (Math.pow((1 + rate), term)) - principal;
    }

    public void updateLoanStatus(Long loanApplicationId, ELoanStatus newStatus) {
        // Retrieve the loan application
        LoanApplication loanApplication = loanApplicationRepository.findById(loanApplicationId)
                .orElseThrow(() -> new IllegalArgumentException("Loan Application not found"));

        // Update the status
        loanApplication.setStatus(newStatus);

        // Save the changes to the database
        loanApplicationRepository.save(loanApplication);
    }

    // tiền gốc trả hàng tháng
    private double calculateMonthlyPrincipalPayment(LoanInfo loanInfo) {
        double principal = loanInfo.getLoanAmount();
        return principal / loanInfo.getLoanTerm();
    }

    // tền lãi phải trả theo tháng
    private double calculateMonthlyLoanInterest(LoanInfo loanInfo) {
        double principal = loanInfo.getLoanAmount();
        double ratePerMonth = loanInfo.getLoanInterestRate() / 100; // Convert annual interest rate to monthly rate
        return principal * ratePerMonth / loanInfo.getLoanTerm();
    }

    public InterestCalculationResponse calculateBasedInterestMonthly(Long id) {
        LoanApplication loanApplication = loanApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan application not found with id: " + id));
        LoanInfo loanInfo = loanApplication.getLoanInfo();
        // Calculate interest based on the provided loan information
        double based = this.calculateMonthlyPrincipalPayment(loanInfo);
        double interest = this.calculateMonthlyLoanInterest(loanInfo);
        double remain = loanInfo.getLoanAmount() - based;

        return new InterestCalculationResponse(remain, based, interest);
    }

    private List<InterestCalculationResponse> calculateDecreased(double sotien, double laixuat, int thoihanInt) {
        List<InterestCalculationResponse> icrs = new ArrayList<>();
        double TongGocphaitra = 0;
        double TongSotienlaiphaitra = 0;
        double Tong = 0;
        double thoihan = (double) thoihanInt;

        for (int i = 0; i <= thoihanInt; i++) {
            double gocconlai = sotien - (sotien / thoihan) * i;

            double gocphaitra = 0;
            double sotienlaiphaitra = 0;
            if (i == 1) {
                sotienlaiphaitra = sotien * laixuat / thoihan;
                gocphaitra = sotien / thoihan;
            } else if (i > 0) {
                gocphaitra = sotien / thoihan;
                sotienlaiphaitra = (sotien - (gocphaitra) * (i - 1)) / thoihan * laixuat;
            }

            icrs.add(new InterestCalculationResponse(gocconlai, gocphaitra, sotienlaiphaitra));

            TongGocphaitra += gocphaitra;
            TongSotienlaiphaitra += sotienlaiphaitra;
            Tong += gocphaitra + sotienlaiphaitra;
        }

        return icrs;
    }

    public List<InterestCalculationResponse> calculateDecreasedInterestMonthly(Long id) {
        LoanApplication loanApplication = loanApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan application not found with id: " + id));
        LoanInfo loanInfo = loanApplication.getLoanInfo();

        return this.calculateDecreased(loanInfo.getLoanAmount(), loanInfo.getLoanInterestRate(), loanInfo.getLoanTerm());
    }

    public List<LoanApplication> getLoanApplicationByAccountId(Long accountId) {
        return loanApplicationRepository.findAllByAccountInfoId(accountId);
    }

    public LoanApplication createNewLoanApplication(LoanApplication loanApplication) {
        loanApplication.setStatus(ELoanStatus.PENDING);
        return loanApplicationRepository.save(loanApplication);
    }
}
