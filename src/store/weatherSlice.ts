import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { WeatherData, WeatherError } from "@/types/weather";
import { fetchWeatherByCity } from "@/utils/api";

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  currentCity: string;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  currentCity: "",
};

export const fetchWeather = createAsyncThunk<
  WeatherData,
  string,
  { rejectValue: WeatherError }
>("weather/fetchWeather", async (city, { rejectWithValue }) => {
  try {
    return await fetchWeatherByCity(city);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    }
    return rejectWithValue({ message: "An unknown error occurred" });
  }
});

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    clearWeatherError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch weather data";
      });
  },
});

export const { setCurrentCity, clearWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;
