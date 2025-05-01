"use client";
import WeatherApp from "@/components/Home/WeatherApp";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <WeatherApp />
    </Provider>
  );
}
