import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "7bedd4e208142f9f11071f3fdd600368";
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
      const data = await res.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-6 text-white bg-[#1C1C1C]">
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="rounded overflow-hidden hover:scale-105 transform transition duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-t"
            />
            <div className="bg-[#2A2A2A] p-2">
              <div className="text-sm font-semibold truncate">{movie.title}</div>
              <p className="text-gray-400 text-xs">{movie.release_date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
