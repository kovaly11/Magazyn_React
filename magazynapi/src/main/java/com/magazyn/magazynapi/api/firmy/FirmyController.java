package com.magazyn.magazynapi.api.firmy;

import com.magazyn.magazynapi.api.adres.AdresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.magazyn.magazynapi.api.adres.Adres;

@Controller

@RequestMapping(path="/firmy")
@CrossOrigin(origins = "http://localhost:3000")
public class FirmyController {

    @Autowired
    private FirmyRepository firmyRepository;
    @Autowired
    private AdresRepository adresRepository;

    @PostMapping(path="/add")
    public @ResponseBody String addNewFirmy (@RequestParam String tFir
            , @RequestParam String sNaz, @RequestParam String pNaz
            , @RequestParam String nip, @RequestParam String pesel
            , @RequestParam Integer idAd, @RequestParam String osoba
            , @RequestParam String tel, @RequestParam String email) {
        Firmy firmy = new Firmy();
        Adres adres = adresRepository.findById(idAd)
                .orElseThrow(() -> new IllegalArgumentException("Invalid firm Id:" + idAd));
        firmy.setTFir(tFir);
        firmy.setSNaz(sNaz);
        firmy.setPNaz(pNaz);
        firmy.setNip(nip);
        firmy.setPesel(pesel);
        firmy.setAdres(adres);
        firmy.setOsoba(osoba);
        firmy.setTel(tel);
        firmy.setEmail(email);
        firmyRepository.save(firmy);
        return "Saved";
    }

    @PostMapping(path="/update")
    public @ResponseBody String updateFirmy (
            @RequestParam Integer id,    @RequestParam String tFir
            , @RequestParam String sNaz, @RequestParam String pNaz
            , @RequestParam String nip, @RequestParam String pesel
            , @RequestParam Adres idAd, @RequestParam String osoba
            , @RequestParam String tel, @RequestParam String email) {
        Firmy firmy= firmyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid firm Id:" + id));
        firmy.setTFir(tFir);
        firmy.setSNaz(sNaz);
        firmy.setPNaz(pNaz);
        firmy.setNip(nip);
        firmy.setPesel(pesel);
        firmy.setAdres(idAd);
        firmy.setOsoba(osoba);
        firmy.setTel(tel);
        firmy.setPesel(pesel);
        firmy.setEmail(email);
        firmyRepository.save(firmy);
        return "Update";
    }


    @GetMapping(path="/all")
    public @ResponseBody Iterable<Firmy> getAllFirmy(){
        return firmyRepository.findAll();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Firmy getFirmyById(@PathVariable("id") Integer id){

        return firmyRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid firm's Id:" + id));
    }

    @PostMapping(path = "/delete")
    public @ResponseBody String delFirmy(@RequestParam Integer id) {
        Firmy firma = firmyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid firm's Id:" + id));
        firmyRepository.delete(firma);
        return "delete firm with ID: " + id.toString();
    }
}
