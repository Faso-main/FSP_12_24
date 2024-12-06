package io.hakaton.fsp.tasks.dto;

import java.util.Set;

import lombok.Data;

@Data
public class TaskRequest {

    private String title;
    private String description;
    private Set<String> tags;
    private Long price;
    private String typePrice;
}
