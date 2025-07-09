import  { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBookmark, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Debounce the search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 1) {
        fetchResults(query.trim());
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchResults = async (searchTerm) => {
    try {
      const apiKey = "7bedd4e208142f9f11071f3fdd600368";
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}`
      );
      const data = await res.json();
      setResults(data.results.slice(0, 6)); // Limit to top 6
      setShowDropdown(true);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  const handleSelect = (item) => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    if (item.media_type === "movie") {
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === "tv") {
      navigate(`/tv/${item.id}`);
    } else if (item.media_type === "person") {
      navigate(`/person/${item.id}`);
    }
  };

  return (
    <header className="bg-[#2C1B1B] text-white px-6 py-3 flex items-center justify-between shadow-md relative z-50">
      {/* Left: Logo and Links */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-bold text-lg">
          <FaBars />
          <Link to={"/"}>
            <span>CineScope</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/tv">TV Shows</Link>
          <Link to="/people">People</Link>
        </nav>
      </div>

      {/* Right: Search, Bookmark, Avatar */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Search Box */}
        <div className="relative w-64">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#3E2B2B] text-white rounded-full px-4 py-1.5 pl-8 text-sm focus:outline-none"
            onFocus={() => {
              if (results.length > 0) setShowDropdown(true);
            }}
          />
          <FaSearch className="absolute top-2.5 left-2.5 text-sm text-white" />

          {/* Dropdown */}
          {showDropdown && results.length > 0 && (
            <ul className="absolute mt-1 w-full bg-white text-black rounded-md shadow-lg max-h-80 overflow-y-auto z-50">
              {results.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                >
                  {item.poster_path || item.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w45${
                        item.poster_path || item.profile_path
                      }`}
                      alt={item.title || item.name}
                      className="w-8 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-8 h-10 bg-gray-300 rounded" />
                  )}
                  <span className="text-sm">
                    {item.title || item.name}{" "}
                    <span className="text-xs text-gray-500">
                      ({item.media_type})
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Saved Icon */}
        <Link to="/favorites" title="Saved">
          <FaBookmark className="text-lg hover:text-yellow-400" />
        </Link>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
