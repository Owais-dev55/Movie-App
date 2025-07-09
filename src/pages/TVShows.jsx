import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TVShows = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchTVShows = async () => {
      const apiKey = "7bedd4e208142f9f11071f3fdd600368";
      const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`);
      const data = await res.json();
      setShows(data.results);
    };

    fetchTVShows();
  }, []);

  return (
    <div className="p-6 text-white bg-[#1C1C1C]">
      <h1 className="text-2xl font-bold mb-4">Popular TV Shows</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {shows.map(show => (
          <Link to={`/tv/${show.id}`} key={show.id}>
            <div className="cursor-pointer rounded overflow-hidden hover:scale-105 transition-transform">
              <img
                src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                alt={show.name}
                className="w-full rounded-t"
              />
              <div className="p-2 text-sm">{show.name}</div>
              <p className="text-gray-400 text-xs px-2">{show.first_air_date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TVShows;
