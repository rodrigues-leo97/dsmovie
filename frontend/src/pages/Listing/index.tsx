import axios from "axios";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { MoviePage } from "types/movie";
import { BASE_URL } from "utils/requests";

function Listing() {

    //useState
    const [pageNumber, setPageNumber] = useState(0); //boa prática inicar ele com valor, o valor inicial pageNumber será o zero por conta da página zero
    useEffect(() => {
        axios.get(`${BASE_URL}/movies?size=12&page=0`)
            .then(response => {
                const data = response.data as MoviePage //para reconhecer o response.data como o tipo MoviePage
                console.log('GET response.data', data)
                setPageNumber(data.number) //irá imprimir a página, e isso vem da API
                //OBS: se eu trocar na URL o page para 1, ele irá trocar a página também que irá exibir na tela
            });
    }, []) //recebe 2 argumentos, uma função para executar e o segundos é uma lista de objetos que irá observar
            
    return (
        <>

        <p>{ pageNumber }</p>
            <Pagination />
            
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                        {/* Chama o MovieScore pois o MovieCard pois dentro dele tem o MovieScore que tem o MovieStar já está dentro dele*/}
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3"> {/* mb -> margin-bottom*/} 
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                </div> {/* row = classe bootstrap*/}
            </div>
        </> //nome é fragment, não muda nada na prática

    );
}

export default Listing;