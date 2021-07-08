package com.magazyn.magazynapi.api.history;

import com.magazyn.magazynapi.api.dok.Dok;
import com.magazyn.magazynapi.api.dokmag.DokMag;
import com.magazyn.magazynapi.api.firmy.Firmy;
import com.magazyn.magazynapi.api.firmy.FirmyRepository;
import com.magazyn.magazynapi.api.mag.Mag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(path="/history")
@CrossOrigin(origins = "http://localhost:3000")
public class HistoryController {
    @Autowired
    private HistoryRepository historyRepository;

    @GetMapping(path="/all")
    public @ResponseBody
    Iterable<History> getAllFirmy(){
        return historyRepository.findAll();
    }

    @GetMapping(path="/{idPrac}")
    public @ResponseBody
    List<History> getDokById(@PathVariable("idPrac") Integer idPrac){
        return historyRepository.findHistoryById(idPrac);
    }

    @PostMapping(path="/add")
    public @ResponseBody
    String addNewDokMag (@RequestParam Integer idPrac
            , @RequestParam String rod, @RequestParam Integer idRod, @RequestParam String typ
            , @RequestParam @DateTimeFormat(pattern = "dd.MM.yyyy, HH:mm:ss") Date dat) {
        History history = new History();
        history.setIdPrac(idPrac);
        history.setRod(rod);
        history.setIdRod(idRod);
        history.setTyp(typ);
        history.setDat(dat);
        historyRepository.save(history);
        return "Success";
    }
}
