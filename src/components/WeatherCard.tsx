import { formatTime } from "../utils/api";
import { Droplets, Wind, ArrowDown, ArrowUp } from "lucide-react";
import WeatherIcon from "./WeatherIcon";
import { useAppSelector } from "@/hooks/hooks";

export default function WeatherCard() {
  const { data } = useAppSelector((state) => state.weather);
  const { darkMode } = useAppSelector((state) => state.theme);

  if (!data) return null;

  const temperature = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherMain = data.weather[0].main;
  const weatherDescription = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const sunrise = formatTime(data.sys.sunrise, data.timezone);
  const sunset = formatTime(data.sys.sunset, data.timezone);

  // Get the background style based on the current weather condition
  const getWeatherBackground = () => {
    switch (weatherMain) {
      case "Clear":
        return darkMode
          ? "bg-gradient-to-br from-gray-900 to-blue-900"
          : "bg-gradient-to-br from-blue-400 to-blue-500";
      case "Clouds":
        return darkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-700"
          : "bg-gradient-to-br from-gray-300 to-blue-300";
      case "Rain":
      case "Drizzle":
        return darkMode
          ? "bg-gradient-to-br from-gray-900 to-blue-800"
          : "bg-gradient-to-br from-gray-400 to-blue-400";
      case "Thunderstorm":
        return darkMode
          ? "bg-gradient-to-br from-gray-900 to-purple-900"
          : "bg-gradient-to-br from-gray-600 to-purple-500";
      case "Snow":
        return darkMode
          ? "bg-gradient-to-br from-gray-800 to-blue-800"
          : "bg-gradient-to-br from-blue-100 to-gray-200";
      default:
        return darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-gray-200 to-gray-300";
    }
  };

  return (
    <div
      className={`w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl ${getWeatherBackground()} text-white transition-all duration-500`}
    >
      {/* Header */}
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-1 text-center">
          {data.name}, {data.sys.country}
        </h2>
        <p className="text-sm opacity-90 capitalize">{weatherDescription}</p>

        {/* Main weather information */}
        <div className="flex items-center justify-center my-6">
          <div className="text-8xl font-bold">{temperature}°</div>
          <div className="ml-6">
            <WeatherIcon condition={weatherMain} />
          </div>
        </div>

        <p className="text-md">Feels like {feelsLike}°</p>
      </div>

      {/* Weather details */}
      <div className="bg-black/20 backdrop-blur-sm p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Droplets className="h-5 w-5 mr-2 text-blue-300" />
            <div>
              <p className="text-xs opacity-80">Humidity</p>
              <p className="font-medium">{humidity}%</p>
            </div>
          </div>

          <div className="flex items-center">
            <Wind className="h-5 w-5 mr-2 text-gray-300" />
            <div>
              <p className="text-xs opacity-80">Wind Speed</p>
              <p className="font-medium">{windSpeed} m/s</p>
            </div>
          </div>

          <div className="flex items-center">
            <ArrowUp className="h-5 w-5 mr-2 text-yellow-300" />
            <div>
              <p className="text-xs opacity-80">Sunrise</p>
              <p className="font-medium">{sunrise}</p>
            </div>
          </div>

          <div className="flex items-center">
            <ArrowDown className="h-5 w-5 mr-2 text-orange-300" />
            <div>
              <p className="text-xs opacity-80">Sunset</p>
              <p className="font-medium">{sunset}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
