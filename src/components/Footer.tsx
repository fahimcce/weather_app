export default function Footer() {
  return (
    <footer className="py-4 mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>
        © {new Date().getFullYear()} forhad fahim | Powered by{" "}
        <a
          href="https://openweathermap.org/api"
          rel=""
          className="text-blue-500 hover:underline"
        >
          OpenWeatherMap
        </a>
      </p>
    </footer>
  );
}
