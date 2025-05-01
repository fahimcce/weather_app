import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  darkMode: boolean;
}

// Initialize from localStorage if available or system preference
const getInitialState = (): ThemeState => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("weatherAppTheme");
    if (savedTheme) {
      return { darkMode: savedTheme === "dark" };
    }
    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return { darkMode: true };
    }
  }
  return { darkMode: false };
};

const initialState: ThemeState = getInitialState();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      // Save preference to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "weatherAppTheme",
          state.darkMode ? "dark" : "light"
        );
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
