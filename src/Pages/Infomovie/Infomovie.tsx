import Navbar from "../../Components/Navbar";

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  poster_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  original_language: string;
};

type HijoProps = {
  movieDetails :MovieDetails | null
};

export default function Infomovie ({movieDetails}:HijoProps){
    return(<div>
        <Navbar></Navbar>
        <div className="">hello</div>
    </div>)
}