import FormCard from 'components/FormCard';
import { useParams } from 'react-router-dom';


function Form()  {
    //movie do tipo Props

    const params = useParams(); //através dele que consigo pegar valores passados na URL, no caso eu quero o movieId

    return (
        <FormCard movieId={`${params.movieId}`}/> //Se colocar sem a Props ele da erro, pois é necessário passar quando exporta o componente
  )
}

export default Form;

