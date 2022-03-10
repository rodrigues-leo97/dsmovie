import MovieCard from "components/MovieCard";
import MovieScore from "components/MovieScore";
import Pagination from "components/Pagination";

function Listing() {
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

export default Listing; {/* Componente exportado */}