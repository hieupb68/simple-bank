package com.example.loanmanagement.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "capital_usage")
public class CapitalUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "total_capital")
    private double totalCapital;

    @Column(name = "purpose")
    private String purpose;

    @Column(name = "source")
    private String source;

    public CapitalUsage() {
    }

    public CapitalUsage(@NotNull double totalCapital, String purpose, String source) {
        this.totalCapital = totalCapital;
        this.purpose = purpose;
        this.source = source;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getTotalCapital() {
        return totalCapital;
    }

    public void setTotalCapital(double totalCapital) {
        this.totalCapital = totalCapital;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}