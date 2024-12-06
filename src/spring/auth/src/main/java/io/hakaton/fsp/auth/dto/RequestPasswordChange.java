package io.hakaton.fsp.auth.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestPasswordChange {

    @NotNull
    public String old_password;

    @NotNull
    public String new_password;
}
