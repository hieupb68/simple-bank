package com.example.loanmanagement.service;

import com.example.loanmanagement.entity.BranchInfo;
import com.example.loanmanagement.repository.BranchInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BranchInfoService {
    @Autowired
    private BranchInfoRepository branchInfoRepository;

    public List<BranchInfo> getAllBranchInfos() {
        return branchInfoRepository.findAll();
    }

    public Optional<BranchInfo> getBranchInfoById(Long id) {
        return branchInfoRepository.findById(id);
    }

    public BranchInfo createOrUpdateBranchInfo(BranchInfo branchInfo) {
        return branchInfoRepository.save(branchInfo);
    }

    public void deleteBranchInfoById(Long id) {
        branchInfoRepository.deleteById(id);
    }

    public List<BranchInfo> findByProvinceId(Long provinceId) {
        return branchInfoRepository.findByProvince_Id(provinceId);
    }
}