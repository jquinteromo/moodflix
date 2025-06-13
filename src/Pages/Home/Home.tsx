import Navbar from "../../Components/Navbar";
import Banner from "./Banner";
import CardMood from "./CardMood";
import CatalogueMovie from "./MoodCarrusel";
import Footer from "./Footer";
import Carrusel from "./Carrusel";

import type { MovieType } from "../../Types/Types";

interface HijoProps {
  weekmovies: MovieType | null;
  srcBanner: string;
  movies: MovieType[];
  PopularMovies: MovieType[] 
  NowPlayingMovies :MovieType[]
  TopRatedMovies : MovieType[]
  onCategorySelect: (emolgi:string,categories:number[])=>void
  emolgiSelect:string 
  moviefavorite: (Movie:MovieType) =>void
  plusmovie :(movie:MovieType)=> void
    searchquery : (value:string) => void
    querysrhmvie: MovieType[]
}

export default function Home({ weekmovies, srcBanner ,movies,PopularMovies,NowPlayingMovies,TopRatedMovies, onCategorySelect
  ,emolgiSelect,moviefavorite,plusmovie,searchquery,querysrhmvie}: HijoProps) {
  return (
    <div className="min-h-screen w-full bg-[#121212]" id="Home">
      <Navbar searchquery={searchquery} querysrhmvie={querysrhmvie} plusmovie={plusmovie}></Navbar>
      <Banner weekmovies={weekmovies} src={srcBanner} plusmovie={plusmovie} />
      <CardMood  onCategorySelect={onCategorySelect}  />
      <CatalogueMovie  src={srcBanner} emolgiSelect={emolgiSelect} movies={movies} moviefavorite={moviefavorite} plusmovie={plusmovie}/>
        <Carrusel src={srcBanner} emolgiSelect={emolgiSelect} movies={NowPlayingMovies} moviefavorite={moviefavorite} plusmovie={plusmovie} title="🆕 Estrenos" ></Carrusel>
        <Carrusel src={srcBanner} emolgiSelect={emolgiSelect} movies={PopularMovies} moviefavorite={moviefavorite} plusmovie={plusmovie} title="🔥 Populares" ></Carrusel>
        <Carrusel src={srcBanner} emolgiSelect={emolgiSelect} movies={TopRatedMovies } moviefavorite={moviefavorite} plusmovie={plusmovie} title="⭐ Mejor valorado" ></Carrusel>
      <Footer></Footer>
    </div>
  );
}
