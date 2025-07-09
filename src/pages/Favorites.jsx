import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="p-6 text-white bg-[#121212] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">❤️ Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded p-2 shadow-md">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`${IMG_BASE}${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded"
                />
              </Link>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm">{movie.title}</p>
                <button
                  className="text-xs bg-red-500 px-2 py-1 rounded"
                  onClick={() => removeFavorite(movie.id)}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
