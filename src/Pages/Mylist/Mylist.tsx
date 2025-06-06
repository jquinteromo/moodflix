import {   Play, Plus } from "lucide-react";


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
  movies: MovieType[];
}
export default function Mylist({ movies }: HijoProps) {
  return (
    <div>
      <Navbar></Navbar>
      <div className="w-full flex mt-44 justify-center md:ml-3">
        <div
          className=" grid md:grid-cols-5 grid-cols-2 gap-5 px-6   select-none"
        >
    
          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex-shrink-0 md:w-56 w-[150px] flex flex-col gap-4 relative"
            >
              <h1 className="text-[#D1D5DB] md:text-2xl text-xl font-bold mb-3">
                My List
              </h1>
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
                <h2 className="md:text-base text-sm text-[#D1D5DB] ">2022</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
