import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { fetchWeather, setCurrentCity } from "../store/weatherSlice";
import { addToHistory } from "../store/historySlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useAppDispatch();
  const { searches } = useAppSelector((state) => state.history);
  const { loading } = useAppSelector((state) => state.weather);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(setCurrentCity(searchTerm));
      dispatch(fetchWeather(searchTerm));
      dispatch(addToHistory(searchTerm));
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setSearchTerm(city);
    dispatch(setCurrentCity(city));
    dispatch(fetchWeather(city));
    dispatch(addToHistory(city));
    setShowSuggestions(false);
  };

  const filteredSuggestions = searches.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto mb-8 relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value.length > 0) {
                setShowSuggestions(true);
              } else {
                setShowSuggestions(false);
              }
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full py-3 pl-4 pr-12 rounded-full shadow-lg bg-white dark:bg-gray-800 
                      text-gray-800 dark:text-white border-2 border-transparent 
                      focus:outline-none focus:border-blue-500
                      transition-all duration-300"
            placeholder="Search for a city..."
            aria-label="Search for a city"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 
                        text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300
                        transition-colors duration-200"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 p-2 
                      bg-blue-500 dark:bg-blue-600 text-white rounded-full
                      hover:bg-blue-600 dark:hover:bg-blue-700
                      transition-colors duration-300
                      ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          className="absolute z-10 w-full mt-2 rounded-lg shadow-lg overflow-hidden
                      bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          <ul>
            {filteredSuggestions.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(city)}
                className="px-4 py-2 cursor-pointer text-gray-800 dark:text-white
                          hover:bg-gray-100 dark:hover:bg-gray-700
                          transition-colors duration-150"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
