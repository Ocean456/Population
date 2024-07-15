package com.example.demo.entity;


import com.baomidou.mybatisplus.annotation.TableName;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@TableName("migrate")
public class Migrate {
    @Id
    private String id;
    private String address;
    private LocalDate date;
    private String reason;
    private int status;
}
