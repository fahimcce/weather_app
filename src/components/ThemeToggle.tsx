import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "../store/themeSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`fixed top-4 right-4 p-2 rounded-full transition-all duration-300
                ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-yellow-300"
                    : "bg-blue-100 hover:bg-blue-200 text-gray-800"
                }`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
