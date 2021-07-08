package com.magazyn.magazynapi.api.dok;

import com.magazyn.magazynapi.api.dokmag.DokMag;
import com.magazyn.magazynapi.api.tow.Tow;
import com.magazyn.magazynapi.api.tow.TowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

@Controller
@RequestMapping(path = "/doki")
@CrossOrigin(origins = "http://localhost:3000")
public class DokController {
    @Autowired
    DokRepository dokRepository;
    @Autowired
    TowRepository towRepository;


    @GetMapping(path = "/all")
    @ResponseBody Iterable<Dok> getAllDok(){
        return dokRepository.findAll();
    }

    @GetMapping(path="/{idDok}/{lPoz}")
    public @ResponseBody
    Dok getDokById(@PathVariable("idDok") Integer idDok,
                         @PathVariable("lPoz") Integer lPoz){
        DokId id = new DokId(idDok, lPoz);
        return dokRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid mag's Id:" + id));
    }
    @GetMapping(path="/{idDok}")
    public @ResponseBody
    List<Dok> getDokById(@PathVariable("idDok") Integer idDok){
                return dokRepository.findDokByIdDok(idDok);
    }
    @PostMapping(path="/add")
    public @ResponseBody String addNewDokMag (@RequestParam Integer idDok
           , @RequestParam Integer idTow
            , @RequestParam Double ilTow, @RequestParam String serTow) {
        Dok dok = new Dok();
        Tow tow = towRepository.findById(idTow)
                .orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + idTow));
        dok.setIdDok(idDok);
        dok.setTow(tow);
        dok.setIlTow(ilTow);
        dok.setSerTow(serTow);
        dokRepository.save(dok);
        return "Saved";
    }
    @PostMapping(path="/update")
    public @ResponseBody String addNewDokMag (@RequestParam Integer idDok
            , @RequestParam Integer idTow, @RequestParam Integer lPoz
            , @RequestParam Double ilTow, @RequestParam String serTow) {
        DokId id = new DokId(idDok, lPoz);
        Dok dok = dokRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + id));
        Tow tow = towRepository.findById(idTow)
                .orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + idTow));
        dok.setTow(tow);
        dok.setIlTow(ilTow);
        dok.setSerTow(serTow);
        dokRepository.save(dok);
        return "Saved";
    }
    @PostMapping(path = "/delete")
    public @ResponseBody String delDokMag(@RequestParam Integer idDok, @RequestParam Integer lPoz) {
        DokId id = new DokId(idDok, lPoz);
        Dok dok = dokRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + id));
        dokRepository.delete(dok);
        return "delete DokMag with ID: ";
    }
}

