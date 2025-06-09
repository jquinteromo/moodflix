import { ChevronRight, ChevronLeft, Play, Plus } from "lucide-react";
import { useRef } from "react";

type MovieType = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  vote_count: number;
};

interface HijoProps {
  movies:  MovieType[];
  emolgiSelect: string 
  src:string
  title:string
  moviefavorite: (Movie:MovieType) =>void
}

export default function Carrusel({ movies, title,moviefavorite }: HijoProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

 

  return (
    <div className="flex flex-col gap-16 mb-10 mt-20 ">
      <div
        className={`relative  z-30 w-full transition-all duration-700 `}
      >
        <div className={`absolute inset-0 bg-gradient-to-b from-[#121212]/80  to-[#121212]/80  backdrop-blur-md pointer-events-none z-0`} />


          <h1 className={`text-white text-2xl font-bold px-5 py-2 rounded-xl bg-gradient-to-r  bg-white/5  backdrop-blur-sm border border-white/10 shadow-md w-fit ml-6 mb-4`}>
            {title}
          </h1>

        <div
          ref={scrollRef}
          className=" w-full flex flex-row md:gap-0 gap-5 px-6 overflow-x-auto scroll-smooth whitespace-nowrap select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            onClick={scrollLeft}
            className={`absolute top-1/2  -translate-y-1/2 z-10 w-12 h-12 bg-black/90  backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/20 hover:bg-white/20 transition-colors`}
          >
            <ChevronLeft className={`w-6 h-6 text-white`} />
          </button>
          <button
            onClick={scrollRight}
            className={`absolute top-1/2 right-4 -translate-y-1/2 z-10 w-12 h-12 bg-black/90  backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/20 hover:bg-white/20 transition-colors`}
          >
            <ChevronRight className={`w-6 h-6 text-white`} />
          </button>

          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex-shrink-0 md:w-56 w-[150px] flex flex-col gap-4 relative "
            >
              <div className="md:h-72 h-52 md:w-48 w-36  relative group">
                <img
                  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                  className="w-full h-full rounded-lg border border-white/10  cursor-pointer hover:brightness-50 transition-transform duration-400 group-hover:brightness-50 group-hover:-translate-y-1"
                ></img>
                <button
                  className={` hover:opacity-55 group-hover:opacity-100 opacity-0  absolute top-1/2 right-16 hover:-translate-y-7 transition-transform duration-300 -translate-y-1/2  w-12 h-12 bg-black/90  backdrop-blur-md rounded-full flex items-center justify-center border bg-gradient-to-r from-[#f4cd56] to-[#b8861d] border-white/20 `}
                >
                  <Play className={`w-6 h-6 text-white`} />
                </button>

                <button
                onClickCapture={() => moviefavorite(movie)}
                  className={`absolute  top-2 right-2 group-hover:opacity-100 opacity-0 bg-black/70  hover:bg-black/90 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-white hover:bg-black/90"
              `}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className=" md:w-52 w-40 flex flex-col">
                <h1 className="text-[#D1D5DB] md:text-base text-xs font-bold mb-1 break-words whitespace-normal">
                  {movie.title}
                </h1>
                <h2 className="md:text-base text-sm text-[#D1D5DB] ">{movie.release_date.slice(0,4)}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
