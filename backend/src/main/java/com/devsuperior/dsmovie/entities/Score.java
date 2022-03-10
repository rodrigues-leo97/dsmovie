package com.devsuperior.dsmovie.entities;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "tb_score")
public class Score {

    @EmbeddedId //por ser um ID COMPOSTO se usa essa annotation
    private ScorePK id = new ScorePK(); // chave composta, dar o new pra garantir que irá estar instanciada
    private Double value;

    // Score aponta para um Movie e para um User e ainda tem o terceiro valor que é o value

    // Constructors
    public Score(ScorePK id, Double value) {
        this.id = id;
        this.value = value;
    }

    public Score() {
    }

    // Getters and Setters

    //setando o Movie e user para ambos terem referencia para o Score
    public void setMovie(Movie movie) { //settando a classe Movie aqui, para ter como associação
        id.setMovie(movie); //id é do tipo ScorePK, e ele tem a referencia do MOVIE
    }

    public void setUser(User user) {
        id.setUser(user);
    }

    public ScorePK getId() {
        return id;
    }

    public void setId(ScorePK id) {
        this.id = id;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
