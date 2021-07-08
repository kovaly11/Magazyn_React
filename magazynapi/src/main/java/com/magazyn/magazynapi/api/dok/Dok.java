package com.magazyn.magazynapi.api.dok;

import com.magazyn.magazynapi.api.tow.Tow;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;


@Entity
@Setter
@Getter
@IdClass(DokId.class)
public class Dok {
    @Id
    private Integer idDok;
    @Id
    private Integer lPoz;
    @OneToOne
    @JoinColumn(name="ID_TOW")
    private Tow tow;
    private Double ilTow;
    @Size(max = 20)
    private String serTow;


}

