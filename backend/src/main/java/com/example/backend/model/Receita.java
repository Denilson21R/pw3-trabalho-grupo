package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "receita")
public class Receita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false)
    private Long tempo_de_preparo;
    @Column(nullable = false)
    private String modo_de_preparo;
    @Column(nullable = false)
    private String estacao_ano;

    @ManyToOne
    @JoinColumn(name = "id_criador", nullable = false)
    private Usuario criador_receita;
    @ManyToMany
    @JoinTable(
            name = "ingredientes_receita",
            joinColumns = @JoinColumn(
                    name = "receita_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "ingrediente_id",
                    referencedColumnName = "id"
            )
    )
    @JsonIgnore()
    private List<Ingrediente> ingredientes;

    public Receita() {
    }


    public Receita(String nome, Long tempo_de_preparo, String estacao_ano, Usuario criador, String modo_preparo, String ingredientes) {
        this.nome = nome;
        this.tempo_de_preparo = tempo_de_preparo;
        this.estacao_ano = estacao_ano;
        this.criador_receita = criador;
        this.modo_de_preparo = modo_preparo;
        addIngredientesToList(ingredientes);
    }

    public String getModo_de_preparo() {
        return modo_de_preparo;
    }

    public void setModo_de_preparo(String modo_de_preparo) {
        this.modo_de_preparo = modo_de_preparo;
    }

    public void addIngredientesToList(String ingredientes) {
        String[] stringIdsIngredientes = ingredientes.split(",");
        List<Ingrediente> ingredienteList = new ArrayList<>();
        for (String id: stringIdsIngredientes) {
            System.out.println(id);
            Ingrediente ingrediente = new Ingrediente();
            ingrediente.setId(Long.parseLong(id));
            ingredienteList.add(ingrediente);
        }
        this.ingredientes = ingredienteList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getTempo_de_preparo() {
        return tempo_de_preparo;
    }

    public void setTempo_de_preparo(Long tempo_de_preparo) {
        this.tempo_de_preparo = tempo_de_preparo;
    }

    public String getEstacao_ano() {
        return estacao_ano;
    }

    public void setEstacao_ano(String estacao_ano) {
        this.estacao_ano = estacao_ano;
    }

    public Usuario getCriador_receita() {
        return criador_receita;
    }

    public void setCriador_receita(Usuario criador_receita) {
        this.criador_receita = criador_receita;
    }

    public List<Ingrediente> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(List<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
    }
}
