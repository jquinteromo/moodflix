import { useEffect, useState } from "react";

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
//   const [movies, setMovies] = useState<MovieType[]>([]);
  const [randomMovie, setRandomMovie] = useState<MovieType | null>(null);
  const [src, setSrc] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=5`)
      .then((res) => res.json())
      .then((data) => {
        // setMovies(data.results);

        const filteredMovies = data.results.filter((m:MovieType) => m.backdrop_path);
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

  if (!randomMovie) return null;
  return (
    <div>
      <div className="relative w-full h-[70vh] bg-white aspect-video overflow-hidden">
        <img
          // src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
          src={src}
          sizes="100vw"
          alt="Banner"
          className="w-full h-full object-cover transition-opacity duration-700"
        ></img>
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-transparent to- 
            transparent"
        ></div>
        <div className="absolute inset-0 flex  justify-center flex-col px-8">
          <div className="text-white max-w-xl">
            <h1 className="text-4xl font-bold">{randomMovie.title}</h1>
            <p className="mt-2 text-lg">{randomMovie.overview.slice(0, 200)}...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
