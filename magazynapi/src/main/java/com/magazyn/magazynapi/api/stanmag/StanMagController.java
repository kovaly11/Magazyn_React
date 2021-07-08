package com.magazyn.magazynapi.api.stanmag;

import com.magazyn.magazynapi.api.tow.Tow;
import com.magazyn.magazynapi.api.tow.TowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(path = "/stanmag")
@CrossOrigin(origins = "http://localhost:3000")
public class StanMagController {
    @Autowired
    StanMagRepository stanMagRepository;
    @Autowired
    TowRepository towRepository;

    @GetMapping(path="/all")
    public @ResponseBody
    Iterable<StanMag>  getAllStanMag(){
        return stanMagRepository.findAll();
    }

    @GetMapping(path="/{idMag}")
    public @ResponseBody
    List<StanMag> getStanmagByIdMag(@PathVariable("idMag") Integer idMag) {
        return stanMagRepository.findStanMagByIdMag(idMag);
    }
    @GetMapping(path="tow/{idMag}")
    public @ResponseBody
    Iterable<Tow> getStanmagByTow(@PathVariable("idMag") Integer idMag) {
        ArrayList<Integer> listId = stanMagRepository.findStanMagTow(idMag);
        ArrayList<Tow> tows = new ArrayList<Tow>();

        for (Integer id : listId){
            Tow tow = towRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid firm Id:" + id));
            tows.add(tow);

        }
        return tows;
    }
    @GetMapping(path="/{idMag}/{idTow}")
    public @ResponseBody
    List<StanMag> getStanmagByIdMagIdTow(@PathVariable("idMag") Integer idMag, @PathVariable("idTow") Integer idTow){
            return stanMagRepository.findStanMagByIdMagIdTow(idMag,idTow);
    }
}
