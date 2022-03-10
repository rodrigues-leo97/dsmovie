package com.devsuperior.dsmovie.entities;

import javax.persistence.*;

@Entity
@Table(name = "tb_movie") //nome da tabela no banco
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // id autoincrementável no banco de dados
    private Long id;
    private String title;
    private Double score;
    private Integer count;
    private String image;

    // Constructors
    public Movie(Long id, String title, Double score, Integer count, String image) {
        this.id = id;
        this.title = title;
        this.score = score;
        this.count = count;
        this.image = image;
    }

    public Movie() {

    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
