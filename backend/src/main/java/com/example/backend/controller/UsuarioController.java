package com.example.backend.controller;
import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
public class UsuarioController {

    @Autowired
    UsuarioRepository usuarioRepository;

    @GetMapping(value = "api/usuario/{id}")
    public ResponseEntity<Usuario> getUsuarioPorId(@PathVariable(value = "id") Long id){
        try{
            Optional<Usuario> usuario = usuarioRepository.findById(id);
            return usuario.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("api/usuario")
    public ResponseEntity<Usuario> addUsuario(@RequestParam Map<String, String> novoUsuario){
        if(novoUsuario.containsKey("nome")
                && novoUsuario.containsKey("login")
                && novoUsuario.containsKey("senha")){
            //TODO: verificar se ja existe alguem com esse login
            try{
                Usuario usuario = new Usuario(
                        novoUsuario.get("nome"),
                        novoUsuario.get("login"),
                        novoUsuario.get("senha")
                );
                Usuario usuarioSalvo = usuarioRepository.save(usuario);
                return new ResponseEntity<>(usuarioSalvo, HttpStatus.CREATED);
            }catch (Exception e){
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @PostMapping("api/usuario/auth")
    public ResponseEntity<Usuario> login(@RequestParam Map<String, String> usuarioLogin){
        if(usuarioLogin.containsKey("login") && usuarioLogin.containsKey("senha")){
            try{
                Usuario usuario = usuarioRepository.findByLogin(usuarioLogin.get("login"));
                if(BCrypt.checkpw(usuarioLogin.get("senha"), usuario.getSenha())){
                    return new ResponseEntity<>(usuario, HttpStatus.OK);
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

    @PutMapping("api/usuario/{id}")
    public ResponseEntity<Usuario> atualizaUsuario(
            @PathVariable(value = "id") Long id,
            @RequestParam Map<String, String> novoUsuario
    ){
        if(novoUsuario.containsKey("nome")
                && novoUsuario.containsKey("login")
                && novoUsuario.containsKey("senha")){
            Optional<Usuario> usuario = usuarioRepository.findById(id);
            if(usuario.isPresent()){
                //TODO: verificar se ja existe alguem com esse login
                Usuario usuarioEditar = usuario.get();
                usuarioEditar.setNome(novoUsuario.get("nome"));
                usuarioEditar.setLogin(novoUsuario.get("login"));
                usuarioEditar.setSenha(BCrypt.hashpw(novoUsuario.get("senha"), BCrypt.gensalt()));
                try{
                    Usuario usuarioEditado = usuarioRepository.save(usuarioEditar);
                    return new ResponseEntity<>(usuarioEditado, HttpStatus.OK);
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
