package io.hakaton.fsp.auth.dto;

import lombok.Data;

@Data
public class RequestSignUpCompany {

    private String email;
    private String password;
    private String name;
}
