package io.hakaton.fsp.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import io.hakaton.fsp.auth.dto.RequestCreateCompany;
import io.hakaton.fsp.auth.dto.RequestCreateUser;
import io.hakaton.fsp.auth.dto.RequestPasswordChange;
import io.hakaton.fsp.auth.dto.RequestSignIn;
import io.hakaton.fsp.auth.dto.RequestSignUpCompany;
import io.hakaton.fsp.auth.dto.RequestSignUpUser;
import io.hakaton.fsp.auth.dto.ResponseJwtAuthentication;
import io.hakaton.fsp.auth.entity.User;

@Service
public class AuthenticationService {

    @Value("${URL.backend.profile}")
    private String URL_PROFILE;
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private AuthenticationManager authenticationManager;

    public ResponseJwtAuthentication signUpCompany(RequestSignUpCompany request) {
        User user = new User();
        user.setUsername(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        String visitNowUrl = "http://" + URL_PROFILE + "/api/profile/company";
        RequestCreateCompany requestCreateCompany = new RequestCreateCompany();
        requestCreateCompany.setName(request.getName());

        restTemplate.postForObject(visitNowUrl, requestCreateCompany, RequestCreateCompany.class);
        
        userService.createUser(user, "ROLE_COMPANY", true);
        
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return new ResponseJwtAuthentication(accessToken, refreshToken);
    }

    public ResponseJwtAuthentication signUpUser(RequestSignUpUser request) {
        User user = new User();
        user.setUsername(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        String visitNowUrl = "http://" + URL_PROFILE + "/api/profile/company";
        RequestCreateUser requestCreateUser = new RequestCreateUser();
        requestCreateUser.setFirstname(request.getFirstname());
        requestCreateUser.setLastname(request.getLastname());

        restTemplate.postForObject(visitNowUrl, requestCreateUser, RequestCreateUser.class);
        
        userService.createUser(user, "ROLE_USER", false);
        
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return new ResponseJwtAuthentication(accessToken, refreshToken);
    }
    
    public ResponseJwtAuthentication signIn(RequestSignIn request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));

        UserDetails userDetails = userService.loadUserByUsername(request.getEmail());
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        return new ResponseJwtAuthentication(accessToken, refreshToken);
    }

    public boolean updatePassword(RequestPasswordChange request, String token) {
        return userService.updatePassword(request, token);
    }
}
