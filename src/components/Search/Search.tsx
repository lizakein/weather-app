import { useState } from "react";
import SearchIcon from "../../assets/images/icon-search.svg";
import "./Search.css";

interface SearchProps {
  onSelectCity: (coords: { 
    lat: number, 
    lon: number, 
    city: string, 
    country: string 
  }) => void;
};

interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
};

export function Search({ onSelectCity }: SearchProps) {
  const [ query, setQuery ] = useState("");
  const [ results, setResults ] = useState<City[]>([]);
  const [ loading, setLoading ] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=5&language=en&format=json`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Geocoding error: ", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (city: City) => {
    onSelectCity({ 
      lat: city.latitude, 
      lon: city.longitude, 
      city: city.name, 
      country: city.country 
    });
    setQuery("");
    setResults([]);
  };


  return (
    <>
      <form
        className='search' 
        role="search" 
        aria-label='Site search'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="search__section">
          <img 
            src={SearchIcon} 
            alt="" 
            role="presentation" 
            className='search__icon'
          />
          <input 
            id="search"
            name="search"
            type='search'
            className='search__input'
            placeholder='Search for a place...'
            aria-label='Search'
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        <button type="submit" className="search__button">Search</button>

        <div>
          {loading && <p className="search-city__loading">Loading...</p>}

          {results.length > 0 && (
            <ul>
              {results.map((city) => (
                <li 
                  key={`${city.id}-${city.latitude}-${city.longitude}`}
                  onClick={() => handleSelect(city)}
                >
                  {city.name}
                  {city.admin1 ? `, ${city.admin1}` : ""}
                  {`, ${city.country}`}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>   
    </> 
  );
}