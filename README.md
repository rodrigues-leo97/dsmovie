# Lista FRONTEND

- [x] Criar projeto
- [x] Instalar Bootstrap
- [x] Instalar Rotas

# Comandos de instalação
- yarn create react-app frontend --template typescript //criando projeto
- yarn add bootstrap@5.1.3


# Imports
- Após instalar o bootstrap fazer o import na classe INDEX.TSX
* import 'bootstrap/dist/css/bootstrap.css';
* import './index.css';

# Configurações Globais
- Variável Global: 
- ir no arquivo ts.config.json e colocar "baseUrl": "./src",
- Após isso não precisarei ficar voltando toda hora várias vezes pra acessar um arquivo, pois usando ela já estarei na raíz

# Componentes
- Para criar um componente basta criar uma pasta dentro de src chamada components/NomeDoComponente
- ex: 

 ![image](https://user-images.githubusercontent.com/71105466/156689729-7e32a4d5-1a1e-445b-9841-fb66fd7992ab.png)
 
 
 # Instalando ROTAS
 - yarn add react-router-dom@6.2.1 @types/react-router-dom@5.3.2
 - Configurações das rotas: 
 
   OBS: São colocadas no App.tsx

```
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Listing from 'pages/Listing';
import Form from 'pages/Form';
import Navbar from "components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/form">
          <Route path=":movieId" element={<Form />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

```

- Após isso, ou antes, criar pelo menos as pastas para os arquivos no trecho de código acima das rotas
- src/pages/Listing/index.tsx   (Componentes de página em outra pasta, para diferenciar rotas de componentes de telas)
- src/pages/Form/index.tsx

## Entendendo como funcionam as rotas
- Foi importado três componentes do ReactRouter pra criar as rotas (BrowserRouter, Routes, Route)
- Também terei que importar os componentes do React (Listing, Form, NavBar) para ativar o componente em cada rota
  
  Começa pela tag do <BrowserRouter> e após ele coloca a tag do <NavBar> pq todas as páginas terão a barra azul no header da page
  Após isso vem o componente <Route> é ele que configura todas as rotas
  OBS: Tem uma subrota que está passando o id do filme <Route path=":movieId" element={< Form /> } /> ex - localhost:3000/form/2

 Importar a seta para troca de página no figma do Nélio
 
 # Criando componente pagination
 
 - src/components/Pagination
 - Importa a imagem usando o import { ReactComponent as apelidoDaImagem } from 'assets/img/arrow.svg'
 
 OBS: para importar imagens tem que usar o ReactComponent
 
 # Criar o component MOVIESTAR
 
 src/components/MovieStars/index.tsx
 
  # Criar o component MOVIESCORE
 
 src/components/MovieScore/index.tsx
 
  # Criar o component MOVIECARD
 
 src/components/MovieCard/index.tsx
 
 
 # Manipulando ROTAS
 - Em MovieCard colocar e importar o <Link to="/form/1>
  
  ex: 
  
  ```
  import MovieScore from "components/MovieScore";
import { Link } from "react-router-dom";


function MovieCard() {

    const movie = {
        id: 1,
        image: "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg",
        title: "The Witcher",
        count: 2,
        score: 4.5
    };

    return (
        <div>
            <img className="dsmovie-movie-card-image" src={ movie.image } alt={ movie.title } />
            <div className="dsmovie-card-bottom-container">
                <h3>{ movie.title }</h3>
                <MovieScore />

                <Link to={`/form/${ movie.id }`} >
                    <div className="btn btn-primary dsmovie-btn">Avaliar</div>
                </Link>
            </div>
        </div>
    );
}

export default MovieCard;
  
  ```
  
  
# LISTA BACKEND

 - frontend (netlify) e backend(heroku)
 - **Estão hospedados em lugares diferentes e por padrão no navegador um sistema que está em um lugar ele não pode acessar uma API que está em outro lugar**
  
 > Tem que liberar isso no projeto do backend e para isso segue os passos abaixo:
 
  CRIAR um PACOTE seguido de um ARQUIVO
  - src/main/java/com.devsuperior.dsmovie/.config/SecurityConfig
  - subpacote de configuração com o arquivo SecurityConfig
  
  ## **DEIXAR A CLASSE COM AS SEGUINTES CONFIG PARA LIBERAR ACESSO A HOSTS DIFERENTES (NETLIFY E HEROKU SE COMUNICAREM):** ##
  
  ```
  
  package com.devsuperior.dsmovie.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private Environment env;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
            http.headers().frameOptions().disable();
        }

        http.cors().and().csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().anyRequest().permitAll();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
        configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

  
  ```
  
 ![image](https://user-images.githubusercontent.com/71105466/157565973-4ea6b4a1-2fae-4b51-9873-fdcfe21290bb.png)
  
    - Segue o seguinte relacionamento, muitos para muitos
    - Sempre quando tem relacionamento n, n é necessário criar uma tabela auxiliar entre ambos, no caso a tabela Score

  
 # Criando COMPONENTE
 
  - src/main/java/com.devsuperior.dsmovie/entities/Movie (Criando a classe MOVIE)
  - src/main/java/com.devsuperior.dsmovie/entities/User (Criando a classe USER)
  
  - CRIAR CLASSE DE ASSOCIAÇÃO (SCORE e ScorePK)
  - src/main/java/com.devsuperior.dsmovie/entities/Score (Criando a classe Score)
  - src/main/java/com.devsuperior.dsmovie/entities/ScorePK (Criando a classe ScorePK)
   * Necessário criar uma outra tabela auxiliar pq temos oq chamamos de chave composta, que no caso são as duas chaves estrangeiras, o IdMovie e IdUser
   * Essas duas chaves estrangeiras que seriam a chave primária, ou seja, uma chave primária composta
   * Necessário criar uma outra tabela auxiliar para conter essas chaves compostas, por conta do JPA (Com construtor, getters e setters)
   * Após isso instanciar a classe ScorePK dentro da classe SCORE
  
  ![image](https://user-images.githubusercontent.com/71105466/157581916-ac16e6b9-4c55-45ac-b487-fc84b39abaa1.png)

  
  ```
  public class Score {

    private ScorePK id = new ScorePK(); // chave composta, dar o new pra garantir que irá estar instanciada
    private Double value;
    
}

  ```
  
  - OBS: ao se fazer uma chave composta no Java, como no código acima é importante dar o NEW para garantir que ele esteja instanciado
  
  # Associando um filme ao Score
  - Para isso na classe Score, fazer um método SET da classe Movie nela, ex:
    ![image](https://user-images.githubusercontent.com/71105466/157569169-98890aec-899f-470f-a1ee-988265dfdedc.png)
  
  - Passo um MOVIE no parametro, e associar ele a meu score:
    * id.setMovie(movie)
    * id é do tipo ScorePK, e ele tem a referencia do MOVIE, e recebeu como param o MOVIE da função SET
  
  - Esse padrão vai seguir também para linkar um USER ao SCORE, ex: 
  
    ![image](https://user-images.githubusercontent.com/71105466/157569854-40d36d5f-5d51-4188-ab02-bd9bb03fdd29.png)
  
  
  # Configurando o BANCO DE DADOS H2
  - Ir no application.properties e colar as duas linhas a seguir de confi
  
  ```
   spring.profiles.active=test

   spring.jpa.open-in-view=false
  
  ```
  
  - Após isso criar o arquivo em src/main/resources/application-test.properties, com as seguintes config: 
  
  ```
   # Dados de conexão com o banco H2
     spring.datasource.url=jdbc:h2:mem:testdb
     spring.datasource.username=sa
     spring.datasource.password=

     # Configuração do cliente web do banco H2
     spring.h2.console.enabled=true
     spring.h2.console.path=/h2-console

     # Configuração para mostrar o SQL no console
     spring.jpa.show-sql=true
     spring.jpa.properties.hibernate.format_sql=true
  
  ```
  
  - é a configuração do H2 e permitindo também que o manipule na web
  - após isso próxima etapa
  
  
  # MAPEAMENTO OBJETO RELACIONAL
  - Colocar as annotation (ex: @Entity)
  
     ![image](https://user-images.githubusercontent.com/71105466/157572599-685fdb1c-c4e6-4fe4-bd69-814bf38a20bc.png)
  
  
- Na classe Score usamos outra anotação, o @ EmbeddedId (para informar ser uma chave COMPOSTA)
    * ![image](https://user-images.githubusercontent.com/71105466/157573288-e52d4c2f-3f6e-4244-9ca7-753ba59cfaca.png)
  
- Na classe ScorePK, usamos a anotação @Embeddable e não a @Id, por se tratar de uma tabela de associação
- Usamos a annotation ManyToOne e JoinColumn(referenciando o nome da chave estrangeira dela)
  
    * ![image](https://user-images.githubusercontent.com/71105466/157573474-69fe3c86-41bc-4c1e-ba22-69e5ea889ef3.png)
  
  OBS: implementar em ScorePK o Serializable (interface para que esse obj possa ser convertido para bites, para que possa trafegar na redes, convertido em arquivos e etc...)
  
     * ![image](https://user-images.githubusercontent.com/71105466/157573977-b9a6e68b-253b-4c28-8466-19a76dd237ab.png)

  
 - ScorePK configurado para fazer referencia ao filme e ao usuário
  
  
  # POPULANDO BANCO DE DADOS
  
  ```
  INSERT INTO tb_user(email) VALUES ('maria@gmail.com');
INSERT INTO tb_user(email) VALUES ('joao@gmail.com');
INSERT INTO tb_user(email) VALUES ('ana@gmail.com');
INSERT INTO tb_user(email) VALUES ('lucia@gmail.com');
INSERT INTO tb_user(email) VALUES ('joaquim@gmail.com');

INSERT INTO tb_movie(score, count, title, image) VALUES (4.5, 2, 'The Witcher', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (3.3, 3, 'Venom: Tempo de Carnificina', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/vIgyYkXkg6NC2whRbYjBD7eb3Er.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Shang-Chi e a Lenda dos Dez Anéis', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/cinER0ESG0eJ49kXlExM0MEWGxW.jpg');
INSERT INTO tb_movie(score, count, title, image) VALUES (0, 0, 'Matrix Resurrections', 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg');

INSERT INTO tb_score(movie_id, user_id, value) VALUES (1, 1, 5.0);
INSERT INTO tb_score(movie_id, user_id, value) VALUES (1, 2, 4.0);
INSERT INTO tb_score(movie_id, user_id, value) VALUES (2, 1, 3.0);
INSERT INTO tb_score(movie_id, user_id, value) VALUES (2, 2, 3.0);
INSERT INTO tb_score(movie_id, user_id, value) VALUES (2, 3, 4.0);
  
  ```


- Acrescentar esse script criando um novo arquivo
  * src/resources/import.sql
  
  
# Endereço do banco H2
  - localhost:8080/h2-console
  - Colocar o mesmo endereço que está na configuração do arquivo -> application-teste.properties, na linha 2
   ![image](https://user-images.githubusercontent.com/71105466/158291039-812d3243-04aa-4dd4-a1c8-29849c1dee30.png)
  
  
# DIVISÃO DAS CAMADAS
  
## REPOSITORIES MOVIE
  com.devsuperior.dsmovie.repositories.MovieRepository
  
  ![image](https://user-images.githubusercontent.com/71105466/157791892-46ef8066-8191-4d52-8c52-beaddb78a1ef.png)

  - é uma interface que herda a JpaRepository e dentro das < > vai o tipo da entidade e o tipo do id do movie que seria o long
  
## DTO MOVIE
  
  - No DTO ele é bem parecido com a classe referente a ele, por exemplo a Movie e a MovieDTO, a diferença é que a MovieDTO não terá o Jpa (@Entity e etc...)
  - com.devsuperior.dsmovie.dto.MovieDTO
  
 ![image](https://user-images.githubusercontent.com/71105466/157792703-f01b5d15-bd2b-48cf-91a9-ae0d7da98a12.png)
  
  - Para facilitar a copia dos objetos da entidade para o Movie, criar um construtor que receba a entidade, que no caso irá receber no param o Movie movie
  
  ![image](https://user-images.githubusercontent.com/71105466/157793086-df336dfc-c9e8-45db-83b9-b35678c8d6ea.png)
  
  
## SERVICES MOVIE
  
  CAMINHO 
  
  - package com.devsuperior.dsmovie.services;
  
  - Após isso colocar uma annotation na classe para dizer que a mesma é um serviço
  
   ![image](https://user-images.githubusercontent.com/71105466/158291268-435622d3-a0c6-49e6-b2dc-455ff6c3a2c7.png)

  
  ## PADRÃO DE CAMADAS
  
  ![image](https://user-images.githubusercontent.com/71105466/158291405-51691b1c-57ec-4598-86bf-05011d526efb.png)
  
  - A comunicação de dados entre a SERVICE e a CONTROLLER é feita por DTO ex: <MovieDTO>
  - Entre a SERVICE e a ENTITIE é pela classe normal ex: <Movie>
  
  - Ou seja, quando o serviço for devolver o retorno das entities para o controlador tem que ser em DTO
  - Por isso nessa situação o retorno da lista de filmes é feito em <MovieDTO>
  
  ![image](https://user-images.githubusercontent.com/71105466/158291714-2f895eb2-3e01-4940-8a9b-9c2204c2bc73.png)
  
  
  ### PAGINAÇÃO
  
  - Pensando no frontend, teremos uma lista de filmes com paginação, por isso usamos um recurso no backend chamado Pageable, com isso fazendo com que nosso método não retorne mas uma List< >, mas sim uma Page < >, conforme imagem abaixo e seus imports;
  
   ![image](https://user-images.githubusercontent.com/71105466/158292872-e7fd4300-a083-4c27-b74f-aae8c9616a91.png)
  
  - Inclusive o passa como parâmetro no método criado
  
  ```
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

}

  
  ```
  
  
 # CONTROLADOR
  - caminho: package com.devsuperior.dsmovie.movieController;
  
  - Configurar como sendo um controlador REST (@RestController)
  - @RequestMapping(value = "/movies") // URL
  
  - no controlador se trabalha com DTO
  - OBS: se usa o Pageable no método para também configurar de que seja uma resposta páginada
  - MovieController depende do MovieService igual a imagem da ordem das camadas
  - Por isso instanciamos e usamos o autowired para chamar a service desejada
  
   ![image](https://user-images.githubusercontent.com/71105466/158294506-1bfceda3-c885-4426-b95d-003b458e8c01.png)
  
  - Finaliza com anotação GetMapping para dizer que o método está respondendo ao Http GET
  
  ```
  package com.devsuperior.dsmovie.movieController;

import com.devsuperior.dsmovie.dto.MovieDTO;
import com.devsuperior.dsmovie.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/movies") //rota que irá iniciar esse controlador
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping //quando não tem a rota, ele responde pela raíz ou pelo indicado ao RequestMapping
    public Page<MovieDTO> findAll(Pageable pageable) { //configurar de que seja uma resposta páginada
        //no controlador se trabalha com DTO
        //MovieController depende do MovieService

        return movieService.findAll(pageable);

    }

}
  
  ```
  
  
# URL NO POSTMAN
  
  ![image](https://user-images.githubusercontent.com/71105466/158295707-a2c38771-0aaa-46d4-9182-12d2ceab9c04.png)
  
  - por padrão os itens que mostram por página são iguais a 20
  - caso deseje mudar é só passar na url -> localhost:8080/movies?size=30
  - para mudar a página -> localhost:8080/movies?size=12&page=2
  
  
### buscando por um único ID
  
  ```
   package com.devsuperior.dsmovie.movieController;

import com.devsuperior.dsmovie.dto.MovieDTO;
import com.devsuperior.dsmovie.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/movies") //rota que irá iniciar esse controlador
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping //quando não tem a rota, ele responde pela raíz ou pelo indicado ao RequestMapping
    public Page<MovieDTO> findAll(Pageable pageable) { //configurar de que seja uma resposta páginada
        //no controlador se trabalha com DTO
        //MovieController depende do MovieService

        return movieService.findAll(pageable);
    }

    @GetMapping(value = "/{id}") //binding
    public MovieDTO findById(@PathVariable Long id) { //para informar o binding que está ocorrendo ao parametro do Get
        return movieService.findById(id);

    }

}

  ```
  
  ![image](https://user-images.githubusercontent.com/71105466/158297144-3bc16ac0-495c-4f0c-af6e-b69f48cd5902.png)
  
  
# DTO SCORE

  - caminho: package com.devsuperior.dsmovie.dto;
  
  ![image](https://user-images.githubusercontent.com/71105466/158508100-17c9fc0c-bb6e-45a3-bf35-99869b422fab.png)

  
  - classe que irá passar o email, id do filme e avaliação
  - se um mesmo usuário entra e faz outra avaliação, eu não crio um novo id para ele no banco e acrescento a nova nota, eu apenas atualizo a informação que já contém dele no banco
  - Para isso iremos usar o método PUT (pois ele atualiza e também salva de forma idenpotente(salvou mais de uma vez tem o efeito de salvar uma vez só) )
  - Neste caso PUT ou POST o objeto que eles recebem é passado no corpo da requisição, como mostra a imagem abaixo: 
  
  ![image](https://user-images.githubusercontent.com/71105466/158509256-c767b1c0-b077-4ce7-a947-02ccaa4bf60b.png)

  # SERVICE SCORE
  
  - Na serviceScore teremos que acrescentar código na classe MOVIE, pois, ainda não temos como acessar os Scores de um determinado filme
  - Na classe MOVIE deixamos assim: 
  
  ![image](https://user-images.githubusercontent.com/71105466/158513384-9bf8a030-d443-4bf5-8a15-d600702258e3.png)

  ![image](https://user-images.githubusercontent.com/71105466/158513403-6b8b8ed3-e958-4ed2-84ef-228fc44f6a08.png)

  - OBS: criamos um método get para isso
  - isso é necessário para mapear os scores de um filme
  - SET (não será a lista), pois no muitos para muitos precisamos garantir que não terá dados repetidos no meio, e por isso esse será o tipo da var
  - Ao instanciar o new é do tipo HashSet<>(), pois o set é uma interface e não podemos instaciar ele, para isso precisamos de uma classe que o implementa
  
  
  
  
  # REPOSITORY USER 
  
  ![image](https://user-images.githubusercontent.com/71105466/158511741-0402cd36-b71c-4424-96fd-7a54d7689879.png)

  # REPOSITORY SCORE
  
  ![image](https://user-images.githubusercontent.com/71105466/158511716-1d85773e-d01d-4817-8212-c3671bbdb7e8.png)


  
  

