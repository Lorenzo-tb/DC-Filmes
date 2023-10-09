import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from '../../img/logo.png';

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/original";

    const [movie, setMovie] = useState({});
    const [relaFilmes, setRelaFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trailer, setTrailer] = useState();

    const KEY = process.env.REACT_APP_KEY;

    useEffect(() => {
        // Primeira chamada de API para buscar os detalhes do filme
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setMovie(data);
                    setLoading(false);
                    window.scrollTo(0, 0);
                } else {
                    console.error("No movie data found in the API response.");
                }
            });
    }, [id, KEY]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=pt-BR`)
            .then((resp) => resp.json())
            .then((resp) => {
                const respTrailer = resp.results.find((video) => video.type === "Trailer");
                if (respTrailer) {
                    setTrailer(respTrailer.key);
                    console.log(respTrailer);
                }


            })
    }, [id, KEY])

    useEffect(() => {
        if (!loading) {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=${movie?.genres[0]?.id || ''}`)
                .then((resp) => resp.json())
                .then((resp) => {
                    setRelaFilmes(resp.results);
                });
        }
    }, [loading, movie.genres, KEY]);

    return (
        <div id="inicio">
            <nav className="navbar bg-dark fixed-top navbar-expand-lg">
                <div className="container-fluid">
                    <Link to={`/`}>
                        <img src={Logo} alt="Logo" width="45" height="45" class="d-inline-block align-text-top" />
                    </Link>
                    <h1 className="navbar-brand text-white">Filmes Incríveis</h1>
                    <a href="#topo" className="sem-decoracao text-white">Topo</a>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Tal Filme..." aria-label="Search" />
                        <button className="btn btn-light">Procurar</button>
                    </form>
                </div>
            </nav>

            <div className="banner mt-5" id="topo">
                <div class="jumbotron jumbotron-fluid" style={{ height: "58vh" }}>
                    <img src={`${imagePath}${movie.backdrop_path}`} alt={movie.title} className="d-block w-100 turvo" style={{ height: "58vh" }} />
                    <img src={`${imagePath}${movie.poster_path}`} alt={movie.title} className="position-absolute por-cima" />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-11">
                            <h2 className="sublinhado">{movie.title}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-3">
                            <p>Língua: {movie.original_language}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-4">
                            <p>Nota Média: {movie.vote_average} ({movie.vote_count})</p>
                        </div>
                        <div className="col-4">
                            <p>Lançamento: {movie.release_date}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-11">
                            <h5>{movie.overview}</h5>
                        </div>
                    </div>
                    <div className="row">
                <div className="col-1"></div>
                <div className="col-3">
                    <Link to={`/`}>
                        <button type="button" class="btn btn-light mt-1" style={{ width: "100%" }}>voltar</button>
                    </Link>

                </div>
            </div>
                </div>
                <div className="col-6">
                    <div className="row" style={{ height: "100%" }}>
                        <div className="col-2"></div>
                        <div className="col-8">
                            {trailer && (
                                <div className="row">
                                    <div className="col-2"></div>
                                    <div className="col-10" >
                                        <iframe src={`http://www.youtube.com/embed/${trailer}`} style={{ width: "100%", height: "35vh" }} allow="autoplay" allowFullScreen="true" ></iframe>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>


            <div className="container mt-5">
                <div className="col-sm-1"></div>
                <h1 className="mt-3 sublinhado" id="filmes-populares">Filmes Relacionados</h1>
                <div className="row row-cols-3 ms-5">
                    {relaFilmes.map((movie) => {
                        return (
                            <>
                                <div className="card shadow col-3 border-0 rounded mb-5 ms-5 bg-transparent meu-card">
                                    <Link to={`/${movie.id}`}>
                                        <img src={`${imagePath}${movie.poster_path}`} alt={movie.title} className="card-img-top rounded" style={{ width: "100%", height: "70vh" }} />
                                        <div className="descricao">
                                            <div className="row">
                                                <h5>{movie.title}</h5>
                                                <p>Lançamento: {movie.release_date}</p>
                                                <p>Avaliação: {movie.vote_average}</p>
                                                <p>{movie.overview}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </>
                        );
                    })}
                    <div className="col-sm-1"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-2">
                    <Link to="/">
                        <button className="btn btn-light m-5 w-100">Voltar</button>
                    </Link>
                </div>

            </div>


        </div>
    );
};

export default Movie;
