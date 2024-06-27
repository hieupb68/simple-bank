package com.example.loanmanagement.controller;

import com.example.loanmanagement.entity.AccountInfo;
import com.example.loanmanagement.entity.EInterestCalculator;
import com.example.loanmanagement.entity.ELoanStatus;
import com.example.loanmanagement.entity.LoanApplication;
import com.example.loanmanagement.model.payload.response.InterestCalculationResponse;
import com.example.loanmanagement.model.payload.response.MessageResponse;
import com.example.loanmanagement.service.AccountInfoService;
import com.example.loanmanagement.service.LoanApplicationService;
import com.example.loanmanagement.service.PersonalInfoService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/loanApplications")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoanApplicationController {

    @Autowired
    private LoanApplicationService loanApplicationService;
    @Autowired
    private PersonalInfoService personalInfoService;
    @Autowired
    private AccountInfoService accountInfoService;

    @GetMapping
    public ResponseEntity<List<LoanApplication>> getAllLoanApplications() {
        List<LoanApplication> loanApplications = loanApplicationService.getAllLoanApplications();
        return new ResponseEntity<>(loanApplications, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanApplication> getLoanApplicationById(@PathVariable Long id) {
        LoanApplication loanApplication = loanApplicationService.getLoanApplicationById(id);
        return new ResponseEntity<>(loanApplication, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createLoanApplication(@RequestBody LoanApplication loanApplication) {
        System.out.println("createLoanApplication: " + loanApplication.toString());
        if (loanApplication.getPersonalInfo().getId() > 0) {
            if (!personalInfoService.isIdNumberUnique(loanApplication.getPersonalInfo().getIdNumber())) {
                return new ResponseEntity<>(new MessageResponse("DUPLICATE idNumber"), HttpStatus.CONFLICT);
            }
            LoanApplication createdLoanApplication = loanApplicationService.createNewLoanApplication(loanApplication);
            return new ResponseEntity<>(createdLoanApplication, HttpStatus.CREATED);
        }

        LoanApplication createdLoanApplication = loanApplicationService.createNewLoanApplication(loanApplication);
        return new ResponseEntity<>(createdLoanApplication, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoanApplication> updateLoanApplication(@PathVariable Long id, @RequestBody LoanApplication loanApplication) {
        loanApplication.setId(id);
        LoanApplication updatedLoanApplication = loanApplicationService.saveLoanApplication(loanApplication);
        return new ResponseEntity<>(updatedLoanApplication, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoanApplication(@PathVariable Long id) {
        loanApplicationService.deleteLoanApplication(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/interest/loan/{id}")
    public ResponseEntity<MessageResponse> interestCalculation(@PathVariable Long id, @PathParam("type") EInterestCalculator type) {
        double interest = loanApplicationService.calculateInterest(id, type);
        MessageResponse messageResponse = new MessageResponse("" + interest);
        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }

    @PutMapping("/{applicationId}/approve")
    public void approveLoanApplication(@PathVariable Long applicationId) {
        loanApplicationService.updateLoanStatus(applicationId, ELoanStatus.APPROVED);
    }

    @PutMapping("/{applicationId}/deny")
    public void denyLoanApplication(@PathVariable Long applicationId) {
        loanApplicationService.updateLoanStatus(applicationId, ELoanStatus.REJECTED);
    }

    @GetMapping("/interest/based/{id}")
    public ResponseEntity<InterestCalculationResponse> basedInterestCalculation(@PathVariable Long id) {
        InterestCalculationResponse basedInterestCalculationResponse = loanApplicationService.calculateBasedInterestMonthly(id);
        return new ResponseEntity<>(basedInterestCalculationResponse, HttpStatus.OK);
    }

    @GetMapping("/interest/decrease/{id}")
    public ResponseEntity<List<InterestCalculationResponse>> decreaseInterestCalculation(@PathVariable Long id) {
        List<InterestCalculationResponse> basedInterestCalculationResponses = loanApplicationService.calculateDecreasedInterestMonthly(id);
        return new ResponseEntity<>(basedInterestCalculationResponses, HttpStatus.OK);
    }

    @GetMapping("/account/{id}")
    public ResponseEntity<List<LoanApplication>> getApplicationByAccountInfoId(@PathVariable Long id) {
        List<LoanApplication> applications = loanApplicationService.getLoanApplicationByAccountId(id)
                .stream().toList();
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<LoanApplication>> getApplicationbyUserId(@PathVariable Long id) {
        Optional<AccountInfo> accountInfo = accountInfoService.getAccountInfoByUserId(id);
        if (accountInfo.isPresent()) {
            List<LoanApplication> applications = loanApplicationService.getLoanApplicationByAccountId(accountInfo.get().getId())
                    .stream().toList();
            return new ResponseEntity<>(applications, HttpStatus.OK);
        }

        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }
}