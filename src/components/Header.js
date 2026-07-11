import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  getCurrentWeather,
  getAirPollution,
  changeCity,
} from "../store/slices/weatherSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleSearch = async () => {
    const city = inputRef.current.value.trim();
    if (!city) return;

    try {
      inputRef.current.value = "";
      dispatch(changeCity(city));
      await dispatch(getCurrentWeather(city)).unwrap();
      await dispatch(getAirPollution(city)).unwrap();
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  return (
    <header className="sticky lg:relative left-0 top-0 z-50 w-full bg-slate-900/50 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo/Brand placeholder can go here if wanted in future */}
        <div className="flex-1"></div>

        <div className="flex flex-col sm:flex-row items-stretch w-full sm:w-auto gap-3 max-w-lg mx-auto md:mx-0">
          <div className="relative w-full sm:w-96">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="w-full h-full bg-slate-800/80 border border-slate-700 text-slate-100 rounded-full px-5 py-2.5 outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder:text-slate-500 shadow-inner"
              ref={inputRef}
              type="text"
              placeholder="Search for a city..."
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-full px-6 py-2.5 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:from-orange-400 hover:to-orange-500 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Search
          </button>
        </div>

        <div className="flex-1"></div>
      </div>
    </header>
  );
}
