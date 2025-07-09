
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "7bedd4e208142f9f11071f3fdd600368";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const Home = () => {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const [popRes, topRes, upRes] = await Promise.all([
        axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
        axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
        axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
      ]);

      setPopular(popRes.data.results);
      setTopRated(topRes.data.results);
      setUpcoming(upRes.data.results);
    };

    fetchMovies();
  }, []);

  const MovieSection = ({ title, movies }) => (
    <section className="my-10">
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="hover:scale-105 transition cursor-pointer">
              <img
                src={IMG_BASE + movie.poster_path}
                alt={movie.title}
                className="rounded-md"
              />
              <h3 className="text-white mt-2 text-sm font-medium truncate">
                {movie.title}
              </h3>
              <p className="text-gray-400 text-xs">{movie.release_date}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <main className="bg-[#1C1C1E] min-h-screen px-6 pt-6">
      <MovieSection title="🔥 Popular Movies" movies={popular} />
      <MovieSection title="🌟 Top Rated" movies={topRated} />
      <MovieSection title="🎬 Upcoming Movies" movies={upcoming} />
    </main>
  );
};

export default Home;

