package com.magazyn.magazynapi.api.adres;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table
@Setter
@Getter
public class Adres {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer idAd;
    @Size(max = 20)

    private String mej;
    @Size(max = 30)

    private String ulica;
    @Size(max = 6)

    private String bud;
    @Size(max = 6)

    private String kod;
    @Size(max = 20)

    private String kraj;



}
