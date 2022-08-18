package com.example.be.base;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Data
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    @CreatedBy
    private String createBy;

    @Column
    @CreatedDate
    private Timestamp createdDate;

    @Column
    @LastModifiedBy
    private String modifiedBy;

    @Column
    @LastModifiedDate
    private Timestamp modifiedDate;
}