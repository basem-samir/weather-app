export default function AirComponent({ element, percent }) {
  return (
    <div className="text-center min-w-[100px]">
      <h4 className="text-[#555]">{element}</h4>
      <span className="text-lg">{percent}</span>
    </div>
  );
}
