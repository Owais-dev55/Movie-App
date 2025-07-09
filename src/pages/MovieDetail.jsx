import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "7bedd4e208142f9f11071f3fdd600368"; 
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Get movie detail
        const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        setMovie(res.data);

        // Get video (trailer)
        const videoRes = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
        const trailers = videoRes.data.results.filter(v => v.type === "Trailer" && v.site === "YouTube");
        if (trailers.length > 0) setTrailer(trailers[0].key);
      } catch (err) {
        console.error("Failed to load movie detail", err);
      }
    };

    fetchDetails();
  }, [id]);

  const saveToStorage = (key, movie) => {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const exists = existing.some((m) => m.id === movie.id);
    if (!exists) {
      existing.push(movie);
      localStorage.setItem(key, JSON.stringify(existing));
      alert(`${movie.title} added to ${key}`);
    } else {
      alert(`${movie.title} is already in ${key}`);
    }
  };

  if (!movie) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="p-6 text-white max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={IMG_BASE + movie.poster_path}
          alt={movie.title}
          className="w-72 rounded shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-400 mb-4">
            ⭐ {movie.vote_average} | {movie.release_date}
          </p>
          <p className="mb-4">{movie.overview}</p>
          <p className="text-sm text-gray-300 mb-2">
            Genres: {movie.genres?.map((g) => g.name).join(", ")}
          </p>

          <div className="flex gap-3 mt-4">
            <button
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              onClick={() => saveToStorage("favorites", movie)}
            >
              ❤️ Favorite
            </button>
            <button
              className="bg-yellow-400 px-4 py-2 rounded text-black hover:bg-yellow-500"
              onClick={() => saveToStorage("watchLater", movie)}
            >
              ⏰ Watch Later
            </button>
          </div>
        </div>
      </div>

      {trailer && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-2">Trailer</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="YouTube trailer"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
