package com.example.backend.controller;

import com.example.backend.model.Receita;
import com.example.backend.model.Usuario;
import com.example.backend.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ReceitaController {

    @Autowired
    ReceitaRepository receitaRepository;

    @GetMapping(value = "api/receita")
    public ResponseEntity<List<Receita>> getReceitas(){
        try{
            List<Receita> ingredientes = receitaRepository.findAll();
            return new ResponseEntity<>(ingredientes, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "api/receita/{id}")
    public ResponseEntity<Receita> getReceitaPorId(@PathVariable(value = "id") Long id){
        try{
            Optional<Receita> receita = receitaRepository.findById(id);
            return receita.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("api/receita")
    public ResponseEntity<Receita> addReceita(@RequestParam Map<String, String> novaReceita){
        if(novaReceita.containsKey("nome")
            && novaReceita.containsKey("tempo_de_preparo")
            && novaReceita.containsKey("estacao_ano")
            && novaReceita.containsKey("criador")
            && novaReceita.containsKey("ingredientes")){
            try{
                Usuario criador = new Usuario();
                criador.setId(Long.parseLong(novaReceita.get("criador")));
                Receita receita = new Receita(
                        novaReceita.get("nome"),
                        Long.parseLong(novaReceita.get("tempo_de_preparo")),
                        novaReceita.get("estacao_ano"),
                        criador,
                        novaReceita.get("ingredientes")
                );
                Receita receitaSalva = receitaRepository.save(receita);
                return new ResponseEntity<>(receitaSalva, HttpStatus.CREATED);
            }catch (Exception e){
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @PutMapping("api/receita/{id}")
    public ResponseEntity<Receita> atualizaReceita(@RequestParam Map<String, String> novaReceita, @PathVariable(value = "id") Long id){
        if(novaReceita.containsKey("nome")
                && novaReceita.containsKey("tempo_de_preparo")
                && novaReceita.containsKey("estacao_ano")
                && novaReceita.containsKey("ingredientes")){
            try{
                Optional<Receita> receitaAtualizar = receitaRepository.findById(id);
                if(receitaAtualizar.isPresent()){
                    Receita receita = receitaAtualizar.get();
                    receita.setNome(novaReceita.get("nome"));
                    receita.setNome(novaReceita.get("tempo_de_preparo"));
                    receita.setNome(novaReceita.get("estacao_ano"));
                    receita.addIngredientesToList(novaReceita.get("ingredientes"));
                    Receita receitaSalva = receitaRepository.save(receita);
                    return new ResponseEntity<>(receitaSalva, HttpStatus.CREATED);
                }else{
                    return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
                }
            }catch (Exception e){
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @DeleteMapping("api/receita/{id}")
    public ResponseEntity<Receita> deletaReceita(@PathVariable(value = "id") Long id){
        try{
            Optional<Receita> receita = receitaRepository.findById(id);
            if(receita.isPresent()){
                Receita receitaDeletar = receita.get();
                receitaRepository.delete(receitaDeletar);
                return new ResponseEntity<>(receitaDeletar, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
