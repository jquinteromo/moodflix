import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Mylist from "./Pages/Mylist/Mylist";
import Home from "./Pages/Home/Home";
import Playmovie from "./Pages/Playmovie/Playmovie";
import Infomovie from "./Pages/Infomovie/Infomovie";

type MovieType = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

type VideoResult = {
  type: string;
  site: string;
  key: string;
};

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  poster_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  original_language: string;
};

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [randomMovie, setRandomMovie] = useState<MovieType | null>(null);
  const [src, setSrc] = useState<string>("");
  const [movieDetails, setmovieDetails] = useState<MovieDetails | null>(null);

  const [TrailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=39
    `)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);

        const filteredMovies = data.results.filter(
          (m: MovieType) => m.backdrop_path && m.overview
        );
        const random =
          filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
        setRandomMovie(random);
      });
  }, []);

  useEffect(() => {
    if (!randomMovie) return;

    fetch(`${BASE_URL}/movie/${randomMovie?.id}?api_key=${API_KEY}&language=es-ES
    `)
      .then((res) => res.json())
      .then((data) => {
        setmovieDetails(data);
      });

    fetch(
      `${BASE_URL}/movie/${randomMovie.id}/videos?api_key=${API_KEY}&language=es-ES`
    )
      .then((res) => res.json())
      .then((videoData) => {
        const trailer = videoData.results.find(
          (vid: VideoResult) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        setTrailerKey(trailer?.key || null);
      });
  }, [randomMovie]);

  useEffect(() => {
    if (!randomMovie) return;

    const low = `https://image.tmdb.org/t/p/w300${randomMovie.backdrop_path}`;
    const highRes = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
    setSrc(low);
    const img = new Image();
    img.src = highRes;
    img.onload = () => setSrc(highRes);

    return () => {
      img.onload = null;
    };
  }, [randomMovie]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Home randomMovie={randomMovie} src={src} movies={movies} />}
      />
      <Route path="/Mylist" element={<Mylist movies={movies} />} />
      <Route
        path="/Playmovie"
        element={
          <Playmovie
            movieDetails={movieDetails}
            randomMovie={randomMovie}
            src={src}
            TrailerKey={TrailerKey}
          />
        }
      />
      <Route path="/Infomovie" element={<Infomovie randomMovie={randomMovie}  movieDetails={movieDetails} src={src}/>} />
    </Routes>
  );
}

export default App;
