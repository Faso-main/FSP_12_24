package io.hakaton.fsp.profile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.hakaton.fsp.profile.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
