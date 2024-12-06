package io.hakaton.fsp.auth.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.hakaton.fsp.auth.dto.RequestPasswordChange;
import io.hakaton.fsp.auth.dto.RequestSignIn;
import io.hakaton.fsp.auth.dto.RequestSignUpCompany;
import io.hakaton.fsp.auth.dto.RequestSignUpUser;
import io.hakaton.fsp.auth.dto.ResponseJwtAuthentication;
import io.hakaton.fsp.auth.entity.RefreshToken;
import io.hakaton.fsp.auth.entity.User;
import io.hakaton.fsp.auth.repository.RefreshTokenRepository;
import io.hakaton.fsp.auth.repository.UserRepository;
import io.hakaton.fsp.auth.service.AuthenticationService;
import io.hakaton.fsp.auth.service.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup/company")
    public ResponseEntity<?> postSignUpCompany(@RequestBody RequestSignUpCompany request) {
        return ResponseEntity.ok(authenticationService.signUpCompany(request));
    }

    @PostMapping("/signup/user")
    public ResponseEntity<?> postSignUpUser(@RequestBody RequestSignUpUser request) {
        return ResponseEntity.ok(authenticationService.signUpUser(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> postSignIn(@RequestBody RequestSignIn request) {
        return ResponseEntity.ok(authenticationService.signIn(request));
    }

    @PutMapping("/update-password")
    public ResponseEntity<?> postUpdatePassword(
            @RequestHeader("Authorization") String token,
            @RequestBody RequestPasswordChange request
    ) {
        return ResponseEntity.ok(authenticationService.updatePassword(request, token));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> postRefresh(@RequestBody String refreshToken) {
        String cleanedToken = jwtService.deleteBearer(refreshToken);
        if (jwtService.isRefreshTokenValid(cleanedToken)) {
            Optional<RefreshToken> rf = refreshTokenRepository.findByToken(cleanedToken);
            if(!rf.isPresent()){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }

            Optional<User> ou = userRepository.findById(rf.get().getUserId());
            if(!ou.isPresent()){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }
            User user = ou.get();

            if (user != null) {
                String newAccessToken = jwtService.generateAccessToken(user);
                String newRefreshToken = jwtService.generateRefreshToken(user);
                return ResponseEntity.ok(new ResponseJwtAuthentication(newAccessToken, newRefreshToken));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
    }
}
