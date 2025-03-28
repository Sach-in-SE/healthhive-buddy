
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
import './i18n/i18n'; // Import i18n configuration
import { useState } from "react";

const App = () => {
  // Create a state variable to hold the QueryClient instead of creating it on every render
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
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
