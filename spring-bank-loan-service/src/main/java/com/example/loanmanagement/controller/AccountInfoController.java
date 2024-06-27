package com.example.loanmanagement.controller;

import com.example.loanmanagement.entity.AccountInfo;
import com.example.loanmanagement.model.payload.response.MessageResponse;
import com.example.loanmanagement.service.AccountInfoService;
import com.example.loanmanagement.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accountInfos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AccountInfoController {
    @Autowired
    private AccountInfoService accountInfoService;

    @Autowired
    private MemberService memberService;

    @GetMapping
    public ResponseEntity<List<AccountInfo>> getAllAccountInfos() {
        List<AccountInfo> accountInfos = accountInfoService.getAllAccountInfos();
        return ResponseEntity.ok().body(accountInfos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountInfo> getAccountInfoById(@PathVariable Long id) {
        Optional<AccountInfo> accountInfo = accountInfoService.getAccountInfoById(id);
        return accountInfo.map(info -> ResponseEntity.ok().body(info))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AccountInfo> createAccountInfo(@RequestBody AccountInfo accountInfo, @RequestParam("user_id") Long user_id) {
        memberService.updateIsDeclared(user_id);

        AccountInfo createdAccountInfo = accountInfoService.createOrUpdateAccountInfo(accountInfo);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAccountInfo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountInfo> updateAccountInfo(@PathVariable Long id, @RequestBody AccountInfo accountInfo) {
        accountInfo.setId(id);
        AccountInfo updatedAccountInfo = accountInfoService.createOrUpdateAccountInfo(accountInfo);
        return ResponseEntity.ok().body(updatedAccountInfo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccountInfo(@PathVariable Long id) {
        accountInfoService.deleteAccountInfoById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getAccountInfoByUserId(@PathVariable Long userId) {
        Optional<AccountInfo> accountInfo = accountInfoService.getAccountInfoByUserId(userId);

        if(accountInfo.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("User hadn't declared account information"));
        }

        return ResponseEntity.ok().body(accountInfo.get());
    }
}
