package com.magazyn.magazynapi.api.dokmag;

import com.magazyn.magazynapi.api.dok.Dok;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface DokMagRepository extends CrudRepository<DokMag, Integer> {
    @Query(value = "SELECT * FROM DOK_MAG ORDER BY DATA ", nativeQuery = true)
    List<DokMag> DokMagSorted();
    @Query(value = "SELECT * FROM DOK_MAG ORDER BY DATA DESC", nativeQuery = true)
    List<DokMag> DokMagSortedDesc();
    @Query(value = "SELECT * FROM DOK_MAG WHERE DATA between :data1 AND :data2", nativeQuery = true)
    List<DokMag> findDokMagBetweenDate(@Param("data1") Date data1, @Param("data2") Date data2);
}
