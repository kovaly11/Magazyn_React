package com.magazyn.magazynapi.api.dokmag;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.magazyn.magazynapi.api.adres.Adres;
import com.magazyn.magazynapi.api.firmy.Firmy;
import com.magazyn.magazynapi.api.mag.Mag;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name="DOK_MAG")
@Getter
@Setter
public class DokMag  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDok;
    @OneToOne
    @JoinColumn(name="idMag")
    private Mag mag;
    @Size(max=2)
    private String tDok;
    private Integer kier;
    private Integer nDok;
    @Column(name = "ID_F")
    private Integer idF;
    @Temporal(TemporalType.TIMESTAMP)
    private Date data;
    private Integer okres;
    private Integer idPow;

}

