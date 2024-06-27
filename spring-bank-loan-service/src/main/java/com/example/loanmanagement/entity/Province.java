package com.example.loanmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "provinces")
public class Province {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EVietnamProvince name;
    private String region;

    public Province() {
    }

    public Province(EVietnamProvince name, String region) {
        this.name = name;
        this.region = region;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EVietnamProvince getName() {
        return name;
    }

    public void setName(EVietnamProvince name) {
        this.name = name;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }
}
