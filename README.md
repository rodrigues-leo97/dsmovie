# Lista

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
 
