import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentWeather } from "../store/slices/weatherSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function CurrentWeather() {
  const weatherState = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentWeather(weatherState.city));
  }, [dispatch, weatherState.city]);

  if (!weatherState.data || !weatherState.data.main) {
    return null;
  }



  return (
    <div className="bg-slate-800/40 backdrop-blur-md border border-white/10 text-white w-full p-6 rounded-2xl shadow-xl transition-all duration-300 hover:bg-slate-800/60">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-orange-400 font-medium tracking-wide uppercase text-xs mb-2">Current Weather</h3>
          <h2 className="text-5xl font-bold tracking-tighter my-1">{Math.round(weatherState.data.main.temp)}°C</h2>
          <h3 className="text-slate-300 text-sm mt-2">Feels like <span className="font-semibold text-white">{Math.round(weatherState.data.main.feels_like)}°C</span></h3>
          <h3 className="text-slate-300 capitalize text-lg mt-1 font-medium">{weatherState.data.weather[0].description}</h3>
        </div>
        <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/5">
          <img
            src={`https://openweathermap.org/img/wn/${weatherState.data.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="w-24 h-24 drop-shadow-lg"
          />
        </div>
      </div>
      
      <hr className="border-white/10 my-4" />
      
      <div className="flex flex-col gap-2 mt-4 text-slate-300 text-sm font-medium">
        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
            <FontAwesomeIcon icon={faCalendarDays} />
          </div>
          <span>{new Date().toDateString()} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <span>{weatherState.data.name}, {weatherState.data.sys.country}</span>
        </div>
      </div>
    </div>
  );
}
