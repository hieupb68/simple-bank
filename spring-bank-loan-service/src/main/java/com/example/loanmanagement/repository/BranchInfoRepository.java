package com.example.loanmanagement.repository;

import com.example.loanmanagement.entity.BranchInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BranchInfoRepository extends JpaRepository<BranchInfo, Long> {
    List<BranchInfo> findByProvince_Id(Long provinceId);
}