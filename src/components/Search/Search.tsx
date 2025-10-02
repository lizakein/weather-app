import { useCallback, useEffect, useRef, useState } from "react";
import { SearchDropdown } from "./SearchDropdown";
import { fetchCities } from "../../api/geocodingApi";
import type { City } from "../../types/city";
import type { HomeCity } from "../../types/homeCity";
import SearchIcon from "../../assets/images/icon-search.svg";
import "./Search.css";

interface SearchProps {
  onSelectCity: (coords: HomeCity) => void;
};

export function Search({ onSelectCity }: SearchProps) {
  const [ query, setQuery ] = useState("");
  const [ results, setResults ] = useState<City[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const cities = await fetchCities(query);
        setResults(cities);
      } catch (err) {
        console.error("Geocoding error: ", err);
        setError("Failed to fetch results");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query])

  const handleSelect = useCallback((city: City) => {
    onSelectCity({ 
      lat: city.latitude, 
      lon: city.longitude, 
      city: city.name, 
      country: city.country 
    });
    setQuery("");
    setResults([]);
  }, [onSelectCity]);

  return (
    <>
      <form
        className='search' 
        role="search" 
        aria-label='Site search'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="search__section" ref={sectionRef}>
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
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <button type="submit" className="search__button">Search</button>

        {(results.length > 0 || loading || error) && sectionRef.current && (
          <SearchDropdown 
            loading={loading}
            error={error}
            sectionRef={sectionRef}
            results={results}
            setResults={setResults}
            handleSelect={handleSelect}
          />
        )}
      </form>   
    </> 
  );
}