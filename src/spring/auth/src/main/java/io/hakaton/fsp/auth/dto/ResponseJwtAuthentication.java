package io.hakaton.fsp.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseJwtAuthentication {
    
    private String accessToken;
    private String refreshToken;
}
