import { useNavigate } from "react-router-dom";
import { Info, Play } from "lucide-react";
import type { MovieType } from "../../Types/Types";

interface HijoProps {
  weekmovies: MovieType | null;
  src: string;
  plusmovie: (movie: MovieType) => void;
}

export default function Banner({ weekmovies, src, plusmovie }: HijoProps) {
  const navigate = useNavigate();

  const goToPlaymovie = () => {
    navigate("/Playmovie");
  };

  const goToInfomovie = () => {
    navigate("/Infomovie");
  };

  if (!weekmovies) return null;
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
            <h1 className="text-4xl md:text-6xl font-bold">
              {weekmovies.title}
            </h1>
            <p className=" mt-2 text-lg">
              {weekmovies.overview.slice(0, 200)}...
            </p>
            <div className=" flex gap-5 ">
              <div className="relative">
                <input
                  onClick={() => plusmovie(weekmovies)}
                  onClickCapture={goToPlaymovie}
                  type="button"
                  value={"Mirar ahora"}
                  className="md:text-base text-xs pl-6  font-bold  border bg-gradient-to-r from-[#E8B454]   py-3 px-5 md:px-10 bg-[#D1942E] rounded-md cursor-pointer hover:opacity-85"
                ></input>
                <Play className="absolute left-1  md:left-3 top-1/2 transform -translate-y-1/2 md:w-6 w-4 md:h-6 h-4 text-white/50 cursor-pointer hover:opacity-85" />
              </div>
              <div className="relative">
                <input
                  onClick={goToInfomovie}
                  type="button"
                  value={"Mas información"}
                  className="md:text-base text-xs pl-6 font-bold py-3 md:px-10 px-3 bg-white/10 border  rounded-md cursor-pointer hover:opacity-70"
                ></input>
                <Info className="absolute left-1  md:left-3 md:top-1/2 top-1/2 transform md:-translate-y-1/2 -translate-y-[45%] md:w-6  w-4 md:h-6 h-4 text-white/50 cursor-pointer hover:opacity-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
