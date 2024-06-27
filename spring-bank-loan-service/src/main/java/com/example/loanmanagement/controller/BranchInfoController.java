package com.example.loanmanagement.controller;

import com.example.loanmanagement.entity.BranchInfo;
import com.example.loanmanagement.service.BranchInfoService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/branchInfos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BranchInfoController {
    @Autowired
    private BranchInfoService branchInfoService;

    // GET all branch infos
    @GetMapping
    public ResponseEntity<List<BranchInfo>> getAllBranchInfos() {
        List<BranchInfo> branchInfos = branchInfoService.getAllBranchInfos();
        return ResponseEntity.ok().body(branchInfos);
    }

    // GET a branch info by ID
    @GetMapping("/{id}")
    public ResponseEntity<BranchInfo> getBranchInfoById(@PathVariable Long id) {
        Optional<BranchInfo> branchInfo = branchInfoService.getBranchInfoById(id);
        return branchInfo.map(value -> ResponseEntity.ok().body(value))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST create a new branch info
    @PostMapping
    public ResponseEntity<BranchInfo> createBranchInfo(@RequestBody BranchInfo branchInfo) {
        BranchInfo createdBranchInfo = branchInfoService.createOrUpdateBranchInfo(branchInfo);
        return ResponseEntity.ok().body(createdBranchInfo);
    }

    // PUT update an existing branch info
    @PutMapping("/{id}")
    public ResponseEntity<BranchInfo> updateBranchInfo(@PathVariable Long id, @RequestBody BranchInfo branchInfo) {
        branchInfo.setId(id);
        BranchInfo updatedBranchInfo = branchInfoService.createOrUpdateBranchInfo(branchInfo);
        return ResponseEntity.ok().body(updatedBranchInfo);
    }

    // DELETE delete a branch info by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBranchInfo(@PathVariable Long id) {
        branchInfoService.deleteBranchInfoById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/")
    public ResponseEntity<List<BranchInfo>> getBranchInfoByProvinceId(@RequestParam("provinceId") Long provinceId) {
        List<BranchInfo> branchInfos = branchInfoService.findByProvinceId(provinceId);
        return ResponseEntity.ok().body(branchInfos);
    }
}