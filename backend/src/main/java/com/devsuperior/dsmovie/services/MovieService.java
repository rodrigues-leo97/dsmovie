package com.devsuperior.dsmovie.services;

import com.devsuperior.dsmovie.dto.MovieDTO;
import com.devsuperior.dsmovie.entities.Movie;
import com.devsuperior.dsmovie.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class MovieService {

    // para ter acesso a base de dados usamos o repository
    @Autowired // para não precisar instanciar manualmente a framework já faz isso para nós
    private MovieRepository movieRepository;

    @Transactional(readOnly = true) //para garantir que esse método irá resolver tudo que for da JPA de transação nessa camada de serviço, e o true é para informar que é um método somente de leitura
    public Page<MovieDTO> findAll(Pageable pageable) {
        //serviço conversa com repository na forma de entidade
        //mas ao passar para o controlador passar em DTO
        //List<Movie> result =  movieRepository.findAll(); retorno é uma lista de MOVIE da entidade

        Page<Movie> result = movieRepository.findAll(pageable);

        //tem que converter para <MovieDTO> essa lista de <Movie> e sem usar o FOR, mas sim o MAP
        Page<MovieDTO> page = result.map(x -> new MovieDTO(x));

        // retornando a página
        return page;
    }

    // para buscar um único filme
    public MovieDTO findById(Long id) {
        //Optional<Movie> result = movieRepository.findById(id); quando retorna o tipo optional
        Movie result = movieRepository.findById(id).get(); //para acessar o objeto movie que está dentro do OPTIONAL
        MovieDTO movieDTO = new MovieDTO(result);
        return movieDTO;
    }

}
