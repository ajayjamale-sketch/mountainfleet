import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero text-white p-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-gradient" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>404</div>
        <h1 className="mt-4 text-3xl font-bold">Off the map</h1>
        <p className="mt-2 text-slate-400">The page you're looking for has driven off into the mountains.</p>
        <Link to="/" className="inline-block mt-6"><Button variant="accent" size="lg">Back to base camp</Button></Link>
      </div>
    </div>
  );
}
