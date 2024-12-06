package io.hakaton.fsp.profile.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.hakaton.fsp.profile.dto.RequestCreateCompany;
import io.hakaton.fsp.profile.dto.RequestUpdateInfo;
import io.hakaton.fsp.profile.entity.Company;
import io.hakaton.fsp.profile.entity.SocLinks;
import io.hakaton.fsp.profile.repository.CompanyRepository;
import io.hakaton.fsp.profile.repository.SocLinksRepository;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private SocLinksRepository socLinksRepository;

    public Company createCompany(RequestCreateCompany request) {
        Company company = new Company();

        company.setId(request.getId());
        company.setName(request.getName());
        company.setDateCreate(request.getDateCreate());
        company.setNumber(request.getNumber());
        company.setAbout(request.getAbout());

        List<SocLinks> socLinks = request.getLinks().stream()
            .map(link -> {
                SocLinks socLink = new SocLinks();
                socLink.setName(link.getName());
                socLink.setUrl(link.getLink());
                socLink.setCompany(company);
                return socLink;
            })
            .collect(Collectors.toList());
        company.setLinks(socLinksRepository.saveAll(socLinks));

        return companyRepository.save(company);
    }

    public Company updateProfile(Long id, RequestUpdateInfo request) {
        Company company = companyRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Company not found"));
        company.setName(request.getName());
        company.setDateCreate(request.getDateCreate());
        return companyRepository.save(company);
    }

    public Company updateTelephone(Long id, String telephone) {
        
        Company company = companyRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Company not found"));
        company.setNumber(telephone);
        return companyRepository.save(company);
    }

    public void deleteProfile(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new IllegalArgumentException("Company not found");
        }
        companyRepository.deleteById(id);
    }
}
