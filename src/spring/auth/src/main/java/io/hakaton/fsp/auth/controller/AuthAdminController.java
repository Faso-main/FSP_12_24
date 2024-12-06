package io.hakaton.fsp.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hakaton.fsp.auth.service.UserService;

@RestController
@RequestMapping("/api/auth/admin")
public class AuthAdminController {

    @Autowired
    private UserService userService;

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> postSignUp(@PathVariable Long id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }
}
