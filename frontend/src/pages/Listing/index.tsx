import axios from "axios";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { BASE_URL } from "utils/requests";

function Listing() {

    axios.get(`${BASE_URL}/movies?size=12&page=0`)
            .then(response => {
                console.log(response.data)
            });
            
    return (
        <>
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