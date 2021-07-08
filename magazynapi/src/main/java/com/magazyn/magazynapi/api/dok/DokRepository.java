package com.magazyn.magazynapi.api.dok;

import com.magazyn.magazynapi.api.pracownik.Pracownik;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DokRepository extends CrudRepository<Dok, DokId> {
    @Query(value = "SELECT * FROM DOK WHERE ID_DOK = :idDok", nativeQuery = true)
    List<Dok> findDokByIdDok(@Param("idDok") Integer idDok);
}
