import Navbar from "../../Components/Navbar";
import { Play, Star, Calendar, Bookmark, Heart } from "lucide-react";
import Footer from "../Home/Footer";
import { useEffect } from "react";

import type { MovieType } from "../../Types/Types";
interface HijoProps {
  weekmovies: MovieType | null;
  srcPlayMv: string;
  TrailerKey: string | null;
  moviefavorite: (Movie: MovieType) => void;
}

export default function Playmovie({
  weekmovies,
  srcPlayMv,
  TrailerKey,
  moviefavorite,
}: HijoProps) {
  const genreMap: { [key: number]: string } = {
    28: "Acción",
    12: "Aventura",
    16: "Animación",
    35: "Comedia",
    80: "Crimen",
    99: "Documental",
    18: "Drama",
    10751: "Familiar",
    14: "Fantasía",
    36: "Historia",
    27: "Terror",
    10402: "Música",
    9648: "Misterio",
    10749: "Romance",
    878: "Ciencia ficción",
    10770: "Película de TV",
    53: "Suspenso",
    10752: "Bélica",
    37: "Western",
  };

  const categoryName = genreMap[weekmovies?.genre_ids[0] ?? 0];

  useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}, []);

  return (
    <div>
      <Navbar  variant="Playmovie" querysrhmvie={[]}></Navbar>
      <div className="flex flex-col gap-10">
        <div className=" relative w-full h-[50vh] md:h-[70vh]  aspect-video overflow-hidden">
          <img
            // src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
            src={srcPlayMv}
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
                {weekmovies?.title}
              </h1>

              <div className="flex flex-row gap-10">
                <p className=" mt-2 text-lg flex gap-1 items-center">
                  <Star className="h4 w-4 text-yellow-500" />
                  {weekmovies?.vote_average.toFixed(1)}
                </p>
                <p className=" mt-2 text-lg flex gap-1 items-center">
                  <Calendar className="w-4 h-4" /> {weekmovies?.release_date}
                </p>
                <p className=" mt-2 text-lg flex gap-1 items-center">
                  <Bookmark className="h-4 w-4 text-red-500" />
                  {categoryName}
                </p>
              </div>

              <div className=" flex gap-5 ">
                <a href="#trailer">
                  <div className="relative">
                    <input
                      type="button"
                      value={"Play"}
                      className="md:text-base text-xs pl-6  font-bold  border bg-white text-black   py-3 px-5 md:px-10  rounded-md cursor-pointer hover:opacity-85"
                    ></input>
                    <Play className="absolute left-1  md:left-3 top-1/2 transform -translate-y-1/2 md:w-6 w-4 md:h-6 h-4 text-black cursor-pointer hover:opacity-85" />
                  </div>
                </a>
                <div className="relative">
                  <input
                    onClickCapture={() => moviefavorite(weekmovies!)}
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

        <div  className="w-full px-14 flex flex-col mt-10 mb-10">
          <h1 className="text-2xl font-bold text-[#D1A23F] mb-5">
            {" "}
            Descripción
          </h1>
          <p id="trailer" className="text-lg text-[#D1D5DB] ">{weekmovies?.overview}</p>

          {TrailerKey ? (
            <div  className="w-[50rem] h-[27rem] bg-black mt-24 rounded-lg relative">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${TrailerKey}`}
                title="Mi proyecto"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute  left-0  rounded-lg outline-none"
              ></iframe>
            </div>
          ) : (
            <h1 className="text-white mt-20 mb-20 text-4xl underline font-semibold text-center">
              No se pudo cargar el tráiler 😓
            </h1>
          )}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
