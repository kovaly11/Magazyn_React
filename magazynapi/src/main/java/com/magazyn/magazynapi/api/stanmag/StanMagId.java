package com.magazyn.magazynapi.api.stanmag;

import java.io.Serializable;

public class StanMagId implements Serializable {
    private Integer idMag;
    private String serTow;
    public StanMagId() {};
    public StanMagId(Integer idMag, String serTow) {
        this.idMag = idMag;
        this.serTow = serTow;
    }

}
