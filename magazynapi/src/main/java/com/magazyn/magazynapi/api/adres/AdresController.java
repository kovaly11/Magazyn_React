package com.magazyn.magazynapi.api.adres;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/adres")
@CrossOrigin(origins = "http://localhost:3000")
public class AdresController {
    @Autowired
    private AdresRepository adresRepository;

    @PostMapping(path="/add")
    public @ResponseBody String addNewAdres (@RequestParam String mej
            , @RequestParam String ulica, @RequestParam String bud
            , @RequestParam String kod,   @RequestParam String kraj) {
        Adres adr = new Adres();
        adr.setMej(mej);
        adr.setUlica(ulica);
        adr.setBud(bud);
        adr.setKod(kod);
        adr.setKraj(kraj);
        adresRepository.save(adr);
        return "Saved";
    }

    @PostMapping(path="/update")
    public @ResponseBody String updateAdres (
            @RequestParam Integer id,   @RequestParam String mej,
            @RequestParam String ulica, @RequestParam String bud,
            @RequestParam String kod,   @RequestParam String kraj) {
        Adres adr = adresRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + id));
        //adresRepository.delete(adr);
        adr.setMej(mej);
        adr.setUlica(ulica);
        adr.setBud(bud);
        adr.setKod(kod);
        adr.setKraj(kraj);
        adresRepository.save(adr);
        return "Update";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Adres>  getAllAdres(){
        return adresRepository.findAll();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody Adres  getAdresById(@PathVariable("id") Integer id){

         return adresRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + id));
    }

    @PostMapping(path = "/delete")
    public @ResponseBody String delAdres(@RequestParam Integer id)
    {
        Adres adr = adresRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + id));
        adresRepository.delete(adr);
        return "delete Adres with ID: " + id.toString();
    }


}
