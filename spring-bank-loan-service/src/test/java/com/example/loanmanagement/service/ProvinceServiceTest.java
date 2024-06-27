package com.example.loanmanagement.service;

import com.example.loanmanagement.entity.EVietnamProvince;
import com.example.loanmanagement.entity.Province;
import com.example.loanmanagement.repository.ProvinceRepository;
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

public class ProvinceServiceTest {

    @Mock
    private ProvinceRepository provinceRepository;

    @InjectMocks
    private ProvinceService provinceService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllProvinces() {
        Province province1 = new Province(EVietnamProvince.HANOI, "North");
        Province province2 = new Province(EVietnamProvince.TPHCM, "South");
        List<Province> provinces = Arrays.asList(province1, province2);

        when(provinceRepository.findAll()).thenReturn(provinces);

        List<Province> result = provinceService.getAllProvinces();
        assertEquals(2, result.size());
        assertTrue(result.containsAll(provinces));
    }

    @Test
    public void testGetProvinceById_Found() {
        Province province = new Province(EVietnamProvince.HANOI, "North");
        when(provinceRepository.findById(1L)).thenReturn(Optional.of(province));

        Optional<Province> result = provinceService.getProvinceById(1L);

        assertTrue(result.isPresent());
        assertEquals(province, result.get());
    }

    @Test
    public void testGetProvinceById_NotFound() {
        when(provinceRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Province> result = provinceService.getProvinceById(1L);

        assertTrue(result.isEmpty());
    }

    @Test
    public void testCreateOrUpdateProvince() {
        Province province = new Province(EVietnamProvince.HANOI, "North");
        when(provinceRepository.save(province)).thenReturn(province);

        Province result = provinceService.createOrUpdateProvince(province);

        assertEquals(province, result);
    }

    @Test
    public void testDeleteProvinceById() {
        provinceService.deleteProvinceById(1L);

        verify(provinceRepository, times(1)).deleteById(1L);
    }
}
