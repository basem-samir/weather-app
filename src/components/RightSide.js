import SunInfo from "./SunInfo";
import AirQuality from "./AirQuality";
import WeatherInfo from "./WeatherInfo";

export default function RightSide() {
  return (
    <div className="bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl h-full flex flex-col">
      <h1 className="mb-6 text-slate-100 font-bold text-2xl tracking-tight flex items-center gap-2">
        <span className="text-orange-400">Today's</span> Highlights
      </h1>
      <div className="flex flex-col xl:flex-row justify-between gap-6 mb-6">
        <div className="w-full xl:w-1/2">
          <AirQuality />
        </div>
        <div className="w-full xl:w-1/2">
          <SunInfo />
        </div>
      </div>
      <WeatherInfo />
    </div>
  );
}
