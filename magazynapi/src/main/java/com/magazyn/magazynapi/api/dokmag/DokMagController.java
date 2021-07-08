package com.magazyn.magazynapi.api.dokmag;

import com.magazyn.magazynapi.api.firmy.Firmy;
import com.magazyn.magazynapi.api.firmy.FirmyRepository;
import com.magazyn.magazynapi.api.mag.Mag;
import com.magazyn.magazynapi.api.mag.MagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.criteria.CriteriaBuilder;
import javax.swing.text.View;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Controller
@RequestMapping(path = "/doks")
@CrossOrigin(origins = "http://localhost:3000")
public class DokMagController {
    @Autowired
    private DokMagRepository dokMagRepository;
    @Autowired
    private MagRepository magRepository;
    @Autowired
    private FirmyRepository firmyRepository;

    @PostMapping(path="/add")
    public @ResponseBody
    String addNewDokMag (@RequestParam Integer idMag
            , @RequestParam String tDok, @RequestParam Integer idF
            , @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm") Date data) {
        Mag mag= magRepository.findById(idMag)
                .orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + idMag));
        DokMag dokMag = new DokMag();
        dokMag.setIdF(idF);
        dokMag.setMag(mag);
        dokMag.setTDok(tDok);
        dokMag.setData(data);
        dokMagRepository.save(dokMag);
        return "Success";
    }

    @PostMapping(path="/update")
    public @ResponseBody String updateDokMag (@RequestParam Integer id
            , @RequestParam Mag idMag, @RequestParam String tDok
            , @RequestParam Integer idF            , @RequestParam  @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm") Date data) {
        DokMag dokMag= dokMagRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + id));
        dokMag.setMag(idMag);
        dokMag.setTDok(tDok);
        dokMag.setIdF(idF);
        dokMag.setData(data);
        dokMagRepository.save(dokMag);
        return "Update";
    }


    @GetMapping(path = "/all")
    public @ResponseBody Iterable<DokMag> getAllDokMag(){
        return dokMagRepository.findAll();
    }

    @GetMapping(path = "/sort")
    public @ResponseBody Iterable<DokMag> getAllSortDokMag(){
        return dokMagRepository.DokMagSorted();
    }

    @GetMapping(path = "/sortdesc")
    public @ResponseBody Iterable<DokMag> getAllSortDescDokMag(){
        return dokMagRepository.DokMagSortedDesc();
    }

    @GetMapping(path = "/datasort")
    public @ResponseBody Iterable<DokMag> getDateDokMag(@RequestParam ("data1") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm") Date data1,  @RequestParam("data2") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm") Date data2){
        return dokMagRepository.findDokMagBetweenDate(data1, data2);
    }

    @GetMapping(path="/{id}")
    public @ResponseBody DokMag getDokMagById(@PathVariable("id") Integer id){

        return dokMagRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + id));
    }

    @PostMapping(path = "/delete")
    public @ResponseBody String delDokMag(@RequestParam Integer id) {
        DokMag dokMag = dokMagRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid adres Id:" + id));
        dokMagRepository.delete(dokMag);
        return "delete DokMag with ID: " + id.toString();
    }
}
