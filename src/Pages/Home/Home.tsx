import Navbar from "../../Components/Navbar";
import Banner from "./Banner";
import CardMood from "./CardMood";
import CatalogueMovie from "./MoodCarrusel";
import Footer from "./Footer";



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
  onCategorySelect: (emolgi:string,categories:number[])=>void
  emolgiSelect:string 
}

export default function Home({ weekmovies, src ,movies,onCategorySelect,emolgiSelect}: HijoProps) {
  return (
    <div className="min-h-screen w-full bg-[#121212]" id="Home">
      <Navbar></Navbar>
      <Banner weekmovies={weekmovies} src={src} />
      <CardMood  onCategorySelect={onCategorySelect} />
      <CatalogueMovie  src={src} emolgiSelect={emolgiSelect} movies={movies}  />
      <Footer></Footer>
    </div>
  );
}
