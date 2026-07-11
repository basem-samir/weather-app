import { useSelector } from "react-redux";
import WeatherComponent from "./WeatherComponent";
import {
  faCompass,
  faDroplet,
  faEye,
  faTemperatureThreeQuarters,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

export default function WeatherInfo() {
  const weatherData = useSelector((state) => state.weather.data);

  if (
    !weatherData ||
    !weatherData.visibility ||
    !weatherData.main ||
    !weatherData.wind
  ) {
    return;
  }

  const visibility =
    weatherData.visibility > 1000
      ? weatherData.visibility / 1000 + "KM"
      : weatherData.visibility + "M";
  const feelsLike = weatherData.main.feels_like + "°C";
  const humidity = weatherData.main.humidity + "%";
  const pressure = weatherData.main.pressure + "hPa";
  const windSpeed = weatherData.wind.speed + "m/s";

  const data = [
    {
      title: "visibility",
      icon: faEye,
      value: visibility,
    },
    { title: "feelsLike", icon: faTemperatureThreeQuarters, value: feelsLike },
    { title: "humidity", icon: faDroplet, value: humidity },
    { title: "pressure", icon: faCompass, value: pressure },
    { title: "windSpeed", icon: faWind, value: windSpeed },
  ];

  return (
    <>
      <div
        className="grid justify-between items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 text-sm sm:text-base w-full mt-2"
      >
        {data.map((el) => {
          return (
            <WeatherComponent
              key={el.title}
              title={el.title}
              icon={el.icon}
              value={el.value}
            />
          );
        })}
      </div>
    </>
  );
}
