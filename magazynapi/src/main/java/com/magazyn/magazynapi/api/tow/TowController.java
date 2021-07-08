package com.magazyn.magazynapi.api.tow;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path ="/tow")
@CrossOrigin(origins = "http://localhost:3000")
public class TowController {
    @Autowired
    private TowRepository towRepository;

    @PostMapping(path="/add")
    public @ResponseBody String addNewMag (@RequestParam String nTow
            , @RequestParam String kTow, @RequestParam String pTow
            , @RequestParam Double wTow, @RequestParam String wyTow) {
        Tow tow = new Tow();
        tow.setNTow(nTow);
        tow.setKTow(kTow);
        tow.setPTow(pTow);
        tow.setWTow(wTow);
        tow.setWyTow(wyTow);

        towRepository.save(tow);
        return "Saved";
    }

    @PostMapping(path="/update")
    public @ResponseBody String updateMag (
            @RequestParam Integer id,    @RequestParam String nTow
            , @RequestParam String kTow, @RequestParam String pTow
            , @RequestParam Double wTow, @RequestParam String wyTow) {
        Tow tow = towRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid tow Id:" + id));
        tow.setNTow(nTow);
        tow.setKTow(kTow);
        tow.setPTow(pTow);
        tow.setWTow(wTow);
        tow.setWyTow(wyTow);

        towRepository.save(tow);
        return "Update";
    }

    @GetMapping(value = "/all")
    public @ResponseBody Iterable<Tow> getAllTow(){
        return towRepository.findAll();
    }

    @GetMapping(path="/{id}")
    public @ResponseBody
    Tow getTowById(@PathVariable("id") Integer id){

        return towRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid tow's Id:" + id));
    }
    @GetMapping(path="/find")
    public @ResponseBody
    Iterable<Tow> getTowByStr(@RequestParam ("str") String str){

        return towRepository.findTowByStr(str);
    }

    @PostMapping(path = "/delete")
    public @ResponseBody String delTow(@RequestParam Integer id) {
        Tow tow = towRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid tow's Id:" + id));
        towRepository.delete(tow);
        return "delete tow with Id: " + id.toString();
    }
}

