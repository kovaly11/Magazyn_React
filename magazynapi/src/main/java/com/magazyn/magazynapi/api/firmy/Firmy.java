package com.magazyn.magazynapi.api.firmy;

import com.magazyn.magazynapi.api.adres.Adres;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Setter
@Getter
public class Firmy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_F")
    private Integer idF;
    @Size(max = 2)
    private String tFir;
    @Size(max = 15)
    private String sNaz;
    @Size(max = 50)
    private String pNaz;
    @Size(max = 15)
    private String nip;
    @Size(max = 11)
    private String pesel;
    @OneToOne
    @JoinColumn(name="idAd")
    private Adres adres;
    @Size(max = 30)
    private String osoba;
    @Size(max = 15)
    private String tel;
    @Size(max = 50)
    private String email;

}
