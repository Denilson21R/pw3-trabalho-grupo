package com.example.backend.repository;

import com.example.backend.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    @Query(value = "SELECT r FROM Receita r WHERE r.criador_receita.id = ?1")
    List<Receita> findReceitasByUsuarioId(Long id);
}
