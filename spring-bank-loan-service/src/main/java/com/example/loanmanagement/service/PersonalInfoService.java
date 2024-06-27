package com.example.loanmanagement.service;

import com.example.loanmanagement.entity.LoanApplication;
import com.example.loanmanagement.entity.PersonalInfo;
import com.example.loanmanagement.repository.PersonalInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonalInfoService {

    @Autowired
    private PersonalInfoRepository repository;

    public PersonalInfo savePersonalInfo(PersonalInfo personalInfo) {
        return repository.save(personalInfo);
    }

    public List<PersonalInfo> getAllPersonalInfo() {
        return repository.findAll();
    }

    // Add more methods as needed
    public boolean isIdNumberUnique(String idNumber) {
        Optional<PersonalInfo> existingPersonalInfo = repository.findByIdNumber(idNumber);
        return existingPersonalInfo.isEmpty();
    }

    public List<PersonalInfo> getAllPersonalInfoByAccountId(List<LoanApplication> loanApplications) {
        List<PersonalInfo> personalInfos = loanApplications.stream()
                .map(LoanApplication::getPersonalInfo)
                .toList();
        return personalInfos;
    }
}