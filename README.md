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
 - Estão hospedados em lugares diferentes e por padrão no navegador um sistema que está em um lugar ele não pode acessar uma API que está em outro lugar
  
 - Tem que liberar isso no projeto do backend e para isso segue os passos abaixo:
 
  CRIAR um PACOTE seguido de um ARQUIVO
  - src/main/java/com.devsuperior.dsmovie/.config/SecurityConfig
  - subpacote de configuração com o arquivo SecurityConfig
  
  DEIXAR A CLASSE COM AS SEGUINTES CONFIG:
  
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
  
