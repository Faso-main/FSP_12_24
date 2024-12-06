package io.hakaton.fsp.auth.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.hakaton.fsp.auth.dto.RequestPasswordChange;
import io.hakaton.fsp.auth.entity.Role;
import io.hakaton.fsp.auth.entity.User;
import io.hakaton.fsp.auth.repository.RefreshTokenRepository;
import io.hakaton.fsp.auth.repository.RoleRepository;
import io.hakaton.fsp.auth.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public UserDetails loadUserByUsername(String username) 
    {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public boolean createUser(User user, String nameRole, boolean isCompany) 
    {
        if(userRepository.findByUsername(user.getUsername()).isPresent()) {
            return false;
        }

        user.setCompany(isCompany);

        Role role = new Role();
        role.setName(nameRole);
        if(!roleRepository.findByName(role.getName()).isPresent()) {
            roleRepository.save(role);
            user.setRoles(Collections.singletonList(role));
        }
        else {
            user.setRoles(Collections.singletonList(roleRepository.findByName(role.getName()).get()));
        }
        
        userRepository.save(user);
        return true;
    }

    public boolean updatePassword(RequestPasswordChange request, String token) 
    {
        token = jwtService.deleteBearer(token);
        Long userId = jwtService.extractProfileId(token);

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(!passwordEncoder.matches(request.getOld_password(), user.getPassword())) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(request.getNew_password()));
        userRepository.save(user);
        refreshTokenRepository.deleteByUserId(user.getId());
        return true;
    }

    public boolean deleteUser(Long userId) 
    {
        if (!userRepository.findById(userId).isPresent()) {
            return false;
        }

        userRepository.deleteById(userId);
        return true;
    }
    
    public UserDetailsService userDetailsService() 
    {
        return this::loadUserByUsername;
    }
}
