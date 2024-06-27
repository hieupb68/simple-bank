package com.example.loanmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "branch_info")
public class BranchInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "province_id")
    private Province province;
    private String branchName;
    private String address;

    public BranchInfo() {
    }

    public BranchInfo(Province province, String branchName, String address) {
        this.province = province;
        this.branchName = branchName;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
