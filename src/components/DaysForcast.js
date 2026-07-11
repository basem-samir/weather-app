import { useDispatch, useSelector } from "react-redux";
import { getWeatherForecastDays } from "../store/slices/weatherSlice";
import { useEffect } from "react";
import DayComponent from "./DayComponent";
export default function DaysForecast() {
  const weatherState = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeatherForecastDays(weatherState.city));
  }, [dispatch, weatherState.city]);

  if (
    !weatherState ||
    !weatherState.days ||
    !weatherState.days.list ||
    !Array.isArray(weatherState.days.list) ||
    weatherState.days.list.length === 0
  ) {
    return;
  }
  return (
    <div className="bg-[#2A2B2D] px-4 py-2">
      <h3 className="text-2xl text-[#e96e50] capitalize  ">week forecast</h3>
      {weatherState.days.list.map((el) => {
        return (
          <DayComponent
            key={el.dt}
            icon={el.weather[0].icon}
            min={el.temp.min + "°C"}
            max={el.temp.max + "°C"}
            date={new Date(el.dt * 1000).toDateString()}
            description={el.weather[0].description}
          />
        );
      })}
    </div>
  );
}
