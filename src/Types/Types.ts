//Tipado Película 
export type MovieType = {
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


//Tipado Trailer Película
export type VideoResult = {
  type: string;
  site: string;
  key: string;
};


//Tipado Info Película
export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  poster_path: string;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  budget: number;
  revenue: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  original_language: string;
};
