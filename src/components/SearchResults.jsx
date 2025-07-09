// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  useEffect(() => {
    if (query) {
      fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&api_key=YOUR_API_KEY`)
        .then(res => res.json())
        .then(data => setResults(data.results || []));
    }
  }, [query]);

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Search Results for "{query}"</h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {results.map(item => (
          <div key={item.id} className="bg-[#3E2B2B] p-3 rounded shadow">
            <p className="font-semibold">{item.title || item.name}</p>
            {/* You can add poster image, etc. */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
