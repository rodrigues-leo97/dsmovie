import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Movie } from 'types/movie';
import { BASE_URL } from 'utils/requests';
import { validateEmail } from 'utils/validate';
import './styles.css'

type Props = {
    movieId: string;
}

function FormCard( { movieId } : Props)  {
    //movie do tipo Props

    const navigate = useNavigate();

    const [movie, setMovie] = useState<Movie>(); //parametrizando ele com o tipo Movie

    useEffect(() => {
        //executar requisição AXIO
        axios.get(`${BASE_URL}/movies/${movieId}`)
        .then(response => {
            setMovie(response.data);
        });
    }, [movieId]) //para quando trocar o movieId ele atualizar e chamar a função novamente, senão fica chamando várias vezes a request

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); //primeira coisa impedir que a página recarregue

        //as any serve pq no JS isso funciona, mas aqui por ser tipado tenho que informar o tipo, no caso um tipo qualquer
        const email = (event.target as any).email.value; 
        const score = (event.target as any).score.value; 

        console.log('verificando captura de dados do usuário', email, score);

        if(!validateEmail(email)) {
            //se não validar o email ele barra e não faz mais nada
            return;
        }

        //enviando a requisição POST, com uma configuração do AXIO
        const config: AxiosRequestConfig = {
            baseURL: BASE_URL, //para pegar a variável de ambiente localHost ou do heroku
            method: 'PUT', //método PUT
            url: '/scores', //caminho da URL, no caso /scores
            data: {
                email: email, //é a variável const email linha 30
                movieId: movieId, //veio como props no componente
                score: score //é a variável const email linha 31
            }
        }

        //requisição de PUT feita do jeito que está configurada acima
        axios(config)
            .then(response => {
                console.log('Response PUT', response.data)
                navigate("/") //usei ao invés do LinkTo o Navigate para que após executar a request a página de um redirect para a raíz da aplicação
            })
    }
    
    return (
    <div className="dsmovie-form-container">
        <img className="dsmovie-movie-card-image" src={ movie?.image } alt={ movie?.title } />
        <div className="dsmovie-card-bottom-container">
            <h3>{ movie?.title }</h3>
            <form className="dsmovie-form" onSubmit={handleSubmit}>
                <div className="form-group dsmovie-form-group">
                    <label htmlFor="email">Informe seu email</label>
                    <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group dsmovie-form-group">
                    <label htmlFor="score">Informe sua avaliação</label>
                    <select className="form-control" id="score">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div className="dsmovie-form-btn-container">
                    <button type="submit" className="btn btn-primary dsmovie-btn">Salvar</button>
                </div>
            </form >
            <Link to="/">
                <button className="btn btn-primary dsmovie-btn mt-3">Cancelar</button>
            </Link>
        </div >
</div >
  )
}

export default FormCard;

