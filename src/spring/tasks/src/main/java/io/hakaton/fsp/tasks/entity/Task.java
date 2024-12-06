package io.hakaton.fsp.tasks.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String nameAuthor;

    @Column(nullable = false)
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "task_tags", joinColumns = @JoinColumn(name = "task_id"))
    @Column(name = "tags_name")
    private Set<String> tags = new HashSet<>();

    @Column(nullable = true)
    private Long price;

    @ManyToOne
    @JoinColumn(name = "type_price_id", nullable = false)
    private TypePrice typePrice;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private Long createdBy;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "task_watched", joinColumns = @JoinColumn(name = "task_id"))
    @Column(name = "watched")
    private Set<Long> watched;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "task_responded", joinColumns = @JoinColumn(name = "task_id"))
    @Column(name = "responded")
    private Set<Long> responded;
}
