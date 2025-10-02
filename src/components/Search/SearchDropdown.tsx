import { OptionsWindow } from "../../shared/OptionsWindow";
import type { City } from "../../types/city";
import LoadingIcon from "../../assets/images/icon-loading.svg";

interface SearchDropdownProps {
  loading: boolean;
  error: string | null;
  sectionRef: React.RefObject<HTMLDivElement | null>;
  results: City[];
  setResults: React.Dispatch<React.SetStateAction<City[]>>;
  handleSelect: (city: City) => void;
};

export function SearchDropdown({ 
  loading, 
  error,
  sectionRef, 
  results, 
  setResults, 
  handleSelect
}: SearchDropdownProps) {
  if (!sectionRef.current) return null;

  const rect = sectionRef.current.getBoundingClientRect();
  const width = sectionRef.current.offsetWidth - 16;

  console.log({
    loading, error, resultsLength: results.length,
    sectionExists: !!sectionRef.current,
    widthRaw: sectionRef.current?.offsetWidth - 16
  });

  return (
    <OptionsWindow
      position={{
        top: rect.bottom + window.scrollY + 8,
        left: rect.right + window.scrollX
      }}
      onClose={() => setResults([])}
    >
      { loading && 
        <p 
          className="search__loading" 
          style={{ "--dropdown-width": `${width}px` } as React.CSSProperties}
        >
          <img src={LoadingIcon} alt="" className="search__loading-icon" />
          Search in progress
        </p>
      }

      { error && !loading && (
        <p 
          className="search__error"
          style={{ "--dropdown-width": `${width}px` } as React.CSSProperties}
        >
          { error }
        </p>
      )}

      { !loading && !error && results.length === 0 && (
        <p
          className="search__empty"
          style={{ "--dropdown-width": `${width}px` } as React.CSSProperties}
        >
          No result found
        </p>
      )}

      { results.length > 0 && !loading &&
        <ul 
          className="search__dropdown"
          style={{ "--dropdown-width": `${width}px` } as React.CSSProperties}
        >
          {results.map((city) => (
            <li 
              key={`${city.id}-${city.latitude}-${city.longitude}`} 
              className="search__option"
            >
              <button
                type="button"          
                onClick={() => handleSelect(city)}
              >
                {city.name}
                {city.admin1 ? `, ${city.admin1}` : ""},
                {city.country}
              </button>
            </li>
          ))}
        </ul>
      }
    </OptionsWindow>
  );
}