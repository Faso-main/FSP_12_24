package io.hakaton.fsp.profile.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import io.hakaton.fsp.profile.dto.RequestCreateUser;
import io.hakaton.fsp.profile.dto.RequestUpdateInfo;
import io.hakaton.fsp.profile.entity.SocLinks;
import io.hakaton.fsp.profile.entity.User;
import io.hakaton.fsp.profile.repository.SocLinksRepository;
import io.hakaton.fsp.profile.repository.UserRepository;

public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SocLinksRepository socLinksRepository;

    public User createUser(RequestCreateUser request) {
        User user = new User();

        user.setId(request.getId());
        user.setFirstName(request.getFirstname());
        user.setLastName(request.getLastname());
        user.setDateBorn(request.getDateBorn());
        user.setNumber(request.getNumber());
        
        List<SocLinks> socLinks = request.getLinks().stream()
            .map(link -> {
                SocLinks socLink = new SocLinks();
                socLink.setName(link.getName());
                socLink.setUrl(link.getLink());
                socLink.setUser(user);
                return socLink;
            })
            .collect(Collectors.toList());
        user.setLinks(socLinksRepository.saveAll(socLinks));

        return userRepository.save(user);
    }

    public User updateProfile(Long id, RequestUpdateInfo request) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setFirstName(request.getFirstname());
        user.setLastName(request.getLastname());
        user.setDateBorn(request.getDateBorn());

        return userRepository.save(user);
    }

    public User updateTelephone(Long id, String telephone) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        user.setNumber(telephone);

        return userRepository.save(user);
    }

    public void deleteProfile(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found");
        }
        userRepository.deleteById(id);
    }
}
