import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HistoryState {
  searches: string[];
}

// Initialize state from localStorage if available
const getInitialState = (): HistoryState => {
  if (typeof window !== "undefined") {
    const savedSearches = localStorage.getItem("weatherSearchHistory");
    if (savedSearches) {
      try {
        return { searches: JSON.parse(savedSearches) };
      } catch (e) {
        return { searches: [] };
      }
    }
  }
  return { searches: [] };
};

const initialState: HistoryState = getInitialState();

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<string>) => {
      const city = action.payload.trim();
      if (city && !state.searches.includes(city)) {
        state.searches = [city, ...state.searches].slice(0, 10); // Keep only last 10 searches
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "weatherSearchHistory",
            JSON.stringify(state.searches)
          );
        }
      }
    },
    clearHistory: (state) => {
      state.searches = [];
      // Clear from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("weatherSearchHistory");
      }
    },
  },
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
