export default function HourComponent({ date, icon, temp }) {
  return (
    <div className="text-sm text-white flex flex-col justify-center items-center bg-[#2A2B2D] p-3 rounded-xl shadow max-w-[200px] w-full mx-auto">
      <h3>{date}</h3>
      <img
        className="w-[40px] md:w-[80px]"
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="icon"
      />
      <h2>{temp}°C</h2>
    </div>
  );
}
