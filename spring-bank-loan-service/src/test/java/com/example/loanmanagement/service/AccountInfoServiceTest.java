package com.example.loanmanagement.service;

import com.example.loanmanagement.controller.AccountInfoController;
import com.example.loanmanagement.entity.AccountInfo;
import com.example.loanmanagement.repository.AccountInfoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class AccountInfoServiceTest {
    @Mock
    private AccountInfoRepository accountInfoRepository;

    @InjectMocks
    private AccountInfoService accountInfoService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllAccountInfos() {
        AccountInfo accountInfo1 = new AccountInfo("12345", "John Doe", "john.doe@example.com", "1234567890", "123 Main St", null, null);
        AccountInfo accountInfo2 = new AccountInfo("67890", "Jane Smith", "jane.smith@example.com", "9876543210", "456 Elm St", null, null);
        List<AccountInfo> accountInfos = Arrays.asList(accountInfo1, accountInfo2);

        when(accountInfoRepository.findAll()).thenReturn(accountInfos);

        List<AccountInfo> result = accountInfoService.getAllAccountInfos();

        assertEquals(2, result.size());
        assertEquals(accountInfos, result);
    }

    @Test
    public void testGetAccountInfoById_Found() {
        AccountInfo accountInfo = new AccountInfo("12345", "John Doe", "john.doe@example.com", "1234567890", "123 Main St", null, null);
        when(accountInfoRepository.findById(1L)).thenReturn(Optional.of(accountInfo));

        Optional<AccountInfo> result = accountInfoService.getAccountInfoById(1L);

        assertTrue(result.isPresent());
        assertEquals(accountInfo, result.get());
    }

    @Test
    public void testGetAccountInfoById_NotFound() {
        when(accountInfoRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<AccountInfo> result = accountInfoService.getAccountInfoById(1L);

        assertTrue(result.isEmpty());
    }

    @Test
    public void testCreateOrUpdateAccountInfo() {
        AccountInfo accountInfo = new AccountInfo("12345", "John Doe", "john.doe@example.com", "1234567890", "123 Main St", null, null);

        when(accountInfoRepository.save(accountInfo)).thenReturn(accountInfo);

        AccountInfo result = accountInfoService.createOrUpdateAccountInfo(accountInfo);

        assertEquals(accountInfo, result);
    }

    @Test
    public void testDeleteAccountInfoById() {
        accountInfoService.deleteAccountInfoById(1L);
        verify(accountInfoRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testGetAccountInfoByUserId_Found() {
        AccountInfo accountInfo = new AccountInfo("12345", "John Doe", "john.doe@example.com", "1234567890", "123 Main St", null, null);
        when(accountInfoRepository.findByUserId(1L)).thenReturn(Optional.of(accountInfo));

        Optional<AccountInfo> result = accountInfoService.getAccountInfoByUserId(1L);

        assertTrue(result.isPresent());
        assertEquals(accountInfo, result.get());
    }

    @Test
    public void testGetAccountInfoByUserId_NotFound() {
        when(accountInfoRepository.findByUserId(1L)).thenReturn(Optional.empty());

        Optional<AccountInfo> result = accountInfoService.getAccountInfoByUserId(1L);

        assertTrue(result.isEmpty());
    }
}
