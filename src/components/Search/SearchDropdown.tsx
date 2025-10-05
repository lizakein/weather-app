import { OptionsWindow } from "../../shared/OptionsWindow";
import type { City } from "../../types/city";
import LoadingIcon from "../../assets/images/icon-loading.svg";
import { useEffect, useRef } from "react";

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
  const optionRefs = useRef<HTMLLIElement[]>([]);
  const firstResultFocused = useRef(false);

  useEffect(() => {
    if (results.length > 0) {
      firstResultFocused.current = false;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Tab" && !firstResultFocused.current) {
          const first = optionRefs.current[0];
          if (first) {
            e.preventDefault();
            first.focus();
            firstResultFocused.current = true;
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [results]);

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
          role="listbox"
        >
          {results.map((city, index) => (
            <li 
              key={`${city.id}-${city.latitude}-${city.longitude}`} 
              className="search__option"
              tabIndex={0}
              ref={el => { optionRefs.current[index] = el!; }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSelect(city);                
                }
              }}
            >
              <button
                type="button"          
                onClick={() => handleSelect(city)}
                tabIndex={-1}
              >
                {`${city.name}, ${city.admin1}, ${city.country}`}
              </button>
            </li>
          ))}
        </ul>
      }
    </OptionsWindow>
  );
}