package io.hakaton.fsp.auth.dto;

import lombok.Data;

@Data
public class RequestSignUpUser {

    private String email;
    private String password;
    private String firstname;
    private String lastname;
}
