import axios from "axios";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { MoviePage } from "types/movie";
import { BASE_URL } from "utils/requests";

function Listing() {

    //useState
    const [pageNumber, setPageNumber] = useState(0); //boa prática inicar ele com valor, o valor inicial pageNumber será o zero por conta da página zero
    
    const[page, setPage] = useState<MoviePage>({
        content: [],
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 12,
        number: 0,
        first: true,
        numberOfElements: 0,
        empty: true
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/movies?size=12&page=${pageNumber}&sort=id`) //deixando a busca das páginas de forma dinâmica, e ordenadas por id, ou se quiser por title
            .then(response => {
                const data = response.data as MoviePage //para reconhecer o response.data como o tipo MoviePage
                setPage(data); //tem que setar o tipo useStates para MoviePage para não dar erro, usando GENERICS
                console.log('GET response.data', data)
                // setPageNumber(data.number) //irá imprimir a página, e isso vem da API
                //OBS: se eu trocar na URL o page para 1, ele irá trocar a página também que irá exibir na tela
            });
    }, [pageNumber]) //recebe 2 argumentos, uma função para executar e o segundos é uma lista de objetos que irá observar
    //estou dizendo que a minha função depende do pageNumber, ou seja, quando mudar a página ele carrega a função novamente
    //a página ao carregar irá se iniciar com zero

    return (
        <>
            <Pagination />
            
            <div className="container">
                <div className="row">
                    {page.content.map(movie => (
                        //obs: o content é o retorno do backend, e estou mapeando oq tem dentro dessa página que vem no content, o content retorna uma lista de filmes
                        <div key={movie.id} className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                            <MovieCard movie={movie} />
                        {/* Chama o MovieScore pois o MovieCard pois dentro dele tem o MovieScore que tem o MovieStar já está dentro dele*/}
                        </div>
                    )
                    )}

                </div> {/* row = classe bootstrap*/}
            </div>
        </> //nome é fragment, não muda nada na prática

    );
}

export default Listing;