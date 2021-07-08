package com.magazyn.magazynapi.api.stanmag;

import com.magazyn.magazynapi.api.dok.Dok;
import com.magazyn.magazynapi.api.tow.Tow;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;

public interface StanMagRepository extends CrudRepository<StanMag, StanMagId> {
    @Query(value = "SELECT * FROM STAN_MAG WHERE ID_MAG = :idMag", nativeQuery = true)
    List<StanMag> findStanMagByIdMag(@Param("idMag") Integer idMag);
    @Query(value = "SELECT * FROM STAN_MAG WHERE ID_MAG = :idMag AND ID_TOW=:idTow", nativeQuery = true)
    List<StanMag> findStanMagByIdMagIdTow(@Param("idMag") Integer idMag, @Param("idTow") Integer idTow );
    @Query(value = "SELECT  distinct(ID_TOW)  FROM STAN_MAG WHERE ID_MAG = :idMag ", nativeQuery = true)
    ArrayList<Integer> findStanMagTow(@Param("idMag") Integer idMag);
}
