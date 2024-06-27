package com.example.loanmanagement.controller;

import com.example.loanmanagement.entity.LoanDisbursement;
import com.example.loanmanagement.service.LoanDisbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DateTimeException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/loan-disbursements")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoanDisbursementController {

    @Autowired
    private LoanDisbursementService loanDisbursementService;

    @PostMapping
    public ResponseEntity<LoanDisbursement> createLoanDisbursement(@RequestBody LoanDisbursement loanDisbursement) {
        if (loanDisbursement.getMonthlyRepaymentDay() < 1 || loanDisbursement.getMonthlyRepaymentDay() > 30) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            LoanDisbursement createdDisbursement = loanDisbursementService.createLoanDisbursement(loanDisbursement);
            return new ResponseEntity<>(createdDisbursement, HttpStatus.CREATED);
        } catch (Exception e) {
            if (e instanceof DateTimeException) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanDisbursement> getLoanDisbursementById(@PathVariable Long id) {
        Optional<LoanDisbursement> loanDisbursementOptional = loanDisbursementService.getLoanDisbursementById(id);
        return loanDisbursementOptional.map(disbursement -> new ResponseEntity<>(disbursement, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<LoanDisbursement>> getAllLoanDisbursements() {
        List<LoanDisbursement> disbursements = loanDisbursementService.getAllLoanDisbursements();
        return new ResponseEntity<>(disbursements, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoanDisbursement> updateLoanDisbursement(@PathVariable Long id, @RequestBody LoanDisbursement updatedDisbursement) throws Exception {
        LoanDisbursement updated = loanDisbursementService.createLoanDisbursement(updatedDisbursement);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoanDisbursement(@PathVariable Long id) {
        loanDisbursementService.deleteLoanDisbursement(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}