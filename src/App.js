import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import FavoritesProvider from "./context/FavoritesContext";
import SearchResults from "./components/SearchResults";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import People from "./pages/People";
import TVDetail from "./pages/TVdetail";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/tv/:id" element={<TVDetail />} />
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/people" element={<People />} />
          <Route path="*" element={<div className="text-white p-6">404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
