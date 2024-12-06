package io.hakaton.fsp.profile.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class RequestUpdateInfo {

    private String lastname;
    private String firstname;
    private LocalDate dateBorn;
    private String name;
    private LocalDate dateCreate;
}
