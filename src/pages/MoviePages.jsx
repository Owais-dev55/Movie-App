// src/pages/MoviePages.jsx
import React from "react";

export function Movies() {
  return (
    <div className="bg-[#1c1c1c] min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🎬 Movies Page</h1>
      <p>Coming soon: Browse all movies from TMDB API...</p>
    </div>
  );
}

export function TvShows() {
  return (
    <div className="bg-[#1c1c1c] min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">📺 TV Shows Page</h1>
      <p>Coming soon: Explore trending shows...</p>
    </div>
  );
}

export function People() {
  return (
    <div className="bg-[#1c1c1c] min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">👥 People Page</h1>
      <p>Coming soon: Browse actors & creators...</p>
    </div>
  );
}

export function Favorites() {
  return (
    <div className="bg-[#1c1c1c] min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">❤️ Favorites</h1>
      <p>Coming soon: Your watchlist stored in localStorage.</p>
    </div>
  );
}
