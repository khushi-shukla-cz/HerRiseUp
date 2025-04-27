import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionProvider } from "@/contexts/SessionContext";
import { AchievementProvider } from "@/contexts/AchievementContext";
import Welcome from "./pages/Welcome";
import Chat from "./pages/Chat";
import Resources from "./pages/Resources";
import JobListings from "./pages/JobListings";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Progress from "./pages/Progress";
import InterviewPrep from "./pages/InterviewPrep";
import ResumeBuild from "./pages/ResumeBuild";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <AchievementProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/interview-prep" element={<InterviewPrep />} />
              <Route path="/resume-build" element={<ResumeBuild />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AchievementProvider>
    </SessionProvider>
  </QueryClientProvider>
);

export default App;
