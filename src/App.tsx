import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Mylist from "./Pages/Mylist/Mylist";
import Home from "./Pages/Home/Home";
import Playmovie from "./Pages/Playmovie/Playmovie";
import Infomovie from "./Pages/Infomovie/Infomovie";

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

type VideoResult = {
  type: string;
  site: string;
  key: string;
};

// type MovieDetails = {
//   id: number;
//   title: string;
//   overview: string;
//   release_date: string;
//   runtime: number;
//   vote_average: number;
//   vote_count: number;
//   backdrop_path: string;
//   poster_path: string;
//   spoken_languages: {
//     english_name: string;
//     iso_639_1: string;
//     name: string;
//   }[];
//   budget: number;
//   revenue: number;
//   genres: {
//     id: number;
//     name: string;
//   }[];
//   homepage: string | null;
//   original_language: string;
// };

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  // const [moviess, setMoviess] = useState<MovieType[]>([]);
  const [randomMovie, setRandomMovie] = useState<MovieType | null>(null);
  const [src, setSrc] = useState<string>("");
  const [movies, setmovies] = useState<MovieType[]>([]);
  const [SelectedCategory, setSelectedCategory] = useState<number[] | null>(
    null
  );

  const [TrailerKey, setTrailerKey] = useState<string | null>(null);

  const handleCategoryFromChild = (category: number[]) => {
    setSelectedCategory(category);
  };

  // useEffect(() => {
  //   fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=59
  //   `)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMoviess(data.results);

  //       const filteredMovies = data.results.filter(
  //         (m: MovieType) => m.backdrop_path && m.overview
  //       );
  //       const random =
  //         filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
  //       setRandomMovie(random);
  //     });
  // }, []);

  useEffect(() => {
    if (!randomMovie) return;

    fetch(`${BASE_URL}/movie/${randomMovie?.id}?api_key=${API_KEY}&language=es-ES
    `)
      .then((res) => res.json())
      .then((data) => {
        setmovies(data);
      });

    fetch(
      `${BASE_URL}/movie/${randomMovie.id}/videos?api_key=${API_KEY}&language=es-ES`
    )
      .then((res) => res.json())
      .then((videoData) => {
        const trailer = videoData.results.find(
          (vid: VideoResult) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        setTrailerKey(trailer?.key || null);
      });
  }, [randomMovie]);


  //filtro de peliculas
 useEffect(() => {
  if (!SelectedCategory || SelectedCategory.length === 0) return;

  const fetchMovies = async () => {
    const pelisNecesarias = 10;
    const maxIntentos = 3;
    const peticionesPorIntento = 5;
    const acumuladas: MovieType[] = [];

    let intento = 0;

    while (acumuladas.length < pelisNecesarias && intento < maxIntentos) {
      intento++;
      const paginas = Array.from({ length: peticionesPorIntento }, () =>
        Math.floor(Math.random() * 500) + 1
      );

      try {
        const respuestas = await Promise.all(
          paginas.map((page) =>
            fetch(
              `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=${SelectedCategory.join(
                ","
              )}&page=${page}`
            ).then((res) => res.json())
          )
        );

        for (const data of respuestas) {
          const filtradas = (data.results || []).filter(
            (movie: MovieType) =>
              new Date(movie.release_date) >= new Date("2000-01-01") &&
              movie.vote_count > 800
          );

          acumuladas.push(...filtradas);

          if (acumuladas.length >= pelisNecesarias) break;
        }
      } catch (err) {
        console.error("Error en intento", intento, err);
      }
    }

    const mezcladas = acumuladas.sort(() => Math.random() - 0.5);
    setmovies(mezcladas.slice(0, pelisNecesarias));
  };

  fetchMovies();
}, [SelectedCategory]);



  useEffect(() => {
    console.log(movies);
  }, [movies]);

  useEffect(() => {
    if (!randomMovie) return;

    const low = `https://image.tmdb.org/t/p/w300${randomMovie.backdrop_path}`;
    const highRes = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
    setSrc(low);
    const img = new Image();
    img.src = highRes;
    img.onload = () => setSrc(highRes);

    return () => {
      img.onload = null;
    };
  }, [randomMovie]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            onCategorySelect={handleCategoryFromChild}
            randomMovie={randomMovie}
            src={src}
            movies={movies}
          />
        }
      />
      <Route path="/Mylist" element={<Mylist movies={movies} />} />
      <Route
        path="/Playmovie"
        element={
          <Playmovie
            // movieDetails={movieDetails}
            randomMovie={randomMovie}
            src={src}
            TrailerKey={TrailerKey}
          />
        }
      />
      <Route
        path="/Infomovie"
        element={
          <Infomovie
            randomMovie={randomMovie}
            // movieDetails={movieDetails}
            src={src}
          />
        }
      />
    </Routes>
  );
}

export default App;
