import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FavoritesContext } from "../context/FavoritesContext";

const API_KEY = "7bedd4e208142f9f11071f3fdd600368";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const TVDetail = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
        setTvShow(res.data);

        const videoRes = await axios.get(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`);
        const trailers = videoRes.data.results.filter(
          v => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailers.length > 0) setTrailer(trailers[0].key);
      } catch (err) {
        console.error("Failed to load TV show details", err);
      }
    };

    fetchDetails();
  }, [id]);

  const isFavorite = favorites.some((fav) => fav.id === tvShow?.id);

  const handleWatchLater = () => {
    const existing = JSON.parse(localStorage.getItem("watchLater")) || [];
    const exists = existing.some((m) => m.id === tvShow.id);
    if (!exists) {
      existing.push(tvShow);
      localStorage.setItem("watchLater", JSON.stringify(existing));
      alert(`${tvShow.name} added to Watch Later`);
    } else {
      alert(`${tvShow.name} is already in Watch Later`);
    }
  };

  if (!tvShow) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="p-6 text-white bg-[#1C1C1C] min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={IMG_BASE + tvShow.poster_path}
          alt={tvShow.name}
          className="w-72 rounded shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{tvShow.name}</h1>
          <p className="text-sm text-gray-400 mb-4">
            ⭐ {tvShow.vote_average} | {tvShow.first_air_date}
          </p>
          <p className="mb-4">{tvShow.overview}</p>
          <p className="text-sm text-gray-300 mb-2">
            Genres: {tvShow.genres?.map((g) => g.name).join(", ")}
          </p>

          <div className="flex gap-3 mt-4">
            {isFavorite ? (
              <button
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => removeFavorite(tvShow.id)}
              >
                ❌ Remove Favorite
              </button>
            ) : (
              <button
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                onClick={() => {
                  addFavorite(tvShow);
                  alert(`${tvShow.name} added to favorites`);
                }}
              >
                ❤️ Add to Favorites
              </button>
            )}

            <button
              className="bg-yellow-400 px-4 py-2 rounded text-black hover:bg-yellow-500"
              onClick={handleWatchLater}
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

export default TVDetail;
