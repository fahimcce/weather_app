import { CloudSun } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg text-center">
      <CloudSun className="w-16 h-16 mx-auto mb-4 text-blue-500 dark:text-blue-400" />
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Check the weather
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Enter a city name above to get the current weather conditions.
      </p>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Using OpenWeatherMap API for real-time weather data.
        </p>
      </div>
    </div>
  );
}
