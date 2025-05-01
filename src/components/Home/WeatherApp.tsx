"use client";
import EmptyState from "@/components/EmptyState";
import ErrorMessage from "@/components/ErrorMessage";
import Footer from "@/components/Footer";
import HistoryList from "@/components/HistoryList";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchForm from "@/components/SearchForm";
import ThemeToggle from "@/components/ThemeToggle";
import WeatherCard from "@/components/WeatherCard";
import { useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";

export default function WeatherApp() {
  const { data, loading, error } = useAppSelector((state) => state.weather);
  const { darkMode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            Weather Forecast
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search for a city to get the current weather conditions
          </p>
        </header>

        <ThemeToggle />
        <SearchForm />
        <HistoryList />

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <LoadingSpinner size="large" />
        ) : (
          <>{data ? <WeatherCard /> : <EmptyState />}</>
        )}

        <Footer />
      </div>
    </div>
  );
}
