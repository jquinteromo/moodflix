import Navbar from "../../Components/Navbar";
import Banner from "./Banner";
import CardMood from "./CardMood";
import CatalogueMovie from "./MoodCarrusel";
import Footer from "./Footer";
import Carrusel from "./Carrusel";



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
  weekmovies: MovieType | null;
  src: string;
  movies: MovieType[];
  PopularMovies: MovieType[] 
  NowPlayingMovies :MovieType[]
  TopRatedMovies : MovieType[]
  onCategorySelect: (emolgi:string,categories:number[])=>void
  emolgiSelect:string 
}

export default function Home({ weekmovies, src ,movies,PopularMovies,NowPlayingMovies,TopRatedMovies, onCategorySelect,emolgiSelect}: HijoProps) {
  return (
    <div className="min-h-screen w-full bg-[#121212]" id="Home">
      <Navbar></Navbar>
      <Banner weekmovies={weekmovies} src={src} />
      <CardMood  onCategorySelect={onCategorySelect} />
      <CatalogueMovie  src={src} emolgiSelect={emolgiSelect} movies={movies}  />
        <Carrusel src={src} emolgiSelect={emolgiSelect} movies={NowPlayingMovies}  title="🆕 Estrenos" ></Carrusel>
        <Carrusel src={src} emolgiSelect={emolgiSelect} movies={PopularMovies} title="🔥 Populares" ></Carrusel>
        <Carrusel src={src} emolgiSelect={emolgiSelect} movies={TopRatedMovies } title="⭐ Mejor valorado" ></Carrusel>
      <Footer></Footer>
    </div>
  );
}
