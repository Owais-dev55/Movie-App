import { useEffect, useState } from "react";

const People = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const apiKey = "7bedd4e208142f9f11071f3fdd600368";
      const res = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`);
      const data = await res.json();
      setPeople(data.results);
    };

    fetchPeople();
  }, []);

  return (
    <div className="p-6 text-white truncate bg-[#1C1C1C]">
      <h1 className="text-2xl font-bold mb-4">Popular People</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {people.map(person => (
          <div key={person.id} className=" rounded overflow-hidden text-center hover:scale-105">
            <img
              src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
              alt={person.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-2 text-sm">{person.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
