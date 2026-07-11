import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WeatherComponent({ title, icon, value }) {
  return (
    <div className="bg-[#2A2B2D] text-white min- p-3 rounded-md ">
      <h5 className="capitalize text-[#555]">{title}</h5>
      <div className="flex justify-between items-center mt-3">
        <FontAwesomeIcon icon={icon} />
        <span>{value}</span>
      </div>
    </div>
  );
}
