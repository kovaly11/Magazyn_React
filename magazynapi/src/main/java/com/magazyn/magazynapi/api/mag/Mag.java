package com.magazyn.magazynapi.api.mag;

import com.magazyn.magazynapi.api.adres.Adres;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "MAG")
@Setter
@Getter
public class Mag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID_MAG")
    private Integer idMag;
    @Size(max = 30)
    @Column(name="N_MAG")
    private String nMag;
    @Size(max = 30)
    @Column(name="K_MAG")
    private String kMag;
    @Size(max = 15)
    @Column(name="T_MAG")
    private String tMag;
    @OneToOne
    @JoinColumn(name="idAd")
    private Adres adres;

}
