import { useDispatch, useSelector } from "react-redux";
import { getAirPollution } from "../store/slices/weatherSlice";
import { useEffect } from "react";
import AirComponent from "./AirComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";

export default function AirQuality() {
  const dispatch = useDispatch();
  const weatherState = useSelector((state) => state.weather);
  const airComponents = ["SO2", "NO2", "PM10", "PM2.5", "O3", "CO"];
  const airState = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

  useEffect(() => {
    dispatch(getAirPollution(weatherState.city));
  }, [dispatch, weatherState.city]);

  if (
    !weatherState.air ||
    !weatherState.air.list ||
    !weatherState.air.list[0]
  ) {
    return;
  }

  return (
    <div className="w-full h-full bg-slate-800/40 backdrop-blur-md border border-white/10 text-white rounded-2xl p-6 transition-all hover:bg-slate-800/60 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-slate-200 flex items-center font-medium capitalize tracking-wide text-sm">
          <FontAwesomeIcon icon={faWind} className="mr-3 text-orange-400 text-lg" />
          Air Quality Index
        </h2>
        <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full px-4 py-1 text-sm font-semibold shadow-md shadow-orange-500/20">
          {airState[weatherState.air.list[0].main.aqi - 1]}
        </span>
      </div>
      <div className="flex flex-wrap justify-between items-end">
        {airComponents.map((el) => {
          return (
            <AirComponent
              key={el}
              element={el}
              percent={
                weatherState.air.list[0].components[
                  el.toLocaleLowerCase().replace(".", "_")
                ]
              }
            />
          );
        })}
      </div>
    </div>
  );
}
