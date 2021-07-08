package com.magazyn.magazynapi.api.tow;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;

@Entity
@Setter
@Getter
public class Tow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTow;
    @Size(max = 50)
    private String nTow;
    @Size(max = 15)
    private String kTow;
    @Size(max = 20)
    private String pTow;
    private Double wTow;
    @Size(max = 14)
    private String wyTow;

}
