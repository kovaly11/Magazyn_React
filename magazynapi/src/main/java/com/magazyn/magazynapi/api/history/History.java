package com.magazyn.magazynapi.api.history;

import com.magazyn.magazynapi.api.adres.Adres;
import com.magazyn.magazynapi.api.pracownik.Pracownik;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name = "HISTORY")
@Getter
@Setter
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID_HIST")
    private Integer idHist;
    private Integer idPrac;
    @Size(max = 15)
    @Column(name="ROD")
    private String rod;
    private Integer idRod;
    @Size(max = 11)
    @Column(name="TYP")
    private String typ;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dat;



}
