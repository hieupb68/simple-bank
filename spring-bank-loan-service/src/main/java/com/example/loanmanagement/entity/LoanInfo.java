package com.example.loanmanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "loan_info")
public class LoanInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Positive
    @Column(name = "loan_amount")
    private double loanAmount;

    @NotNull
    @Positive
    @Column(name = "loan_term")
    private int loanTerm;

    @NotNull
    @Column(name = "current_earning")
    private double currentEarning;

    @Column(name = "loan_interest_rate")
    @Min(0)
    @Max(100)
    private double loanInterestRate = 0.06; // Default value: 6%

    @Column(name = "interest_rate_margin")
    @Min(0)
    @Max(100)
    private double interestRateMargin = 0.04; // Default value: 4%

    public LoanInfo() {
    }

    public LoanInfo(@NotNull double loanAmount, @NotNull int loanTerm, @NotNull double currentEearning, double loanInterestRate, double interestRateMargin) {
        this.loanAmount = loanAmount;
        this.loanTerm = loanTerm;
        this.currentEarning = currentEearning;
        this.loanInterestRate = loanInterestRate;
        this.interestRateMargin = interestRateMargin;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public int getLoanTerm() {
        return loanTerm;
    }

    public void setLoanTerm(int loanTerm) {
        this.loanTerm = loanTerm;
    }

    public double getCurrentEarning() {
        return currentEarning;
    }

    public void setCurrentEarning(double currentEarning) {
        this.currentEarning = currentEarning;
    }

    public double getLoanInterestRate() {
        return loanInterestRate;
    }

    public void setLoanInterestRate(double loanInterestRate) {
        this.loanInterestRate = loanInterestRate;
    }

    public double getInterestRateMargin() {
        return interestRateMargin;
    }

    public void setInterestRateMargin(double interestRateMargin) {
        this.interestRateMargin = interestRateMargin;
    }
}
