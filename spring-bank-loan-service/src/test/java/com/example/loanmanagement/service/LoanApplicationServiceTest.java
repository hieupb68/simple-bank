package com.example.loanmanagement.service;

import com.example.loanmanagement.entity.*;
import com.example.loanmanagement.model.payload.response.InterestCalculationResponse;
import com.example.loanmanagement.repository.LoanApplicationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class LoanApplicationServiceTest {

    @Mock
    private LoanApplicationRepository loanApplicationRepository;

    @InjectMocks
    private LoanApplicationService loanApplicationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllLoanApplications() {
        LoanApplication loanApplication1 = new LoanApplication(); // Create sample loan applications
        LoanApplication loanApplication2 = new LoanApplication();
        List<LoanApplication> loanApplications = Arrays.asList(loanApplication1, loanApplication2);

        when(loanApplicationRepository.findAll()).thenReturn(loanApplications);

        List<LoanApplication> result = loanApplicationService.getAllLoanApplications();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(loanApplications));
    }

    @Test
    public void testGetLoanApplicationById_Found() {
        LoanApplication loanApplication = new LoanApplication();
        when(loanApplicationRepository.findById(1L)).thenReturn(Optional.of(loanApplication));

        LoanApplication result = loanApplicationService.getLoanApplicationById(1L);

        assertEquals(loanApplication, result);
    }

    @Test
    public void testGetLoanApplicationById_NotFound() {
        when(loanApplicationRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> loanApplicationService.getLoanApplicationById(1L));
    }

    @Test
    public void testSaveLoanApplication() {
        LoanApplication loanApplication = new LoanApplication();

        when(loanApplicationRepository.save(loanApplication)).thenReturn(loanApplication);

        LoanApplication result = loanApplicationService.saveLoanApplication(loanApplication);

        assertEquals(loanApplication, result);
    }

    @Test
    public void testDeleteLoanApplication() {
        loanApplicationService.deleteLoanApplication(1L);
        verify(loanApplicationRepository, times(1)).deleteById(1L);
    }


    @Test
    public void testCalculateInterest_Simple() {
        LoanApplication loanApplication = createSampleLoanApplication();
        loanApplication.getLoanInfo().setLoanInterestRate(6.0); // Set interest rate for simple calculation
        loanApplication.getLoanInfo().setInterestRateMargin(4.0);

        when(loanApplicationRepository.findById(1L)).thenReturn(Optional.of(loanApplication));

        double result = loanApplicationService.calculateInterest(1L, EInterestCalculator.SIMPLE);

        assertEquals(30000.0, result, 0.01); // 10000 * (0.06 + 0.04) * 30 = 3000
    }

    @Test
    public void testCalculateCompoundInterest() {
        LoanApplication loanApplication = createSampleLoanApplication();
        loanApplication.getLoanInfo().setLoanInterestRate(10.0);

        when(loanApplicationRepository.findById(1L)).thenReturn(Optional.of(loanApplication));

        // ECP (Equivalence Class Partitioning) for interest rate
        double[] validRates = {5.0, 10.0, 15.0};
        double[] invalidRates = {-1.0, 200.0}; // Invalid rates: negative and above a reasonable limit

        for (double rate : validRates) {
            loanApplication.getLoanInfo().setLoanInterestRate(rate);
            double result = loanApplicationService.calculateInterest(1L, EInterestCalculator.COMPOUND);
            assertTrue(result > 0, "Compound interest should be positive for valid rates");
        }

        for (double rate : invalidRates) {
            loanApplication.getLoanInfo().setLoanInterestRate(rate);
            assertThrows(RuntimeException.class, () -> loanApplicationService.calculateInterest(1L, EInterestCalculator.COMPOUND),
                    "Invalid rates should throw an exception");
        }
    }

    // Test Case: calculateBasedInterestMonthly
    @Test
    public void testCalculateBasedInterestMonthly() {
        LoanApplication loanApplication = createSampleLoanApplication();
        loanApplication.getLoanInfo().setLoanInterestRate(10.0);

        when(loanApplicationRepository.findById(1L)).thenReturn(Optional.of(loanApplication));

        // BVA (Boundary Value Analysis) for loan amount and term
        double[] boundaryAmounts = {1000.0, 50000.0, 100000.0}; // Boundary values for loan amount
        int[] boundaryTerms = {1, 12, 60}; // Boundary values for loan term

        for (double amount : boundaryAmounts) {
            for (int term : boundaryTerms) {
                loanApplication.getLoanInfo().setLoanAmount(amount);
                loanApplication.getLoanInfo().setLoanTerm(term);
                InterestCalculationResponse response = loanApplicationService.calculateBasedInterestMonthly(1L);
                assertTrue(response.getRemainAmount() >= 0, "Remaining amount should not be negative");
                assertTrue(response.getBasedAmount() >= 0, "Based payment should not be negative");
                assertTrue(response.getInterestAmount() >= 0, "Interest payment should not be negative");
            }
        }
    }

    // Test Case: calculateDecreasedInterestMonthly
    @Test
    public void testCalculateDecreasedInterestMonthly() {
        LoanApplication loanApplication = createSampleLoanApplication();
        loanApplication.getLoanInfo().setLoanInterestRate(10.0);

        when(loanApplicationRepository.findById(1L)).thenReturn(Optional.of(loanApplication));

        List<InterestCalculationResponse> responses = loanApplicationService.calculateDecreasedInterestMonthly(1L);

        // BVA for number of responses
        assertEquals(loanApplication.getLoanInfo().getLoanTerm() + 1, responses.size(), "Should return one extra response for the final state");

        // ECP and BVA for the first and last responses
        InterestCalculationResponse firstResponse = responses.get(0);
        assertEquals(loanApplication.getLoanInfo().getLoanAmount(), firstResponse.getRemainAmount(), 0.01, "Initial remaining amount should match the loan amount");

        InterestCalculationResponse lastResponse = responses.get(responses.size() - 1);
        assertEquals(0.0, lastResponse.getRemainAmount(), 0.01, "Final remaining amount should be zero");
    }

    private LoanApplication createSampleLoanApplication() {
        LoanApplication loanApplication = new LoanApplication();
        LoanInfo loanInfo = new LoanInfo();
        loanInfo.setLoanAmount(10000.0);
        loanInfo.setLoanTerm(30);
        loanApplication.setLoanInfo(loanInfo);
        return loanApplication;
    }
}
