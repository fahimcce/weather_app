import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudLightning,
  Droplets,
} from "lucide-react";
import { WeatherCondition } from "../types/weather";

interface WeatherIconProps {
  condition: string;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 64 }) => {
  const renderIcon = () => {
    switch (condition as WeatherCondition) {
      case "Clear":
        return <Sun size={size} className="text-yellow-300" />;
      case "Clouds":
        return <Cloud size={size} className="text-gray-300" />;
      case "Rain":
      case "Drizzle":
        return <CloudRain size={size} className="text-blue-300" />;
      case "Snow":
        return <CloudSnow size={size} className="text-gray-100" />;
      case "Thunderstorm":
        return <CloudLightning size={size} className="text-yellow-200" />;
      case "Mist":
      case "Fog":
      case "Haze":
      case "Smoke":
        return <CloudFog size={size} className="text-gray-400" />;
      default:
        return <Droplets size={size} className="text-blue-400" />;
    }
  };

  return (
    <div className="inline-flex items-center justify-center">
      {renderIcon()}
    </div>
  );
};

export default WeatherIcon;
