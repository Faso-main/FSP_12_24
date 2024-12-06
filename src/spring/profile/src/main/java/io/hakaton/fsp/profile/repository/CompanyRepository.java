package io.hakaton.fsp.profile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.hakaton.fsp.profile.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}
