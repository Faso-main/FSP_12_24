package io.hakaton.fsp.auth.dto;

import lombok.Data;

@Data
public class RequestSignIn {

    private String email;
    private String password;
}
