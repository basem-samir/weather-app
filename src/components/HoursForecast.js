import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherForecastHours } from "../store/slices/weatherSlice";
import HourComponent from "./HourComponent";

export default function HoursForecast() {
  const weatherState = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeatherForecastHours(weatherState.city));
  }, [dispatch, weatherState.city]);

  if (
    !weatherState ||
    !weatherState.hours ||
    !weatherState.hours.list ||
    !Array.isArray(weatherState.hours.list) ||
    weatherState.hours.list.length === 0
  ) {
    return;
  }

  return (
    <div>
      <h2 className="my-4 text-2xl capitalize text-[#e96e50]">
        hourly forecast{" "}
      </h2>
      <div className="grid text-center [grid-template-columns:repeat(auto-fill,minmax(80px,1fr))] md:[grid-template-columns:repeat(auto-fill,minmax(100px,1fr))] lg:[grid-template-columns:repeat(auto-fill,minmax(120px,1fr))] xl:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {weatherState.hours.list.map((el) => {
          const date = new Date(el.dt * 1000);
          let hours = date.getHours();
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const ampm = hours >= 12 ? "PM" : "AM";

          hours = hours % 12;
          hours = hours === 0 ? 12 : hours;

          const dateInHours = `${hours
            .toString()
            .padStart(2, "0")}:${minutes} ${ampm}`;

          return (
            <HourComponent
              key={el.dt}
              date={dateInHours}
              icon={el.weather[0].icon}
              temp={el.main.temp}
            />
          );
        })}
      </div>
    </div>
  );
}
