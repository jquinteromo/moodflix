import { useEffect, useState } from "react";
import { Info,Play } from "lucide-react";

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
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=19
    `)
      .then((res) => res.json())
      .then((data) => {
        // setMovies(data.results);

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

  if (!randomMovie) return null;
  return (
    <div>
      <div className="mt-16 relative w-full h-[50vh] md:h-[70vh] bg-white aspect-video overflow-hidden">
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
        <div className="absolute inset-0 flex   justify-center flex-col px-8">
          <div className="flex flex-col gap-6 text-white max-w-xl ml-5">
            <h1 className="text-4xl md:text-6xl font-bold">{randomMovie.title}</h1>
            <p className=" mt-2 text-lg">
              {randomMovie.overview.slice(0, 200)}...
            </p>
            <div className=" flex gap-5 ">
              <div className="relative">
                <input
                  type="button"
                  value={"Mirar ahora"}
                  className="md:text-base text-xs pl-6  font-bold  border bg-gradient-to-r from-[#E8B454]   py-3 px-5 md:px-10 bg-[#D1942E] rounded-md"
                ></input>
                <Play className="absolute left-1  md:left-3 top-1/2 transform -translate-y-1/2 md:w-6 w-4 md:h-6 h-4 text-white/50" />
              </div>
              <div className="relative">
                <input
                  type="button"
                  value={"Mas información"}
                  className="md:text-base text-xs pl-6 font-bold py-3 md:px-10 px-3 bg-white/10 border  rounded-md"
                ></input>
                <Info className="absolute left-1  md:left-3 md:top-1/2 top-1/2 transform md:-translate-y-1/2 -translate-y-[45%] md:w-6  w-4 md:h-6 h-4 text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
