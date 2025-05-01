import { History, X } from "lucide-react";
import { fetchWeather, setCurrentCity } from "../store/weatherSlice";
import { clearHistory } from "../store/historySlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

export default function HistoryList() {
  const dispatch = useAppDispatch();
  const { searches } = useAppSelector((state) => state.history);

  if (searches.length === 0) return null;

  const handleCityClick = (city: string) => {
    dispatch(setCurrentCity(city));
    dispatch(fetchWeather(city));
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <History className="h-4 w-4 mr-1" />
          <h3 className="text-sm font-medium">Recent Searches</h3>
        </div>
        <button
          onClick={() => dispatch(clearHistory())}
          className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
          aria-label="Clear history"
        >
          <X className="h-3 w-3 mr-1" />
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((city, index) => (
          <button
            key={index}
            onClick={() => handleCityClick(city)}
            className="px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                      rounded-full shadow-sm border border-gray-200 dark:border-gray-700
                      hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
