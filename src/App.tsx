import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

//Tipado estados 
import type { MovieType } from "./Types/Types";
import type { VideoResult } from "./Types/Types";
import type { MovieDetails } from "./Types/Types";

import Mylist from "./Pages/Mylist/Mylist";
import Home from "./Pages/Home/Home";
import Playmovie from "./Pages/Playmovie/Playmovie";
import Infomovie from "./Pages/Infomovie/Infomovie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  //Pelis Carrusel
  const [PopularMovies, setPopularMovies] = useState<MovieType[]>([]);
  const [NowPlayingMovies, setNowPlayingMovies] = useState<MovieType[]>([]);
  const [TopRatedMovies, setTopRatedMovies] = useState<MovieType[]>([]);
  const [infoMovie, setinfoMovie] = useState<MovieDetails | null>(null);
  const [PlusMovie, setPlusMovie] = useState<MovieType | null>(null);

  const [srcBanner, setsrcBanner] = useState<string>("");
  const [srcPlayMv, setPlayMv] = useState<string>("");
  
  const [movies, setmovies] = useState<MovieType[]>([]);
  const [weekmovies, setweekmovies] = useState<MovieType | null>(null);
  const [movieFavorite, setmovieFavorite] = useState<MovieType[]>([]);
  const [SelectedCategory, setSelectedCategory] = useState<{
    emolgi: string;
    categories: number[];
  } | null>(null);

  const [TrailerKey, setTrailerKey] = useState<string | null>(null);

  const handleCategoryFromChild = (emolgi: string, category: number[]) => {
    setSelectedCategory({
      emolgi,
      categories: category,
    });
  };

  const moviefavorite = (Movie: MovieType) => {
    setmovieFavorite((prev) =>
      prev.find((fav) => fav.id === Movie.id) ? prev : [Movie, ...prev]
    );
  };

  const plusmovie = (Movie: MovieType) => {
    setPlusMovie(Movie);
    const low = `https://image.tmdb.org/t/p/w300${Movie?.backdrop_path}`;
    const highRes = `https://image.tmdb.org/t/p/original${Movie?.backdrop_path}`;
    setPlayMv(low);
    const img = new Image();
    img.src = highRes;
    img.onload = () => setPlayMv(highRes);
  };

  //Filtrado peliculas de la semana
  useEffect(() => {
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=es-ES`)
      .then((res) => res.json())
      .then((data) => {
        const filteredMovies = data.results.filter(
          (m: MovieType) => m.backdrop_path && m.overview
        );
        const random =
          filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
        setweekmovies(random);
      });
  }, []);

  //Top Carrusel section
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const [popularRes, nowPlayingRes, topRatedRes] = await Promise.all([
          fetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`
          ),
          fetch(
            `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1&region=ES`
          ),
          fetch(
            `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`
          ),
        ]);

        const [popularData, nowPlayingData, topRatedData] = await Promise.all([
          popularRes.json(),
          nowPlayingRes.json(),
          topRatedRes.json(),
        ]);

        setPopularMovies(popularData.results);
        setNowPlayingMovies(nowPlayingData.results);
        setTopRatedMovies(topRatedData.results);
      } catch (err) {
        console.error("Error fetching movie categories:", err);
      }
    };

    fetchAllCategories();
  }, []);

  //filtro de peliculas
  useEffect(() => {
    if (!SelectedCategory || SelectedCategory.categories.length === 0) return;

    const fetchMovies = async () => {
      const pelisNecesarias = 10;
      const maxIntentos = 3;
      const peticionesPorIntento = 5;
      const acumuladas: MovieType[] = [];

      let intento = 0;

      while (acumuladas.length < pelisNecesarias && intento < maxIntentos) {
        intento++;
        const paginas = Array.from(
          { length: peticionesPorIntento },
          () => Math.floor(Math.random() * 500) + 1
        );

        try {
          const respuestas = await Promise.all(
            paginas.map((page) =>
              fetch(
                `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=${SelectedCategory.categories.join(
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

  // llamado video peli de semana
  useEffect(() => {
    if (!PlusMovie) return;

    fetch(
      `${BASE_URL}/movie/${PlusMovie?.id}/videos?api_key=${API_KEY}&language=es-ES`
    )
      .then((res) => res.json())
      .then((videoData) => {
        const trailer = videoData.results.find(
          (vid: VideoResult) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        setTrailerKey(trailer?.key || null);
      });
  }, [PlusMovie]);

  //Imagen peli y carga de info
  useEffect(() => {
    if (!weekmovies) return;

    const low = `https://image.tmdb.org/t/p/w300${weekmovies?.backdrop_path}`;
    const highRes = `https://image.tmdb.org/t/p/original${weekmovies?.backdrop_path}`;
    setsrcBanner(low);
    const img = new Image();
    img.src = highRes;
    img.onload = () => setsrcBanner(highRes);

    fetch(
      `${BASE_URL}/movie/${weekmovies.id}?api_key=${API_KEY}&language=es-ES`
    )
      .then((res) => res.json())
      .then((data) => {
        setinfoMovie(data);
      });

    return () => {
      img.onload = null;
    };
  }, [weekmovies]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            emolgiSelect={SelectedCategory?.emolgi ?? ""}
            onCategorySelect={handleCategoryFromChild}
            weekmovies={weekmovies}
            srcBanner={srcBanner}
            movies={movies}
            PopularMovies={PopularMovies}
            NowPlayingMovies={NowPlayingMovies}
            TopRatedMovies={TopRatedMovies}
            moviefavorite={moviefavorite}
            plusmovie={plusmovie}
          />
        }
      />
      <Route
        path="/Mylist"
        element={<Mylist movieFavorite={movieFavorite} />}
      />
      <Route
        path="/Playmovie"
        element={
          <Playmovie
            moviefavorite={moviefavorite}
            weekmovies={PlusMovie}
            srcPlayMv={srcPlayMv}
            TrailerKey={TrailerKey}
          />
        }
      />
      <Route
        path="/Infomovie"
        element={
          <Infomovie
            moviefavorite={moviefavorite}
            infoMovie={infoMovie}
            src={srcBanner}
          />
        }
      />
    </Routes>
  );
}

export default App;
