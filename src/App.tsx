
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Symptoms from "./pages/Symptoms";
import About from "./pages/About";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import LanguageSelector from "@/components/language/LanguageSelector";
import LanguageIndicator from "@/components/language/LanguageIndicator"; 
import "./styles/rtl.css";

const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="fixed bottom-4 right-4 z-50">
            <LanguageSelector />
          </div>
          <div className="fixed top-4 right-4 z-50">
            <LanguageIndicator />
          </div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/symptoms" element={<Symptoms />} />
              <Route path="/about" element={<About />} />
              <Route path="/community" element={<Community />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
