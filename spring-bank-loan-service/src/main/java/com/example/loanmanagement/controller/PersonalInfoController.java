package com.example.loanmanagement.controller;

import com.example.loanmanagement.entity.AccountInfo;
import com.example.loanmanagement.entity.LoanApplication;
import com.example.loanmanagement.entity.PersonalInfo;
import com.example.loanmanagement.service.AccountInfoService;
import com.example.loanmanagement.service.LoanApplicationService;
import com.example.loanmanagement.service.PersonalInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/personal-info")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PersonalInfoController {

    @Autowired
    private PersonalInfoService service;
    @Autowired
    private AccountInfoService accountInfoService;
    @Autowired
    private LoanApplicationService loanApplicationService;

    @PostMapping("/create")
    public ResponseEntity<PersonalInfo> createPersonalInfo(@RequestBody PersonalInfo personalInfo) {
        PersonalInfo createdPersonalInfo = service.savePersonalInfo(personalInfo);
        return new ResponseEntity<>(createdPersonalInfo, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PersonalInfo>> getAllPersonalInfo() {
        List<PersonalInfo> personalInfoList = service.getAllPersonalInfo();
        return new ResponseEntity<>(personalInfoList, HttpStatus.OK);
    }

    // Add more endpoints as needed
    @GetMapping("/user/{id}")
    public ResponseEntity<List<PersonalInfo>> getPersonalInfoByUserId(@PathVariable Long id) {
        Optional<AccountInfo> accountInfo = accountInfoService.getAccountInfoByUserId(id);
        if (accountInfo.isPresent()) {
            List<LoanApplication> loanApplications = loanApplicationService.getLoanApplicationByAccountId(accountInfo.get().getId());
            List<PersonalInfo> personalInfoList = service.getAllPersonalInfoByAccountId(loanApplications);
            return new ResponseEntity<>(personalInfoList, HttpStatus.OK);
        }

        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
    }
}