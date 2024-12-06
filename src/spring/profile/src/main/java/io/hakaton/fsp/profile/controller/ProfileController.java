package io.hakaton.fsp.profile.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hakaton.fsp.profile.dto.RequestCreateCompany;
import io.hakaton.fsp.profile.dto.RequestCreateUser;
import io.hakaton.fsp.profile.dto.RequestUpdateInfo;
import io.hakaton.fsp.profile.entity.Company;
import io.hakaton.fsp.profile.entity.User;
import io.hakaton.fsp.profile.repository.CompanyRepository;
import io.hakaton.fsp.profile.repository.UserRepository;
import io.hakaton.fsp.profile.service.CompanyService;
import io.hakaton.fsp.profile.service.JwtService;
import io.hakaton.fsp.profile.service.UserService;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) 
    {
        Optional<User> ou = userRepository.findById(id);
        if(ou.isPresent()){
            return ResponseEntity.ok().body(ou.get());
        }

        Optional<Company> oc = companyRepository.findById(id);
        if(ou.isPresent()){
            return ResponseEntity.ok().body(oc.get());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/company")
    public ResponseEntity<?> createProfileCompany(@RequestBody RequestCreateCompany request) 
    {
        Company newCompany = companyService.createCompany(request);
        return ResponseEntity.created(URI.create("/profile/" + newCompany.getId())).body(newCompany);
    }

    @PostMapping("/user")
    public ResponseEntity<?> createProfileUser(@RequestBody RequestCreateUser request) 
    {
        User newUser = userService.createUser(request);
        return ResponseEntity.created(URI.create("/profile/" + newUser.getId())).body(newUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfile(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestBody RequestUpdateInfo request
    ) {
        token = jwtService.deleteBearer(token);
        Long userId = jwtService.extractProfileId(token);


        Optional<User> ou = userRepository.findById(id);
        if(ou.isPresent()){
            if(!(userId == id || jwtService.extractRoles(token).contains("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            return ResponseEntity.ok().body(userService.updateProfile(id, request));
        }

        Optional<Company> oc = companyRepository.findById(id);
        if(oc.isPresent()){
            if(!(userId == id || jwtService.extractRoles(token).contains("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            return ResponseEntity.ok().body(companyService.updateProfile(id, request));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTelephone(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestBody String telephone
    ) {
        token = jwtService.deleteBearer(token);
        Long userId = jwtService.extractProfileId(token);


        Optional<User> ou = userRepository.findById(id);
        if(ou.isPresent()){
            if(!(userId == id || jwtService.extractRoles(token).contains("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            return ResponseEntity.ok().body(userService.updateTelephone(id, telephone));
        }

        Optional<Company> oc = companyRepository.findById(id);
        if(oc.isPresent()){
            if(!(userId == id || jwtService.extractRoles(token).contains("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            return ResponseEntity.ok().body(companyService.updateTelephone(id, telephone));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProfile(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) {
        token = jwtService.deleteBearer(token);
        Long userId = jwtService.extractProfileId(token);


        Optional<User> ou = userRepository.findById(id);
        if(ou.isPresent()){
            if(!(userId == id || jwtService.extractRoles(token).contains("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            userService.deleteProfile(id);
            return ResponseEntity.ok().build();
        }

        Optional<Company> oc = companyRepository.findById(id);
        if(oc.isPresent()){
            if(!(userId == id || jwtService.extractRoles(token).contains("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            companyService.deleteProfile(id);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
