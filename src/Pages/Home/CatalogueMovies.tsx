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

export default function CatalogueMovie({ movies }: HijoProps) {
  return (
    <div className="flex flex-col gap-16 mb-10">
      <div className=" w-full flex flex-row gap-5 px-6 ">
        {movies.map((movie, index) => (
          <div key={index} className=" w-56 flex flex-col gap-4">
            <h1 className="text-[#D1D5DB] text-2xl font-bold mb-3">Mood 😂</h1>
            <div className="h-72 w-48  ">
              <img
                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                className="w-full h-full rounded-lg border border-white/10"
              ></img>
            </div>
           
            <div className="">
                 <h1 className="text-[#D1D5DB] text-base font-bold mb-1">{movie.title}</h1>
                <h2 className="text-[#D1D5DB] ">2022</h2>
            </div>
            
          </div>
        ))}
      </div>
          <div className=" w-full flex flex-row gap-5 px-6 ">
        {movies.map((movie, index) => (
          <div key={index} className=" w-56 flex flex-col gap-4">
            <h1 className="text-[#D1D5DB] text-2xl font-bold mb-3">Mood 😂</h1>
            <div className="h-72 w-48  ">
              <img
                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                className="w-full h-full rounded-lg border border-white/10"
              ></img>
            </div>
           
            <div className="">
                 <h1 className="text-[#D1D5DB] text-base font-bold mb-1">{movie.title}</h1>
                <h2 className="text-[#D1D5DB] ">2022</h2>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
