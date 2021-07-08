package com.magazyn.magazynapi.api.pracownik;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table
@Setter
@Getter
public class Pracownik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer idPrac;

    @Size(max = 30)
    private String login;

    @Size(max = 30)
    private String haslo;

    @Size(max = 30)
    private String imie;

    @Size(max = 30)
    private String nazw;
}
