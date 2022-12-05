package com.example.backend.model;

import javax.persistence.*;
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
    private List<Ingrediente> ingredientes;

    public Receita() {
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
