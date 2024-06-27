package com.example.loanmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "loan_application")
public class LoanApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_info_id")
    private AccountInfo accountInfo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "personal_info_id")
    private PersonalInfo personalInfo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_info_1_id")
    private ContactInfo contactInfo1;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_info_2_id")
    private ContactInfo contactInfo2;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "loan_info_id")
    private LoanInfo loanInfo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "capital_usage_id")
    private CapitalUsage capitalUsage;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "loan_insurance_id")
    private LoanInsurance loanInsurance;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ELoanStatus status = ELoanStatus.PENDING;

    @Column(name = "reference_number")
    private String referenceNumber;

    public LoanApplication() {

    }

    public LoanApplication(AccountInfo accountInfo, PersonalInfo personalInfo, ContactInfo contactInfo1, ContactInfo contactInfo2,LoanInfo loanInfo, CapitalUsage capitalUsage, LoanInsurance loanInsurance, ELoanStatus status, String referenceNumber) {
        this.accountInfo = accountInfo;
        this.personalInfo = personalInfo;
        this.contactInfo1 = contactInfo1;
        this.contactInfo2 = contactInfo2;
        this.loanInfo = loanInfo;
        this.capitalUsage = capitalUsage;
        this.loanInsurance = loanInsurance;
        this.status = status;
        this.referenceNumber = referenceNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AccountInfo getAccountInfo() {
        return accountInfo;
    }

    public void setAccountInfo(AccountInfo accountInfo) {
        this.accountInfo = accountInfo;
    }

    public PersonalInfo getPersonalInfo() {
        return personalInfo;
    }

    public void setPersonalInfo(PersonalInfo personalInfo) {
        this.personalInfo = personalInfo;
    }

    public ContactInfo getContactInfo1() {
        return contactInfo1;
    }

    public void setContactInfo1(ContactInfo contactInfo) {
        this.contactInfo1 = contactInfo;
    }

    public ContactInfo getContactInfo2() {
        return contactInfo2;
    }

    public void setContactInfo2(ContactInfo contactInfo) {
        this.contactInfo2 = contactInfo;
    }

    public LoanInfo getLoanInfo() {
        return loanInfo;
    }

    public void setLoanInfo(LoanInfo loanInfo) {
        this.loanInfo = loanInfo;
    }

    public CapitalUsage getCapitalUsage() {
        return capitalUsage;
    }

    public void setCapitalUsage(CapitalUsage capitalUsage) {
        this.capitalUsage = capitalUsage;
    }

    public LoanInsurance getLoanInsurance() {
        return loanInsurance;
    }

    public void setLoanInsurance(LoanInsurance loanInsurance) {
        this.loanInsurance = loanInsurance;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public ELoanStatus getStatus() {
        return status;
    }

    public void setStatus(ELoanStatus status) {
        this.status = status;
    }
}
