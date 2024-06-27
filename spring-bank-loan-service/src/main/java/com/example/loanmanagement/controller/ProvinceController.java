package com.example.loanmanagement.controller;

import com.example.loanmanagement.entity.Province;
import com.example.loanmanagement.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/provinces")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProvinceController {
    @Autowired
    private ProvinceService provinceService;

    @GetMapping
    public ResponseEntity<List<Province>> getAllProvinces() {
        List<Province> provinces = provinceService.getAllProvinces();
        return ResponseEntity.ok().body(provinces);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Province> getProvinceById(@PathVariable Long id) {
        Optional<Province> province = provinceService.getProvinceById(id);
        return province.map(value -> ResponseEntity.ok().body(value))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Province> createProvince(@RequestBody Province province) {
        Province createdProvince = provinceService.createOrUpdateProvince(province);
        return ResponseEntity.ok().body(createdProvince);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Province> updateProvince(@PathVariable Long id, @RequestBody Province province) {
        province.setId(id);
        Province updatedProvince = provinceService.createOrUpdateProvince(province);
        return ResponseEntity.ok().body(updatedProvince);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProvince(@PathVariable Long id) {
        provinceService.deleteProvinceById(id);
        return ResponseEntity.noContent().build();
    }
}