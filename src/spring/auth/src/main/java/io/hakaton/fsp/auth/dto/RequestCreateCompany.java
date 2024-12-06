package io.hakaton.fsp.auth.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class RequestCreateCompany {

    private Long id;
    private String name;
    private LocalDate dateCreate;
    private String number;
    private String about;
    private List<RequestCreateSocLinks> links;
}
