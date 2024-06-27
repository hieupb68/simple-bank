package com.example.loanmanagement.service;

import com.example.loanmanagement.entity.BranchInfo;
import com.example.loanmanagement.entity.EVietnamProvince;
import com.example.loanmanagement.entity.Province;
import com.example.loanmanagement.repository.BranchInfoRepository;
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

class BranchInfoServiceTest {

    @Mock
    private BranchInfoRepository branchInfoRepository;

    @InjectMocks
    private BranchInfoService branchInfoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllBranchInfos() {
        Province province = new Province(EVietnamProvince.HANOI, "Ha Noi");
        BranchInfo branchInfo1 = new BranchInfo(province, "Branch A", "123 Main St");
        BranchInfo branchInfo2 = new BranchInfo(province, "Branch B", "456 Elm St");
        List<BranchInfo> branchInfos = Arrays.asList(branchInfo1, branchInfo2);

        when(branchInfoRepository.findAll()).thenReturn(branchInfos);

        List<BranchInfo> result = branchInfoService.getAllBranchInfos();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(branchInfos));
    }

    @Test
    void testGetBranchInfoById_Found() {
        Province province = new Province(EVietnamProvince.HANOI, "Ha Noi");
        BranchInfo branchInfo = new BranchInfo(province, "Branch A", "123 Main St");
        when(branchInfoRepository.findById(1L)).thenReturn(Optional.of(branchInfo));

        Optional<BranchInfo> result = branchInfoService.getBranchInfoById(1L);

        assertTrue(result.isPresent());
        assertEquals(branchInfo, result.get());
    }

    @Test
    void testGetBranchInfoById_NotFound() {
        when(branchInfoRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<BranchInfo> result = branchInfoService.getBranchInfoById(1L);

        assertTrue(result.isEmpty());
    }

    @Test
    void testCreateOrUpdateBranchInfo() {
        Province province = new Province(EVietnamProvince.HANOI, "Ha Noi");
        BranchInfo branchInfo = new BranchInfo(province, "Branch A", "123 Main St");

        when(branchInfoRepository.save(branchInfo)).thenReturn(branchInfo);

        BranchInfo result = branchInfoService.createOrUpdateBranchInfo(branchInfo);

        assertEquals(branchInfo, result);
    }

    @Test
    void testDeleteBranchInfoById() {
        branchInfoService.deleteBranchInfoById(1L);
        verify(branchInfoRepository, times(1)).deleteById(1L);
    }

    @Test
    void testFindByProvinceId() {
        Province province = new Province(EVietnamProvince.HANOI, "Ha Noi");
        BranchInfo branchInfo1 = new BranchInfo(province, "Branch A", "123 Main St");
        BranchInfo branchInfo2 = new BranchInfo(province, "Branch B", "456 Elm St");

        when(branchInfoRepository.findByProvince_Id(1L)).thenReturn(Arrays.asList(branchInfo1, branchInfo2));
        List<BranchInfo> branchInfos = branchInfoService.findByProvinceId(1L);
        assertEquals(2, branchInfos.size());
        assertTrue(branchInfos.containsAll(Arrays.asList(branchInfo1, branchInfo2)));
    }
    @Test
    void testGetAllBranchInfos_Found() {
        Province province = new Province(EVietnamProvince.HANOI, "Ha Noi");
        BranchInfo branchInfo1 = new BranchInfo(province, "Branch A", "123 Main St");
        BranchInfo branchInfo2 = new BranchInfo(province, "Branch B", "456 Elm St");
        List<BranchInfo> branchInfos = Arrays.asList(branchInfo1, branchInfo2);

        when(branchInfoRepository.findAll()).thenReturn(branchInfos);

        List<BranchInfo> result = branchInfoService.getAllBranchInfos();

        // Incorrect assertion (expected 3 branches, but there are only 2)
        assertEquals(3, result.size());
        assertTrue(result.containsAll(branchInfos));
    }

}
