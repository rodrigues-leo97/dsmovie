import MovieScore from "components/MovieScore";
import { Link } from "react-router-dom";
import { Movie } from "types/movie";

type Props = {
    //criando um tipo interno sem exportar, e dizer que pode ter vários dados

    movie: Movie; //neste caso é só um objeto do tipo Movie
    //sendo então o tipo de dado que minha função irá receber

}

function MovieCard( { movie  }: Props ) { //passo um obj movie do tipo Props(tipo criado acima)

    return (
        <div>
            <img className="dsmovie-movie-card-image" src={ movie.image } alt={ movie.title } />
            <div className="dsmovie-card-bottom-container">
                <h3>{ movie.title }</h3>
                <MovieScore score={movie.score} count={movie.count}/>

                <Link to={`/form/${ movie.id }`} >
                    <div className="btn btn-primary dsmovie-btn">Avaliar</div>
                </Link>
            </div>
        </div>
    );
}

export default MovieCard;