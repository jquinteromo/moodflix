import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { useEffect, useState } from "react";
import Mylist from "./Pages/Mylist/Mylist";

type MovieType = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [randomMovie, setRandomMovie] = useState<MovieType | null>(null);
  const [src, setSrc] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=25
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

    const low = `https://image.tmdb.org/t/p/w300${randomMovie.backdrop_path}`;
    const highRes = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
    setSrc(low);
    const img = new Image();
    img.src = highRes;
    img.onload = () => setSrc(highRes);
  }, [randomMovie]);
  return (
    <Routes>
      <Route
        path="/"
        element={<Home randomMovie={randomMovie} src={src} movies={movies} />}
      />
      <Route path="/Mylist" element={<Mylist movies={movies} />} />
    </Routes>
  );
}

export default App;
