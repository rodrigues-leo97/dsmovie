package com.devsuperior.dsmovie.entities;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable //por ser chave composta
public class ScorePK implements Serializable {

    private static final long seriaVersionUID = 1L; //ele pede um n° de versão mas não é obrigatório

    //configurando relação entre o score e o movie

    //muitos scores podem ter um filme
    @ManyToOne
    @JoinColumn(name = "movie_id") //nome da chave estrangeira
    private Movie movie;

    @ManyToOne //configurando relação entre o user e o score
    @JoinColumn(name = "user_id")
    private User user;

    // Constructors
    public ScorePK(Movie movie, User user) {
        this.movie = movie;
        this.user = user;
    }

    public ScorePK() {

    }

    // Getters and Setters
    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
