import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FavoritesContext } from "../context/FavoritesContext";

const API_KEY = "7bedd4e208142f9f11071f3fdd600368";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        setMovie(res.data);

        const videoRes = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
        const trailers = videoRes.data.results.filter(v => v.type === "Trailer" && v.site === "YouTube");
        if (trailers.length > 0) setTrailer(trailers[0].key);
      } catch (err) {
        console.error("Failed to load movie detail", err);
      }
    };

    fetchDetails();
  }, [id]);

  const isFavorite = favorites.some((fav) => fav.id === movie?.id);

  const handleWatchLater = () => {
    const existing = JSON.parse(localStorage.getItem("watchLater")) || [];
    const exists = existing.some((m) => m.id === movie.id);
    if (!exists) {
      existing.push(movie);
      localStorage.setItem("watchLater", JSON.stringify(existing));
      alert(`${movie.title} added to Watch Later`);
    } else {
      alert(`${movie.title} is already in Watch Later`);
    }
  };

  if (!movie) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#141414] to-[#1C1C1C] text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        <img
          src={IMG_BASE + movie.poster_path}
          alt={movie.title}
          className="w-72 rounded-2xl shadow-xl transition-transform hover:scale-105"
        />

        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight">{movie.title}</h1>
          <p className="text-sm text-gray-400 mb-4">
            ⭐ {movie.vote_average} | {movie.release_date}
          </p>

          <p className="text-lg text-gray-200 mb-6 leading-relaxed">{movie.overview}</p>

          <p className="text-sm text-gray-400 mb-4">
            <span className="font-medium text-gray-300">Genres:</span> {movie.genres?.map((g) => g.name).join(", ")}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            {isFavorite ? (
              <button
                onClick={() => removeFavorite(movie.id)}
                className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg font-medium transition-colors"
              >
                ❌ Remove Favorite
              </button>
            ) : (
              <button
                onClick={() => {
                  addFavorite(movie);
                  alert(`${movie.title} added to favorites`);
                }}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-medium transition-colors"
              >
                ❤️ Add to Favorites
              </button>
            )}

            <button
              onClick={handleWatchLater}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-medium transition-colors"
            >
              ⏰ Watch Later
            </button>
          </div>
        </div>
      </div>

      {trailer && (
        <div className="mt-12 max-w-4xl mx-auto w-full">
          <h2 className="text-3xl font-semibold mb-4">🎬 Watch Trailer</h2>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="YouTube trailer"
              allowFullScreen
              className="w-full h-[450px] border-0"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
