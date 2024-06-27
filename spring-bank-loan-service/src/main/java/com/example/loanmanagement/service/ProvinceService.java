package com.example.loanmanagement.service;

import com.example.loanmanagement.entity.Province;
import com.example.loanmanagement.repository.ProvinceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProvinceService {
    @Autowired
    private ProvinceRepository provinceRepository;

    public List<Province> getAllProvinces() {
        return provinceRepository.findAll();
    }

    public Optional<Province> getProvinceById(Long id) {
        return provinceRepository.findById(id);
    }

    public Province createOrUpdateProvince(Province province) {
        return provinceRepository.save(province);
    }

    public void deleteProvinceById(Long id) {
        provinceRepository.deleteById(id);
    }
}