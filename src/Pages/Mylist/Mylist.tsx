import { Play} from "lucide-react";

import Navbar from "../../Components/Navbar";
type MovieType = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

interface HijoProps {
  movieFavorite: MovieType[];
}
export default function Mylist({ movieFavorite }: HijoProps) {
  return (
    <div className=" flex flex-col ml-4">
      <Navbar></Navbar>
        <h1 className={`text-white text-2xl font-bold px-2 py-2 rounded-xl bg-gradient-to-r  bg-white/5  backdrop-blur-sm border border-white/10 shadow-md w-fit  mb-4 mt-36`}>
        🍿 Mi Lista
          </h1>

      <div className="w-full flex  items-center">
        
       
        <div className=" grid md:grid-cols-6 grid-cols-2  select-none">
          {movieFavorite.map((movie, index) => (
            <div
              key={index}
              className="flex-shrink-0 md:w-56 w-[150px] flex flex-col gap-4 relative"
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

                
              </div>

              <div className=" md:w-52 w-40 flex flex-col">
                <h1 className="text-[#D1D5DB] md:text-base text-xs font-bold mb-1 break-words whitespace-normal">
                  {movie.title}
                </h1>
                <h2 className="md:text-base text-sm text-[#D1D5DB] ">2022</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
