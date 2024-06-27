package com.example.loanmanagement.model.payload.response;

public class InterestCalculationResponse {
    private double remainAmount;
    private double basedAmount;
    private double interestAmount;
    private double total;

    public InterestCalculationResponse(double remainAmount, double basedAmount, double interestAmount) {
        this.remainAmount = remainAmount;
        this.basedAmount = basedAmount;
        this.interestAmount = interestAmount;
        this.total = basedAmount + interestAmount;
    }

    public double getRemainAmount() {
        return remainAmount;
    }

    public void setRemainAmount(double remainAmount) {
        this.remainAmount = remainAmount;
    }

    public double getBasedAmount() {
        return basedAmount;
    }

    public void setBasedAmount(double basedAmount) {
        this.basedAmount = basedAmount;
    }

    public double getInterestAmount() {
        return interestAmount;
    }

    public void setInterestAmount(double interestAmount) {
        this.interestAmount = interestAmount;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}
