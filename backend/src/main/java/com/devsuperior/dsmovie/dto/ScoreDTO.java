package com.devsuperior.dsmovie.dto;

public class ScoreDTO {
    //classe para receber o email, id do filme e avaliação

    private Long movieId;
    private String email;
    private Double score;

    //contructors
    public ScoreDTO() {

    }

    //Getters and Setters
    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }
}
