package com.magazyn.magazynapi.api.stanmag;

import com.magazyn.magazynapi.api.tow.Tow;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;


@Entity
@Setter
@Getter
@IdClass(StanMagId.class)
public class StanMag {
    @Id
    private Integer idMag;
    @Id
    @OneToOne
    @JoinColumn(name="idTow")
    private Tow tow;
    @Size(max = 20)
    private String serTow;
    private Double ilTow;

}
