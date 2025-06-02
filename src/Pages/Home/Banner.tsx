import {  useEffect, useState } from "react";
import LazyLoad from "vanilla-lazyload"; 

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

export default function Banner() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=3`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);

useEffect(() => {
    if (movies.length > 0) {
      new LazyLoad({
        elements_selector: ".lazyload",
        threshold: 300, 
      });
    }
  }, [movies]);

  const randomMovies = [...movies]  
  .sort(() => Math.random() - 0.5)
  .slice(0, 1); 


  return (
    <div>
      {randomMovies.map((movie) => (
        <div className="relative w-full h-[70vh] bg-white aspect-video overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w92${movie.backdrop_path}`}
             data-src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            data-srcset={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="Banner"
            className="lazyload w-full h-full object-cover transition-opacity duration-700"
          ></img>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to- 
            transparent"></div>
          <div className="absolute inset-0 flex  justify-center flex-col px-8">
            <div className="text-white max-w-xl">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <p className="mt-2 text-lg">{movie.overview.slice(0, 100)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
