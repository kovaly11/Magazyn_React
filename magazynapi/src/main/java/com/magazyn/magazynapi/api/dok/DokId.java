package com.magazyn.magazynapi.api.dok;


import java.io.Serializable;

public class DokId implements Serializable {
    private Integer idDok;
    private Integer lPoz;
    public DokId() {};
    public DokId(Integer idDok, Integer lPoz){
        this.idDok = idDok;
        this.lPoz = lPoz;
    }
}
