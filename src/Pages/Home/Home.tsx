import Navbar from "../../Components/Navbar";
import Banner from "./Banner";
import CardMood from "./CardMood";
import CatalogueMovie from "./CatalogueMovies";
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
  randomMovie: MovieType | null;
  src: string;
  movies: MovieType[];
}

export default function Home({ randomMovie, src ,movies}: HijoProps) {
  return (
    <div className="min-h-screen w-full bg-[#121212]" id="Home">
      <Navbar></Navbar>
      <Banner randomMovie={randomMovie} src={src} />
      <CardMood></CardMood>
      <CatalogueMovie movies={movies} />
      <Footer></Footer>
    </div>
  );
}
