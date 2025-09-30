import { OptionsWindow } from "../../shared/OptionsWindow";
import type { City } from "../../types/city";
import LoadingIcon from "../../assets/images/icon-loading.svg";

interface SearchDropdownProps {
  loading: boolean;
  sectionRef: React.RefObject<HTMLDivElement | null>;
  results: City[];
  setResults: React.Dispatch<React.SetStateAction<City[]>>;
  handleSelect: (city: City) => void;
};

export function SearchDropdown({ 
  loading, 
  sectionRef, 
  results, 
  setResults, 
  handleSelect
}: SearchDropdownProps) {
  if (!sectionRef.current) return null;

  const rect = sectionRef.current.getBoundingClientRect();
  const width = sectionRef.current.offsetWidth - 16;

  return (
    <OptionsWindow
      position={{
        top: rect.bottom + window.scrollY + 8,
        left: rect.right + window.scrollX
      }}
      onClose={() => setResults([])}
    >
      {loading && 
        <p 
          className="search__loading" 
          style={{ width }}
        >
          <img src={LoadingIcon} alt="" className="search__loading-icon" />
          Search in progress
        </p>
      }

      { !loading &&
        <ul 
          className="search__dropdown"
          style={{ width }}
        >
          {results.map((city) => (
            <li 
              key={`${city.id}-${city.latitude}-${city.longitude}`}
              onClick={() => handleSelect(city)}
              className="search__option"
            >
              {city.name}
              {city.admin1 ? `, ${city.admin1}` : ""}
              {`, ${city.country}`}
            </li>
          ))}
        </ul>
      }
    </OptionsWindow>
  );
}