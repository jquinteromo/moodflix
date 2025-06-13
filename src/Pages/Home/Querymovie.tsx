import type { MovieType } from "../../Types/Types";
import { useNavigate } from "react-router-dom";

interface HijoProps {
  querysrhmvie: MovieType[];
  plusmovie? :(movie:MovieType)=> void
}



export default function Querymovie({ querysrhmvie,plusmovie}: HijoProps) {
  const navigate = useNavigate();
   const goToPlaymovie = () => {
    navigate("/Playmovie");
  };
  return (
    <div>
{ querysrhmvie.length > 0 &&(
 <div className={`w-56 flex flex-col p-2 gap-4 bg-white/10 absolute `}>

 
        {querysrhmvie?.map((movie, index) => (
          <div
          onClickCapture={goToPlaymovie}
          onClick={()=>plusmovie?.(movie)}
          key={index} 
          className="h-20  w-full bg-white/10  flex flex-row gap-4 rounded-lg group hover:bg-black/30 cursor-pointer">
            <img
              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} 
            className="h-full w-24  rounded-l-lg group-hover:"></img>
            <div className="h-full w-full b  flex  justify-center flex-col ">
              <h1 className="text-white font-medium z-30">{movie.title.slice(0,15)}...</h1>
              <h2 className="text-white opacity-70 text-sm">{movie.release_date.slice(0,4)}</h2>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
