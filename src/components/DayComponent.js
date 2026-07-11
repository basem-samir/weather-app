import {
  faTemperature0,
  faTemperatureFull,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DayComponent({ icon, min, max, date, description }) {
  return (
    <div className="bg-[#212528] p-3 my-3 rounded-md text-white text-sm">
      <h4>{date}</h4>
      <div className="flex items-center justify-between">
        <img
          className="w-[70px]"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="icon"
        />
        <div>
          <h5>
            <FontAwesomeIcon
              icon={faTemperature0}
              className="text-blue-500 mr-1"
            />
            {min}
          </h5>
          <h5>
            <FontAwesomeIcon
              icon={faTemperatureFull}
              className="text-red-500 mr-1"
            />
            {max}
          </h5>
        </div>
      </div>
      <h4 className=" text-[#555]">{description}</h4>
    </div>
  );
}
