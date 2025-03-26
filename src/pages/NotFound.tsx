
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="glass-panel p-12 rounded-3xl max-w-lg mx-auto">
            <h1 className="text-5xl font-bold mb-4 text-health-600">404</h1>
            <p className="text-xl text-gray-600 mb-8">Oops! We couldn't find the page you're looking for.</p>
            <Button className="health-gradient hover:shadow-highlight transition-all" asChild>
              <Link to="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
