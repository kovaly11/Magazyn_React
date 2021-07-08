package com.magazyn.magazynapi.api.pracownik;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@Controller
@RequestMapping(path="/pracownik")
@CrossOrigin(origins = "http://localhost:3000")
public class PracownikController {
    @Autowired
    private PracownikRepository pracownikRepository;

    @PostMapping(path="/add")
    public @ResponseBody String addNewPracownik (@RequestParam String login
            , @RequestParam String haslo, @RequestParam String imie
            , @RequestParam String nazw) {
        Pracownik prac = new Pracownik();
        prac.setLogin(login);
        prac.setHaslo(haslo);
        prac.setImie(imie);
        prac.setNazw(nazw);
        pracownikRepository.save(prac);
        return "Saved";
    }

    @PostMapping(path="/update")
    public @ResponseBody String updatePracownik (
            @RequestParam Integer id,  @RequestParam String login
            , @RequestParam String haslo, @RequestParam String imie
            , @RequestParam String nazw) {
        Pracownik prac = pracownikRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + id));
        prac.setLogin(login);
        prac.setHaslo(haslo);
        prac.setImie(imie);
        prac.setNazw(nazw);
        pracownikRepository.save(prac);
        return "Update";
    }

    @GetMapping(path="/log")
    public @ResponseBody Integer getAllPracownik(@RequestParam ("login") String login, @RequestParam("haslo") String haslo){
        List<Pracownik> prac = pracownikRepository.findPracownikByLoginAndHaslo(login, haslo);
        if(prac.isEmpty())
            return -1;
        else
            return prac.get(0).idPrac;
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Pracownik  getPracownikById(@PathVariable("id") Integer id){

        return pracownikRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + id)); }

    @PostMapping(path = "/delete")
    public @ResponseBody String delAdres(@RequestParam Integer id)
    {
        Pracownik prac = pracownikRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + id));
        pracownikRepository.delete(prac);
        return "delete Adres with ID: " + id.toString();
    }


}
