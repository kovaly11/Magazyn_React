package com.magazyn.magazynapi.api.mag;
import com.magazyn.magazynapi.api.adres.Adres;

import com.magazyn.magazynapi.api.adres.AdresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/mag")
@CrossOrigin(origins = "http://localhost:3000")
public class MagController {
    @Autowired
    private MagRepository magRepository;
    @Autowired
    private AdresRepository adresRepository;

    @PostMapping(path="/add")
    public @ResponseBody String addNewMag (@RequestParam String nMag
            , @RequestParam String kMag, @RequestParam String tMag
            , @RequestParam Integer idAd ) {
        Adres adres = adresRepository.findById(idAd)
                .orElseThrow(() -> new IllegalArgumentException("Invalid firm Id:" + idAd));
        Mag mag = new Mag();
        mag.setKMag(kMag);
        mag.setNMag(nMag);
        mag.setTMag(tMag);
        mag.setAdres(adres);

        magRepository.save(mag);
        return "Saved";
    }

    @PostMapping(path="/update")
    public @ResponseBody String updateMag (
            @RequestParam Integer id,    @RequestParam String nMag
            , @RequestParam String kMag, @RequestParam String tMag
            , @RequestParam Adres idAd ) {
        Mag mag = magRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid mag Id:" + id));
        mag.setKMag(kMag);
        mag.setNMag(nMag);
        mag.setTMag(tMag);
        mag.setAdres(idAd);

        magRepository.save(mag);
        return "Update";
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Mag> getAllMag(){
        return magRepository.findAll();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Mag getMagById(@PathVariable("id") Integer id){

        return magRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid mag's Id:" + id));
    }

    @PostMapping(path = "/delete")
    public @ResponseBody String delMag(@RequestParam Integer id) {
        Mag mag = magRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid mag's Id:" + id));
        magRepository.delete(mag);
        return "delete firm with Id: " + id.toString();
    }
}
