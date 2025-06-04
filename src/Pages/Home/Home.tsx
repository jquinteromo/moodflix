import { useEffect, useState } from "react";

import Navbar from "../../Components/Navbar";
import Banner from "./Banner";
import CardMood from "./CardMood";
import CatalogueMovie from "./CatalogueMovies";
import Footer from "./Footer";

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

export default function Home() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [randomMovie, setRandomMovie] = useState<MovieType | null>(null);
  const [src, setSrc] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=6
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
    <div className="min-h-screen w-full bg-[#121212]">
      <Navbar></Navbar>
      <Banner randomMovie={randomMovie} src={src} />
      <CardMood></CardMood>
      <CatalogueMovie movies={movies}></CatalogueMovie>
      <Footer></Footer>
    </div>
  );
}
