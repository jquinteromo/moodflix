import Navbar from "../../Components/Navbar";
import { useEffect } from "react";
import { Play, Star, Calendar, Bookmark, Heart } from "lucide-react";

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
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  budget: number;
  revenue: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  original_language: string;
};

type MovieType = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

type HijoProps = {
  randomMovie: MovieType | null;
  movieDetails: MovieDetails | null;
  src: string;
};

export default function Infomovie({
  randomMovie,
  movieDetails,
  src,
}: HijoProps) {
  useEffect(() => {
    console.log(movieDetails);
  }, [movieDetails]);
  return (
    <div>
      <Navbar variant="Playmovie"></Navbar>
      <div className="">
        <div className=" relative w-full h-[50vh] md:h-[70vh]  aspect-video overflow-hidden">
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
              <h1 className="text-4xl md:text-6xl font-bold">
                {randomMovie?.title}
              </h1>

              <div className="flex flex-row gap-10">
                <p className=" mt-2 text-lg flex gap-1 items-center">
                  <Star className="h4 w-4 text-yellow-500" />
                  {randomMovie?.vote_average.toFixed(1)}
                </p>
                <p className=" mt-2 text-lg flex gap-1 items-center">
                  <Calendar className="w-4 h-4" /> {randomMovie?.release_date}
                </p>
                <p className=" mt-2 text-lg flex gap-1 items-center">
                  <Bookmark className="h-4 w-4 text-red-500" />
                  {movieDetails?.genres[0]?.name}
                </p>
              </div>

              <div className=" flex gap-5 ">
                <div className="relative">
                  <input
                    type="button"
                    value={"Play"}
                    className="md:text-base text-xs pl-6  font-bold  border bg-white text-black   py-3 px-5 md:px-10  rounded-md cursor-pointer hover:opacity-85"
                  ></input>
                  <Play className="absolute left-1  md:left-3 top-1/2 transform -translate-y-1/2 md:w-6 w-4 md:h-6 h-4 text-black cursor-pointer hover:opacity-85" />
                </div>
                <div className="relative">
                  <input
                    type="button"
                    value={"Agregar a mi lista"}
                    className="md:text-base text-xs pl-6 font-bold py-3 md:px-10 px-3 bg-white/10 border  rounded-md cursor-pointer hover:opacity-70"
                  ></input>
                  <Heart className="absolute left-1  md:left-3 md:top-1/2 top-1/2 transform md:-translate-y-1/2 -translate-y-[45%] md:w-6  w-4 md:h-6 h-4 text-white/50 cursor-pointer hover:opacity-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-14 flex flex-col mt-10 mb-20">
          <h1 className="text-2xl font-bold text-[#D1A23F] mb-5">
            Descripción
          </h1>
          <p className="text-lg text-[#D1D5DB] ">{randomMovie?.overview}</p>

          <h2 className="text-[#D1D5DB] mt-14">
            Duración: {movieDetails?.runtime} min
          </h2>
          <h2 className="text-[#D1D5DB] ">
            Idioma original: {movieDetails?.spoken_languages[0]?.name} -{" "}
            {movieDetails?.spoken_languages[1]?.name}
          </h2>
          <h2 className="text-[#D1D5DB] ">
            Total de votos: {movieDetails?.vote_average.toFixed(1)}
          </h2>
          <h2 className="text-[#D1D5DB] mt-6    ">
            Presupuesto invertido: {movieDetails?.budget}
          </h2>
          <h2 className="text-[#D1D5DB] ">
            Presupuesto Recaudado: {movieDetails?.revenue}
          </h2>
        </div>
      </div>
    </div>
  );
}
