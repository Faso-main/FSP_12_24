package io.hakaton.fsp.tasks.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.hakaton.fsp.tasks.entity.TypePrice;

@Repository
public interface TypePriceRepository extends JpaRepository<TypePrice, Long> {

    Optional<TypePrice> findByName(String name); 
}
