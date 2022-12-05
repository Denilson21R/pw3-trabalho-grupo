package com.example.backend.controller;

import com.example.backend.model.Ingrediente;
import com.example.backend.model.IngredienteStatus;
import com.example.backend.repository.IngredienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class IngredienteController {

    @Autowired
    IngredienteRepository ingredienteRepository;

    @GetMapping(value = "api/ingrediente")
    public ResponseEntity<List<Ingrediente>> getIngredientes(){
        try{
            List<Ingrediente> ingredientes = ingredienteRepository.findAll();
            return new ResponseEntity<>(ingredientes, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "api/ingrediente/{id}")
    public ResponseEntity<Ingrediente> getIngredientePorId(@PathVariable(value = "id") Long id){
        try{
            Optional<Ingrediente> ingrediente = ingredienteRepository.findById(id);
            return ingrediente.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("api/ingrediente")
    public ResponseEntity<Ingrediente> addIngrediente(@RequestParam Map<String, String> novoIngrediente){
        if(novoIngrediente.containsKey("nome")
            && novoIngrediente.containsKey("quantidade")
            && novoIngrediente.containsKey("unidade")){
                try{
                    Ingrediente ingrediente = new Ingrediente(
                        novoIngrediente.get("nome"),
                        Long.parseLong(novoIngrediente.get("quantidade")),
                        novoIngrediente.get("unidade")
                    );
                    Ingrediente ingredienteSalvo = ingredienteRepository.save(ingrediente);
                    return new ResponseEntity<>(ingredienteSalvo, HttpStatus.CREATED);
                }catch (Exception e){
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
        }else{
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @PutMapping("api/ingrediente/{id}")
    public ResponseEntity<Ingrediente> atualizaIngrediente(
            @PathVariable(value = "id") Long id,
            @RequestParam Map<String, String> novoIngrediente
            ){
        if(novoIngrediente.containsKey("nome")
                && novoIngrediente.containsKey("quantidade")
                && novoIngrediente.containsKey("unidade")
                && novoIngrediente.containsKey("status")){
            Optional<Ingrediente> ingrediente = ingredienteRepository.findById(id);
            if(ingrediente.isPresent()){
                Ingrediente ingredienteEditar = ingrediente.get();
                ingredienteEditar.setNome(novoIngrediente.get("nome"));
                ingredienteEditar.setQuantidade(Long.parseLong(novoIngrediente.get("quantidade")));
                ingredienteEditar.setUnidade(novoIngrediente.get("unidade"));
                ingredienteEditar.setStatus(IngredienteStatus.values()[Integer.parseInt(novoIngrediente.get("status"))]);
                try{
                    Ingrediente ingredienteEditado = ingredienteRepository.save(ingredienteEditar);
                    return new ResponseEntity<>(ingredienteEditado, HttpStatus.OK);
                }catch (Exception e){
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }else{
                return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
