package com.example.loanmanagement.service;

import com.example.loanmanagement.entity.LoanApplication;
import com.example.loanmanagement.entity.PersonalInfo;
import com.example.loanmanagement.repository.PersonalInfoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PersonalInfoServiceTest {

    @Mock
    private PersonalInfoRepository repository;

    @InjectMocks
    private PersonalInfoService service;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSavePersonalInfo() {
        PersonalInfo personalInfo = new PersonalInfo("John", "Doe", new Date(), "Male", "1234567890", "1234567890", "johndoe@example.com", "123 Main St");
        when(repository.save(personalInfo)).thenReturn(personalInfo);
        PersonalInfo savedPersonalInfo = service.savePersonalInfo(personalInfo);
        assertEquals(personalInfo, savedPersonalInfo);
    }

    @Test
    public void testGetAllPersonalInfo() {
        List<PersonalInfo> personalInfos = Arrays.asList(
                new PersonalInfo("John", "Doe", new Date(), "Male", "1234567890", "1234567890", "johndoe@example.com", "123 Main St"),
                new PersonalInfo("Jane", "Smith", new Date(), "Female", "9876543210", "9876543210", "janesmith@example.com", "456 Elm St")
        );
        when(repository.findAll()).thenReturn(personalInfos);
        List<PersonalInfo> retrievedPersonalInfos = service.getAllPersonalInfo();
        assertEquals(2, retrievedPersonalInfos.size());
    }

    @Test
    public void testIsIdNumberUnique_True() {
        when(repository.findByIdNumber("1234567890")).thenReturn(Optional.empty());
        boolean isUnique = service.isIdNumberUnique("1234567890");
        assertTrue(isUnique);
    }

    @Test
    public void testIsIdNumberUnique_False() {
        PersonalInfo personalInfo = new PersonalInfo("John", "Doe", new Date(), "Male", "1234567890", "1234567890", "johndoe@example.com", "123 Main St");
        when(repository.findByIdNumber("1234567890")).thenReturn(Optional.of(personalInfo));
        boolean isUnique = service.isIdNumberUnique("1234567890");
        assertFalse(isUnique);
    }

    @Test
    public void testGetAllPersonalInfoByAccountId() {
        PersonalInfo personalInfo1 = new PersonalInfo("John", "Doe", new Date(), "Male", "1234567890", "1234567890", "johndoe@example.com", "123 Main St");
        PersonalInfo personalInfo2 = new PersonalInfo("Jane", "Smith", new Date(), "Female", "9876543210", "9876543210", "janesmith@example.com", "456 Elm St");

        LoanApplication loanApplication1 = new LoanApplication();
        loanApplication1.setPersonalInfo(personalInfo1);

        LoanApplication loanApplication2 = new LoanApplication();
        loanApplication2.setPersonalInfo(personalInfo2);

        List<LoanApplication> loanApplications = Arrays.asList(loanApplication1, loanApplication2);

        List<PersonalInfo> expectedPersonalInfos = Arrays.asList(personalInfo1, personalInfo2);

        List<PersonalInfo> result = service.getAllPersonalInfoByAccountId(loanApplications);

        assertEquals(expectedPersonalInfos, result);
    }
}
