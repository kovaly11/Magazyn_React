package com.magazyn.magazynapi.api.history;

import com.magazyn.magazynapi.api.pracownik.Pracownik;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HistoryRepository extends CrudRepository<History, Integer> {
    @Query(value = "SELECT * FROM HISTORY WHERE ID_PRAC = :idPrac", nativeQuery = true)
    List<History> findHistoryById(@Param("idPrac") Integer idPrac);
}
