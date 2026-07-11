import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentWeather } from "../store/slices/weatherSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
  faSun,
  faMoon,
  faCloud,
  faCloudSun,
  faCloudMoon,
  faCloudRain,
  faCloudShowersHeavy,
  faBolt,
  faSnowflake,
  faSmog
} from "@fortawesome/free-solid-svg-icons";

export default function CurrentWeather() {
  const weatherState = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    dispatch(getCurrentWeather(weatherState.city));
  }, [dispatch, weatherState.city]);

  useEffect(() => {
    if (weatherState.data?.weather?.[0]?.icon) {
      setImageError(false);
    }
  }, [weatherState.data?.weather]);

  if (!weatherState.data || !weatherState.data.main) {
    return null;
  }

  const getIcon = (iconCode) => {
    switch (iconCode) {
      case "01d": return <FontAwesomeIcon icon={faSun} className="text-yellow-400" />;
      case "01n": return <FontAwesomeIcon icon={faMoon} className="text-blue-300" />;
      case "02d": return <FontAwesomeIcon icon={faCloudSun} className="text-yellow-200" />;
      case "02n": return <FontAwesomeIcon icon={faCloudMoon} className="text-blue-200" />;
      case "03d":
      case "03n":
      case "04d":
      case "04n": return <FontAwesomeIcon icon={faCloud} className="text-gray-300" />;
      case "09d":
      case "09n": return <FontAwesomeIcon icon={faCloudShowersHeavy} className="text-blue-400" />;
      case "10d":
      case "10n": return <FontAwesomeIcon icon={faCloudRain} className="text-blue-400" />;
      case "11d":
      case "11n": return <FontAwesomeIcon icon={faBolt} className="text-yellow-500" />;
      case "13d":
      case "13n": return <FontAwesomeIcon icon={faSnowflake} className="text-blue-200" />;
      case "50d":
      case "50n": return <FontAwesomeIcon icon={faSmog} className="text-gray-400" />;
      default: return <FontAwesomeIcon icon={faSun} className="text-yellow-400" />;
    }
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md border border-white/10 text-white w-full p-6 rounded-2xl shadow-xl transition-all duration-300 hover:bg-slate-800/60">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-orange-400 font-medium tracking-wide uppercase text-xs mb-2">Current Weather</h3>
          <h2 className="text-5xl font-bold tracking-tighter my-1">{Math.round(weatherState.data.main.temp)}°C</h2>
          <h3 className="text-slate-300 text-sm mt-2">Feels like <span className="font-semibold text-white">{Math.round(weatherState.data.main.feels_like)}°C</span></h3>
          <h3 className="text-slate-300 capitalize text-lg mt-1 font-medium">{weatherState.data.weather[0].description}</h3>
        </div>
        <div className="bg-white/10 flex items-center justify-center p-2 rounded-full backdrop-blur-sm border border-white/5 w-24 h-24 text-6xl drop-shadow-lg">
          {!imageError ? (
            <img
              src={`https://openweathermap.org/img/wn/${weatherState.data.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="w-full h-full drop-shadow-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            getIcon(weatherState.data.weather[0].icon)
          )}
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
