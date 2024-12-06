package io.hakaton.fsp.tasks.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hakaton.fsp.tasks.entity.TypePrice;
import io.hakaton.fsp.tasks.repository.TypePriceRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/tasks/type-price")
public class TypePriceController {

    @Autowired
    private TypePriceRepository typePriceRepository;

    @GetMapping
    public ResponseEntity<List<TypePrice>> getListTypePrice() {
        return ResponseEntity.ok().body(typePriceRepository.findAll());
    }
}
