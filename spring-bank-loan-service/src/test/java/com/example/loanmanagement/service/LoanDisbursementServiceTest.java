package com.example.loanmanagement.service;

import com.example.loanmanagement.controller.LoanDisbursementController;
import com.example.loanmanagement.entity.LoanApplication;
import com.example.loanmanagement.entity.LoanDisbursement;
import com.example.loanmanagement.repository.LoanDisbursementRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class LoanDisbursementServiceTest {
    @Mock
    private LoanDisbursementRepository loanDisbursementRepository;

    @InjectMocks
    private LoanDisbursementService loanDisbursementService;

    @Mock
    private LoanDisbursementService _loanDisbursementService;
    @InjectMocks
    private LoanDisbursementController loanDisbursementController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // Test Case: createLoanDisbursement
    @Test
    public void testCreateLoanDisbursement() throws Exception {
        LoanApplication loanApplication = new LoanApplication(); // Create a sample LoanApplication
        LoanDisbursement loanDisbursement = new LoanDisbursement(loanApplication, new Date(), 15);

        when(loanDisbursementRepository.save(loanDisbursement)).thenReturn(loanDisbursement);

        LoanDisbursement result = loanDisbursementService.createLoanDisbursement(loanDisbursement);

        assertEquals(loanDisbursement, result);
        verify(loanDisbursementRepository, times(1)).save(loanDisbursement);
    }

    // Test Case: getLoanDisbursementById (Found)
    @Test
    public void testGetLoanDisbursementById_Found() {
        LoanApplication loanApplication = new LoanApplication(); // Create a sample LoanApplication
        LoanDisbursement loanDisbursement = new LoanDisbursement(loanApplication, new Date(), 15);

        when(loanDisbursementRepository.findById(1L)).thenReturn(Optional.of(loanDisbursement));

        Optional<LoanDisbursement> result = loanDisbursementService.getLoanDisbursementById(1L);

        assertTrue(result.isPresent());
        assertEquals(loanDisbursement, result.get());
    }

    // Test Case: getLoanDisbursementById (Not Found)
    @Test
    public void testGetLoanDisbursementById_NotFound() {
        when(loanDisbursementRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<LoanDisbursement> result = loanDisbursementService.getLoanDisbursementById(1L);

        assertFalse(result.isPresent());
    }

    // Test Case: getAllLoanDisbursements
    @Test
    public void testGetAllLoanDisbursements() {
        // ... (Create sample LoanDisbursement objects)
        LoanApplication loanApplication = new LoanApplication(); // Create a sample LoanApplication
        LoanDisbursement loanDisbursement = new LoanDisbursement(loanApplication, new Date(), 15);
        List<LoanDisbursement> disbursements = Arrays.asList(loanDisbursement);

        when(loanDisbursementRepository.findAll()).thenReturn(disbursements);

        List<LoanDisbursement> result = loanDisbursementService.getAllLoanDisbursements();

        assertEquals(1, result.size());
        assertEquals(disbursements, result);
    }


    // Test Case: deleteLoanDisbursement
    @Test
    public void testDeleteLoanDisbursement() {
        loanDisbursementService.deleteLoanDisbursement(1L);
        verify(loanDisbursementRepository, times(1)).deleteById(1L);
    }

    // Test Case: createLoanDisbursement (Valid)
    @Test
    public void testCreateLoanDisbursement_Valid() throws Exception {
        LoanApplication loanApplication = new LoanApplication(); // Create a sample LoanApplication
        LoanDisbursement loanDisbursement = new LoanDisbursement(loanApplication, new Date(), 15);

        when(_loanDisbursementService.createLoanDisbursement(loanDisbursement)).thenReturn(loanDisbursement);

        ResponseEntity<LoanDisbursement> response = loanDisbursementController.createLoanDisbursement(loanDisbursement);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(loanDisbursement, response.getBody());
        verify(_loanDisbursementService, times(1)).createLoanDisbursement(loanDisbursement);
    }

    // Test Cases: createLoanDisbursement (Invalid - BVA for monthlyRepaymentDay)
    @Test
    public void testCreateLoanDisbursement_InvalidRepaymentDay_Zero() {
        LoanApplication loanApplication = new LoanApplication();
        LoanDisbursement loanDisbursement = new LoanDisbursement(loanApplication, new Date(), 0); // Invalid: 0

        when(_loanDisbursementService.createLoanDisbursement(loanDisbursement)).thenReturn(loanDisbursement);

        ResponseEntity<LoanDisbursement> response = loanDisbursementController.createLoanDisbursement(loanDisbursement);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode()); // Assuming validation is done at the controller level
    }

    @Test
    public void testCreateLoanDisbursement_InvalidRepaymentDay_32() {
        LoanApplication loanApplication = new LoanApplication();
        LoanDisbursement loanDisbursement = new LoanDisbursement(loanApplication, new Date(), 32); // Invalid: 32

        ResponseEntity<LoanDisbursement> response = loanDisbursementController.createLoanDisbursement(loanDisbursement);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}
