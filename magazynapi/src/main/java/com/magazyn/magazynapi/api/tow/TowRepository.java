package com.magazyn.magazynapi.api.tow;

import com.magazyn.magazynapi.api.dokmag.DokMag;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface TowRepository extends CrudRepository<Tow, Integer> {
    @Query(value = "SELECT * FROM TOW WHERE lower(N_TOW) LIKE %:str% ", nativeQuery = true)
    List<Tow> findTowByStr(@Param("str") String str);
}

