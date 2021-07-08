package com.magazyn.magazynapi.api.pracownik;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PracownikRepository extends CrudRepository<Pracownik, Integer>{
    @Query(value = "SELECT * FROM PRACOWNIK WHERE login = :login and haslo= :haslo", nativeQuery = true)
    List<Pracownik> findPracownikByLoginAndHaslo(@Param("login") String login, @Param("haslo") String haslo);
}
