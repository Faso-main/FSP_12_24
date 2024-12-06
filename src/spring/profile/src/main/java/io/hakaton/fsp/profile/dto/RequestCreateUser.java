package io.hakaton.fsp.profile.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class RequestCreateUser {

    private Long id;
    private String lastname;
    private String firstname;
    private LocalDate dateBorn;
    private String number;
    private String about;
    private List<RequestCreateSocLinks> links;
}
