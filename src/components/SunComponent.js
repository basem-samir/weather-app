export default function SunComponent({ icon, title, time }) {
  return (
    <div className="flex justify-between items-center max-sm:gap-8 gap-3 p-3">
      <img loading="lazy" src={icon} alt={title} className="w-[70px]" />
      <div className="text-sm">
        <h5>{title}</h5>
        <span>{time}</span>
      </div>
    </div>
  );
}
