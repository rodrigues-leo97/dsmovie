# Lista FRONTEND

- [ ] Criar projeto
- [ ] Instalar Bootstrap
- [ ] Instalar Rotas

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
  
  ### Configurando os relacionamentos
  
  - Para isso na clase ScorePK os relacionamentos ManyToOne são para configurar a relação entre Movie e Score, e entre User e Score
  - Mas para que isso aconteça corretamente, da mesma forma que o ScorePK tem um relacionamento de ManyToOne, as classes Movie e User precisam ter também
  - Neste caso elas são o oposto uma da outra
  - Se na ScorePK é ManyToOne, então lá será OneToMany
  
  ![image](https://user-images.githubusercontent.com/71105466/158514248-2b26f9a3-ecb4-48cd-a304-b58cf2d0050b.png)
  
  ![image](https://user-images.githubusercontent.com/71105466/158514506-cdffc07f-e40b-4114-b4d6-98d13dfe1123.png)
  
  ![image](https://user-images.githubusercontent.com/71105466/158514542-be05f705-87ce-4c55-a408-957c730d1f02.png)



  
  
  
  
  # REPOSITORY USER 
  
  ![image](https://user-images.githubusercontent.com/71105466/158511741-0402cd36-b71c-4424-96fd-7a54d7689879.png)

  # REPOSITORY SCORE
  
  ![image](https://user-images.githubusercontent.com/71105466/158511716-1d85773e-d01d-4817-8212-c3671bbdb7e8.png)
  
  
  # VALIDAÇÃO NO POSTGRES LOCAL
  
   1.0 [ ] criar 3 perfis de projeto: test ,dev, prod
   1.1 [ ] gerar script SQL no perfil dev
   1.2 [ ] Testar projeto no banco Postgres local
  
   
  ## PARA QUE SERVE CADA BANCO
    - perfil dev: funcionará como um perfil de homologação, servirá para testar o projeto no BD postgre na máquina local
    - perfil prod: será para rodar em hml, quando a aplicação subir para o heroku
    - test é um banco de dados somente para testes, recriado toda vez que o código é executado, e para isso serve o arquivo import.sql
  
 # application-dev.properties
  - criar um arquivo com esse nome em RESOURCES e colocar a seguinte configuração de código
  
  OBS: verificar usuário e senha se estão iguais aos configurados
  
  ```
   #spring.jpa.properties.javax.persistence.schema-generation.create-source=metadata
   #spring.jpa.properties.javax.persistence.schema-generation.scripts.action=create
   #spring.jpa.properties.javax.persistence.schema-generation.scripts.create-target=create.sql
   #spring.jpa.properties.hibernate.hbm2ddl.delimiter=;

   spring.datasource.url=jdbc:postgresql://localhost:5432/dsmovie
   spring.datasource.username=postgres
   spring.datasource.password=1234

   spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
   spring.jpa.hibernate.ddl-auto=none
  
  ```
  
  # application-prod.properties
  
   - criar um arquivo com esse nome em RESOURCES e colocar a seguinte configuração de código
   - configuração para ele pegar a URL do banco lá no heroku
  
  ```
   spring.datasource.url=${DATABASE_URL}
  
  ```
  
  - Após isso criar arquivo chamado SYSTEM.PROPERTIES
  
  # SYSTEM.PROPERTIES
  - criar arquivo na RAÍZ DO PROJETO, conforme imagem abaixo
  
  ![image](https://user-images.githubusercontent.com/71105466/158936582-ddc91cae-dbfd-4a64-b915-41de85621fb9.png)
  
  - colocar a seguinte configuração
  
  ```
  java.runtime.version=17
  
  ```
  
  # 1.2 GERANDO SCRIPT SQL NO PERFIL DEV 
  
  - descomentar as 4 primeiras linhas caso estejam comentadas
  
  ![image](https://user-images.githubusercontent.com/71105466/158936914-342eaad5-4d69-4511-b844-55111e3e9062.png)

  OBS: criar banco de dados com nome "dsmovie" no postgres para o perfil de dev
  
  - Ir no application.properties e trocar o perfil de test para dev, como mostra a imagem abaixo:
  
  ![image](https://user-images.githubusercontent.com/71105466/158937182-2d655d16-3201-47d4-bbca-d908add2a493.png)
  
  - Se rodou com as quatro linhas do banco de DEV descomentada, então, criou um arquivo na pasta backend chamado create.sql
  - Esse script terá tudo necessário para criar o banco de dados no postgres com as configurações desejadas
  - pegar os scripts e voltar no pgAdmin
  - ir no banco dsMovie, botão direito, queryTool
  - Jogar os comandos lá dentro e rodar
  - testar no postgres e postman

  - APÓS ISSO COMENTAR NOVAMENTE AS 4 LINHAS POIS O SCRIPT JA FOI CRIADO
  
  ![image](https://user-images.githubusercontent.com/71105466/158938464-7788e06b-b897-4157-ba13-fc33ec89fb90.png)

  # VARIÁVEL DE AMBIENTE
  
  - Ir no arquivo application.propertie
  - ao invés de ficar mundando na mão na primeira linha, criar uma variável de ambiente
  - por padrão se ela não estiver definida o valor dela será teste, ou seja, se estiver faltando algum valor automaticamente entrará como teste
  
 ![image](https://user-images.githubusercontent.com/71105466/158938655-e7b0e943-4a58-4cb5-ac0c-749fd83c8ef0.png)

  # iMPLANTAÇÃO NO HEROKU
  
  - Criar o aplicativo no heroku
  
  ![image](https://user-images.githubusercontent.com/71105466/158939264-3c8d19aa-8e17-4f15-a8e6-f3bfe81fd656.png)

  - Provisionar o banco Postgres
  - Ir na aba RESOURCES dentro do heroku
  
  ![image](https://user-images.githubusercontent.com/71105466/158939342-e59c5a05-705d-476d-9191-2ee2a4c84824.png)

  - Em Add-ons procurar por HEROKU POSTGRES
  
  ![image](https://user-images.githubusercontent.com/71105466/158939398-1a669deb-79b3-43bf-8754-9c30f94e0aff.png)
  
  - escolher o plano gratuito

  ![image](https://user-images.githubusercontent.com/71105466/158939424-f0bd0ac9-c5da-4d73-97aa-f116ec97b89e.png)
  
  - HEROKU ADD AO PROJETO
  
  ![image](https://user-images.githubusercontent.com/71105466/158939490-041eb454-a916-4e17-b4f7-fddc53b43968.png)

  
  - DEFINIR A VAR DE AMBIENTE APP_PROFILE=PROD
  - rodar no banco de produção
  - ela será baseada na variável de ambiente criada em application-prod.propertie {DATABASE_URL} que já tem no heroku
  - PARA ISSO BASTA IR NA ABA SETTINGS
  
  ![image](https://user-images.githubusercontent.com/71105466/158939752-ce2c1855-b2de-4125-9ce9-84ba95e521b9.png)

  - depois ir em Config Vars
  
  ![image](https://user-images.githubusercontent.com/71105466/158939779-ebe135a1-2221-42f1-8471-801a80372f62.png)

  - acrescentar uma nova variável de ambiente {APP_PROFILE}
  - colocar que ela aponta para prod
  
  ![image](https://user-images.githubusercontent.com/71105466/158940017-fd27c69c-6b69-41e8-8e29-cc1e241731fa.png)


  # CONECTANDO AO BANCO VIA PGADMIN
  
  - conectando ao banco remoto
  - primeiro pegar variavel de ambiente marcada na imagem abaixo
  
  ![image](https://user-images.githubusercontent.com/71105466/158940097-b8587463-c61c-430e-8bfb-0890211113d3.png)
  
  - Separar os dados da var de ambiente, conforme print abaixo
  
  ![image](https://user-images.githubusercontent.com/71105466/158940397-ddefcf23-10e2-4862-8e7f-c9ff26e28bdd.png)

  - depois do // vem o nome do usuário
  - depois dos : vem a senha do usuário
  - depois do @ vem o host (onde está hospedado o banco de dados
  - depois dos : vem a porta
  - depois da / vem  o nome da base de dados
  
  - Estrutura da URL de banco de dados la do postgres do heroku
  - usar isso no pgAdmin para conectar no postgres do heroku
  
  - ir no pgAdmin e criar um new SERVER 
  - colocar nas configurações as informações do código abaixo da imagem
  
  ![image](https://user-images.githubusercontent.com/71105466/158940912-708026f4-dc2e-4dec-aaea-21f6ae331905.png)
  
  - Depois ir em ADVANCED e repetir o nome da base de dados
  
  ![image](https://user-images.githubusercontent.com/71105466/158941025-acf4161b-d297-4e8c-bc42-f064c968e853.png)

  - Caso esteja conectado ficará assim: 
  
  ![image](https://user-images.githubusercontent.com/71105466/158941127-c2f69772-4359-4ccc-8ae1-0db66c282a12.png)

  
  ```
  postgres://

  uqraulrerxtrls //USUÁRIO
  :
  23cdfe523bccf7a709e33a52157ffb1603f19647c48585cbbb3307b098de6446 //SENHA
  @
  ec2-3-222-204-187.compute-1.amazonaws.com //HOST
  :
  5432
  /
  dbv47ubjp8hloe //NOME DA BASE
  
  ```

  - Ainda não tem nenhuma tabela no banco online, então devemos pegar aquele SCRIPT na pasta do backend chamado create.sql
  - ir na base do heroku no pgAdmin, ir em tables e anexar e rodar o código
  - Após isso banco de HEROKU já estará populado e com tabelas criadas
  
  ![image](https://user-images.githubusercontent.com/71105466/158941391-7e93f507-b843-4052-a6a5-fbc8d1cea890.png)

  # ENVIAR PROJETO PARA O HEROKU
  
  ```
  heroku -v
  heroku login
  heroku git:remote -a <nome-do-app> //para associar o meu rep local ao heroku
  git remote -v
  git subtree push --prefix backend heroku main
  
  ```
  - para colocar nome na aplicação só olhar no heroku e colocar igual
  
  ![image](https://user-images.githubusercontent.com/71105466/158942107-91e1831e-21e8-4bac-b51b-ce02dfac9a20.png)
  
  ![image](https://user-images.githubusercontent.com/71105466/158942125-60a79c66-0368-4602-b3f2-f38a4652d8d2.png)
  
  - PARA VER NO QUE MEU PROJETO ESTÁ ASSOCIADO, no caso heroku e github
  
  ![image](https://user-images.githubusercontent.com/71105466/158942218-06a88cf6-9eb6-4cbd-b085-f7e55350bfda.png)
  
  ![image](https://user-images.githubusercontent.com/71105466/158942375-0fd8f798-7f43-4efb-90a8-affd42dfb68a.png)

  - pois tem a pasta front e back, ai informei que era apenas a pasta back


   OBS - Se estiver usando a versão 3.2 no pom.xml talvez tenha que trocar para a versão 3.1 conforme imagem abaixo e subir para o git, após isso tentar fazer o deploy novamente se por acaso deu o erro de versão
  
  ![image](https://user-images.githubusercontent.com/71105466/159059562-57317e83-8c01-4151-8401-b3ee62613888.png)

  - Após isso ir no botão OPEN APP
  
  ![image](https://user-images.githubusercontent.com/71105466/159059893-01d14652-21b5-4f12-9aea-87fc2aeae7ec.png)

  - A página estará com erro, portanto, pegar o endereço da url
  
  ![image](https://user-images.githubusercontent.com/71105466/159059995-01235257-f09c-4c22-9b49-480f5f2ef2a6.png)
  
  - Ir no postman e usar a URL do site que pegou no heroku

  ![image](https://user-images.githubusercontent.com/71105466/159060207-f91baf2d-4bf4-4a97-b68f-aaf3443bdda7.png)
  
  
  # IMPLANTANDO NO NETLIFY
  
  ![image](https://user-images.githubusercontent.com/71105466/159387539-03f5271f-5d68-4e30-9ab0-b20ee04a1ab2.png)
  
  
  # INTEGRANDO FRONT E BACK
  
  - 1.0 [ ] instalar o AXIO
  
  - Biblioteca usada para facilitar o processo de requisições
  
  ```
  yarn add axios@0.24.0
  
  ```
  
  - Definir BASE_URL (var de ambiente), apontar o código para URL básica do nosso backend
  - src/utils/requests.ts
  - criar var BASE_URL, mas tem que colocar algumas configurações, pois as vezes estará apontando para o sue ambiente local e outras vezes para o heroku
  
  ![image](https://user-images.githubusercontent.com/71105466/159391886-1757b312-7e9c-48f9-bd06-17ca924b7fe7.png)

  - process.env.REACT_APP_BACKEND_URL => definir variavel de ambiente para receber o endereço do heroku mais tarde
  - process.env é uma propriedade que ja tem no projeto
  - REACT_APP (padrão, não pode mudar por causa do netlify)
  - BACKEND_URL (nome de escolha própria)
  - ?? operador nulo, igual ao feito no backend, se não tiver nada para indicar o apontamente então irá automaticamente apontar para o localhost
  
  ![image](https://user-images.githubusercontent.com/71105466/159392088-6e22dfeb-eac8-4c0a-9f3f-37691b01e2c0.png)
  
  
  - 1.1 [ ] Definir os tipos Movie e MoviePage
  
  - Foi tirado os tipos do próprio retorno da API, como ex na imagem abaixo
  
  ![image](https://user-images.githubusercontent.com/71105466/159603823-c5678f36-44a6-4caa-b70d-e9b094bba14c.png)
  
  ![image](https://user-images.githubusercontent.com/71105466/159603958-2ac51909-9210-4546-8c27-452c4211ea25.png)
  
  - O frontend tem que ter os tipos de dados que a API retorna
  
  - Ir no projeto do frontend e criar
   
   src/types/movie.ts //OBS - criar como arquivo padrão do TS e não em React
  
  ```
    export type Movie = {
      id: number;
      title: string;
      score: number;
      count: number;
      image: string;
  }

  export type MoviePage = {
      content: Movie[];
      last: boolean;
      totalPages: number;
      totalElements: number;
      size: number;
      number: number;
      first: boolean;
      numberOfElements: number;
      empty: boolean;
  }
  
  ```
  
  - 1.2 [ ] FAZER A REQUISIÇÃO
  - Conferir se o Axio foi instalado
  
  - Existe a primeira forma, mas não é uma boa prática, e trás resultados repetidos no console
  
  ![image](https://user-images.githubusercontent.com/71105466/159605823-83e5d204-4e92-4d8b-8e2b-4a30319040b6.png)

  - chamar o axios com a requisição desejada, neste caso o GET
  - o THEN serve para quando é algo assíncrono, ou seja, todo o resto continua executando enquanto ele tem ou não o seu retorno
  - Neste caso está aguardando o retorno da rota desejada ao fazer a requisição get, e caso tenha o retorno segue as instruções a seguir
  - Exibir no console o response.data
  - Vale lembrar de que já está sendo usada a variável de ambiente local para fazer a requisição, só alterando a rota final para a desejada
  - ou seja, quando o código subir para o web ele irá identificar a variável de ambiente e ver se ele irá rodar com localhost ou com a variável setada para rodar no lugar correto
  - neste caso ele irá fazer a mesma verificação que o backend para ver qual base irá usar para exibir os dados, PROD, DSV ou TEST, e o front se encarregará também de fazer a requisição para essa rota

  # Passo: React hooks: useState e useEffect
  
  - Hooks são funções cujo comportamento está vinculado ao estado e ao ciclo de vida do React a partir de componentes funcionais.

  https://pt-br.reactjs.org/docs/hooks-overview.html
  
  - Ex: useState
  
  ![image](https://user-images.githubusercontent.com/71105466/162344481-d7fd2a41-9aed-49e0-ab86-0e75dd2314bd.png)
  
  - O NUMBER é um dos atributos que a API retorna, e eu acesso ele para setar a página procurada

  ![image](https://user-images.githubusercontent.com/71105466/162344492-fd8bb876-4a4c-40cd-a78f-34b77ca9ac94.png)
  
  
  - Ex: useEffect
   * recebe 2 argumentos, uma função para executar e o segundos é uma lista de objetos que irá observar
   * Sempre que alterar algo no objeto ele irá executar essa função (primeiro argumento) novamente
   * Para isso eu coloco minha requisição AXIOS com o get dentro dela
   * a partir de agora eu tenho uma função que é chamada somente ao carregar o componente
   * por conta disso não temos mais o problema de executar duas vezes a função e ter dois resultados iguais no console para o retorno da API
   * isso se dá pois estou colocando dentro de um hook e que ele tá amarrando a execução dentro do ciclo de vida do componente
   * ficando dessa forma:
 
     ![image](https://user-images.githubusercontent.com/71105466/162345517-f39c305b-75e5-4bb7-8f9d-8f191f1bc84c.png)
  
  # FALANDO SOBRE PROPS
  
   - podem ser entendidas como argumentos
   - ex no componente /src/components/MovieCard/index.tsx
   - criando um tipo Props e passando que ele terá um objeto do tipo Movie
   - Excluindo os dados mocados que havia nele:
  
    
 ![image](https://user-images.githubusercontent.com/71105466/162346253-31ae2d81-40d0-4c9c-b949-fb89fec3b15a.png)

   - passa a dar erro na classe que chama o componente que foi removido os dados mocados, pois está esperando a Prop como argumento
  
    
  
 ![image](https://user-images.githubusercontent.com/71105466/162346391-209b6992-ff7c-4606-b3d6-1e049e777f98.png)
  
   - aproveitar essa mudança para pegar e exibir os filmes que vieram na consulta
   - no postman o retorno da consulta vem com um CONTENT, que trás uma lista de filmes
  
   ![image](https://user-images.githubusercontent.com/71105466/162346728-8fdc4cc9-17e6-4c4a-9446-d94a196917ca.png)

   - iremos usar esse CONTENT para trazer uma listagem dinamica no front, renderizando os cards desse filme com esse obj:
  
   
  ![image](https://user-images.githubusercontent.com/71105466/162350136-a1af2400-6801-4fdd-8261-c27618d6ed56.png)

   - já altera o page para receber de forma dinamica o pageNumber, que ao iniciar é com zero, ou seja, buscando a page zero
   - quando chegar a resposta eu pego o corpo da resposta, mas antes criar um outro estado para guardar no componente a página que foi CARREGADA
   
   ![image](https://user-images.githubusercontent.com/71105466/162350333-f964e0dd-44fd-4238-ad8c-f1d5095a15cb.png)

   - setando ele como useState também
   - para ficar mais rápido e fácil pegar os tipos de outra classe e setar as inforamações iniciais
   
    ```
        content: [], //lista vazia
        last: true, //por enquanto estou na última página, por isso true
        totalPages: 0, 
        totalElements: 0,
        size: 12, //página de 12 elementos
        number: 0, //estou na página zero por enquanto
        first: true, //é a primeira página?
        numberOfElements: 0, 
        empty: true 
  
    ```
  
   - definido então um obj padrão para iniciar a paginação
   - temos um estado que GUARDA a página que busquei na requisição
  
   - QUANDO VIER A RESPOSTA oq fazer: 
  
     ![image](https://user-images.githubusercontent.com/71105466/162350733-e670e242-1785-4a54-976f-58610435401b.png)

  - na linha 29, eu uso o setPage para que quando vier a resposta eu salvo a página que voltou na minha requisição
  - eu parametrizo na linha  13 com generics o useState para o tipo MoviePage, pois acusa erro se não fizer isso
  
   ![image](https://user-images.githubusercontent.com/71105466/162350889-bca47df4-95e1-47aa-81bc-10ff73f15fca.png)
  
  - para finalizar eu uso o pageNumber como segundo parametro no useEffect, e quando eu mudar de página automaticamente eu mudo o pageNumber e por comportamento padrão a requisição é chamada novamente
  
   ## DEIXANDO DE FORMA DINÂMICA
    
  
 ![image](https://user-images.githubusercontent.com/71105466/162351030-25564e9e-6ea0-4909-a521-92b7352823e9.png)
  
  - chamo o obj PAGE.CONTENT para acessar a lista de filmes
  
   ![image](https://user-images.githubusercontent.com/71105466/162351094-ef6a3a79-6580-47b5-9fc4-3544b4500cd1.png)

  - e chamo a função MAP, para mapear os itens da coleção, é como se fosse um FOR, porém, mais simplificado
  - o retorno de cada content eu coloco dentro de um container que são as DIVS dentro do retorno do meu map
  
  IMPORTANTE:
   - Numa renderização dinâmica de coleção, cada elemento renderizado DEVE possuir o atributo KEY, pois o react exige isso
  

  
 ![image](https://user-images.githubusercontent.com/71105466/162351762-311eb7b7-571b-4960-847b-ebe2dd53e9bc.png)

  
   - para que cada um seja identificado corretamente
  
  OBS: 
  
   ![image](https://user-images.githubusercontent.com/71105466/162351231-09b56cef-4f89-42bd-9f40-0094c1c2c85c.png)
  
   - deixando a busca das páginas de forma dinâmica, e ordenadas por id, ou se quiser por title


