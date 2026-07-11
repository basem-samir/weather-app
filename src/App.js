import { useSelector } from "react-redux";
import Header from "./components/Header";
import PageComponent from "./pages/Page";

export default function App() {
  const { data, status, error } = useSelector((state) => state.weather);

  let errorMessage = error || data?.message;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e24] via-[#2a2b2d] to-[#1e1e24] flex flex-col relative overflow-hidden">
      {/* Decorative blurred circles for modern look */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>

      <Header />
      <main className="flex-grow w-full max-w-7xl px-4 py-8 mx-auto z-10 relative">
        {status === 'loading' && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#1e1e24]/80 backdrop-blur-sm rounded-xl min-h-[400px]">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-200 mt-4 animate-pulse font-medium">Fetching weather data...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="flex flex-col items-center justify-center h-64 text-center mb-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md w-full backdrop-blur-sm">
              <h2 className="text-xl text-red-400 font-semibold mb-2">Oops! Something went wrong</h2>
              <p className="text-slate-300">{errorMessage || "City not found. Please try again."}</p>
            </div>
          </div>
        )}

        <div className={`grid grid-cols-1 lg:grid-cols-[320px_1fr] items-start gap-6 transition-opacity duration-300 ${status === 'loading' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <PageComponent />
        </div>
      </main>
    </div>
  );
}
