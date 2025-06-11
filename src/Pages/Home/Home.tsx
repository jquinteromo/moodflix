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
  genre_ids: number[];
  vote_count: number;
};



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
}

export default function Home({ weekmovies, srcBanner ,movies,PopularMovies,NowPlayingMovies,TopRatedMovies, onCategorySelect
  ,emolgiSelect,moviefavorite,plusmovie}: HijoProps) {
  return (
    <div className="min-h-screen w-full bg-[#121212]" id="Home">
      <Navbar></Navbar>
      <Banner weekmovies={weekmovies} src={srcBanner} />
      <CardMood  onCategorySelect={onCategorySelect}  />
      <CatalogueMovie  src={srcBanner} emolgiSelect={emolgiSelect} movies={movies} moviefavorite={moviefavorite} plusmovie={plusmovie}/>
        <Carrusel src={srcBanner} emolgiSelect={emolgiSelect} movies={NowPlayingMovies} moviefavorite={moviefavorite} plusmovie={plusmovie} title="🆕 Estrenos" ></Carrusel>
        <Carrusel src={srcBanner} emolgiSelect={emolgiSelect} movies={PopularMovies} moviefavorite={moviefavorite} plusmovie={plusmovie} title="🔥 Populares" ></Carrusel>
        <Carrusel src={srcBanner} emolgiSelect={emolgiSelect} movies={TopRatedMovies } moviefavorite={moviefavorite} plusmovie={plusmovie} title="⭐ Mejor valorado" ></Carrusel>
      <Footer></Footer>
    </div>
  );
}
