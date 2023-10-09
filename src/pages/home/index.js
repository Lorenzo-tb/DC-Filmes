import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../../img/logo.png';

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/original";

    const [popularMovies, setPopularMovies] = useState([]);
    const [searchMovies, setSearchMovies] = useState([]);
    const [carouselItem, setCarouselItem] = useState([]);



    const KEY = process.env.REACT_APP_KEY;



    function buscarFilme() {

        let input = document.getElementById("input")
        let pesquisaTitle = input.value;
        let urlBusca = `https://api.themoviedb.org/3/search/movie?query=${pesquisaTitle}&api_key=${KEY}&language=pt-BR`;
        fetch(urlBusca)
            .then((response) => response.json())
            .then((data) => {
                setSearchMovies(data.results);
            });

    }
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setPopularMovies(data.results);
            });

        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=pt-BR`)
            .then((resp) => resp.json())
            .then((resp) => {
                setCarouselItem(resp.results);
            })

    }, [KEY]);

    return (
        <>
            <nav className="navbar bg-dark fixed-top navbar-expand-lg">
                <div className="container-fluid">
                    <Link to={`/`}>
                        <img src={Logo} alt="Logo" width="45" height="45" class="d-inline-block align-text-top" />
                    </Link>
                    <h1 className="navbar-brand text-white">Filmes Incríveis</h1>
                    <a href="#filmes-populares" className="sem-decoracao text-white">Filmes Populares</a>
                    <a href="#filmes-ranqueados" className="sem-decoracao text-white">Melhores Filmes</a>
                    <div className="d-flex">
                        <input className="form-control me-2" id="input" type="search" placeholder="Tal Filme..." aria-label="Search" />
                        <a href="#pesquisados">
                            <button className="btn btn-light"  onClick={buscarFilme}>Procurar</button>
                        </a>
                        
                    </div>

                </div>
            </nav>
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    {carouselItem.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                style={{ height: "98vh" }}
                            >
                                <img src={`${imagePath}${item.backdrop_path}`} alt={item.title} className="d-block w-100" />
                                <div className="overlay">
                                    <div className="row">
                                        <div className="col-1"></div>
                                        <div className="col-11">
                                            <h1>{item.title}</h1>
                                            <div className="row">
                                                <div className="col-6">
                                                    <p>{item.overview}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div id="pesquisados"></div>
            <div className="container">
                {(searchMovies.length > 0) && (
                    <>
                        <div className="col-sm-1"></div>
                        <h1 className="mt-3 sublinhado" id="filmes-populares">Filmes Pesquisados</h1>
                        <div className="row row-cols-3 ms-5">
                            {searchMovies.map((movie) => {
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
                        </div>

                    </>
                )}
                <div className="col-sm-1"></div>
                <h1 className="mt-3 sublinhado" id="filmes-populares">Filmes mais Populares</h1>
                <div className="row row-cols-3 ms-5">
                    {popularMovies.map((movie) => {
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
                <h1 className="mt-3 sublinhado" id="filmes-ranqueados">Melhores Filmes</h1>
                <div className="row row-cols-3 ms-5">
                    {carouselItem.map((movie) => {
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
        </>
    );
}

export default Home;
