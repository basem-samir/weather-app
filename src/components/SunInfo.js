import { useSelector } from "react-redux";
import SunComponent from "./SunComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export default function SunInfo() {
  const cityInfo = useSelector((state) => state.weather.data);
  if (!cityInfo || !cityInfo.sys) {
    return;
  }
  return (
    <div className="w-full h-full bg-slate-800/40 backdrop-blur-md border border-white/10 text-white rounded-2xl p-6 transition-all hover:bg-slate-800/60 shadow-lg flex flex-col justify-between">
      <h2 className="text-slate-200 flex items-center font-medium capitalize tracking-wide text-sm mb-6">
        <FontAwesomeIcon icon={faSun} className="mr-3 text-orange-400 text-lg" />
        <span>Sunrise & Sunset</span>
      </h2>
      <div className="max-sm:justify-center flex flex-wrap justify-between items-center gap-4">
        <SunComponent
          icon={require("../assets/imgs/sunrise.png")}
          title={"sunrise"}
          time={new Date(cityInfo.sys.sunrise * 1000).toLocaleTimeString()}
        />
        <SunComponent
          icon={require("../assets/imgs/sunset.png")}
          title={"sunset"}
          time={new Date(cityInfo.sys.sunset * 1000).toLocaleTimeString()}
        />
      </div>
    </div>
  );
}
