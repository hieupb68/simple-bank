package com.example.loanmanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.util.Date;

@Entity
@Table(name = "loan_disbursement")
public class LoanDisbursement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "loan_application_id", nullable = false)
    private LoanApplication loanApplication;

    @Column(name = "disbursement_date", nullable = false)
    private Date disbursementDate;

    @Min(1)
    @Max(31)
    @Column(name = "monthly_repayment_day", nullable = false)
    private int monthlyRepaymentDay;

    public LoanDisbursement() {
    }

    public LoanDisbursement(LoanApplication loanApplication, Date disbursementDate, int monthlyRepaymentDay) {
        this.loanApplication = loanApplication;
        this.disbursementDate = disbursementDate;
        this.monthlyRepaymentDay = monthlyRepaymentDay;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LoanApplication getLoanApplication() {
        return loanApplication;
    }

    public void setLoanApplication(LoanApplication loanApplication) {
        this.loanApplication = loanApplication;
    }

    public Date getDisbursementDate() {
        return disbursementDate;
    }

    public void setDisbursementDate(Date disbursementDate) {
        this.disbursementDate = disbursementDate;
    }

    public int getMonthlyRepaymentDay() {
        return monthlyRepaymentDay;
    }

    public void setMonthlyRepaymentDay(int monthlyRepaymentDay) {
        this.monthlyRepaymentDay = monthlyRepaymentDay;
    }
}
