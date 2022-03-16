package com.devsuperior.dsmovie.services;

import com.devsuperior.dsmovie.dto.MovieDTO;
import com.devsuperior.dsmovie.dto.ScoreDTO;
import com.devsuperior.dsmovie.entities.Movie;
import com.devsuperior.dsmovie.entities.Score;
import com.devsuperior.dsmovie.entities.ScorePK;
import com.devsuperior.dsmovie.entities.User;
import com.devsuperior.dsmovie.repositories.MovieRepository;
import com.devsuperior.dsmovie.repositories.ScoreRepository;
import com.devsuperior.dsmovie.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ScoreService {

    //preciso do movieRepository pq busco o filme no banco de dados a partir do id do filme
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    @Transactional //para garantir a transação com o banco
    public MovieDTO saveScore(ScoreDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail());

        //verifica se o usuário já existe na base de dados
        if(user == null) {
            user = new User();
            user.setEmail(dto.getEmail());
            // user = userRepository.save(user); //método SAVE para salvar no banco de dados passando o user como param
            user = userRepository.saveAndFlush(user); //para garantir que tem o objeto sempre atualizado
        }

        Movie movie = movieRepository.findById(dto.getMovieId()).get(); //retorna um optional por isso da o .get para pegar o obj dentro do optional

        //instancia o score, já que ele tem relação com o movie e user e seta as inforamações e nota que o usuário atribuiu
        Score score = new Score();

        score.setMovie(movie); //filme já encontrado na base de dados
        score.setUser(user); //usuário já verificado na base de dados
        score.setValue(dto.getScore()); //nota que o usuário atribuiu

        // Salvando Score na base de dados
        score = scoreRepository.saveAndFlush(score);

        //falta atualizar a média dos filmes
        //para isso precisa alterar a classe MOVIE, após isso

        double sum = 0.0;
        for(Score s : movie.getScores()) {
            sum+=s.getValue(); //s.getValue é da classe Score
        }

        double avg = sum / movie.getScores().size(); // peguei o tamanho para fazer a média

        movie.setScore(avg); //média
        movie.setCount(movie.getScores().size());

        movie = movieRepository.save(movie); //salvo no banco de dados

        return new MovieDTO(movie); //passando para DTO para a controller

    }

}
