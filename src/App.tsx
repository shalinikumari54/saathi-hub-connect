import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SeniorDashboard from "./pages/senior/SeniorDashboard";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Senior Routes */}
          <Route path="/senior/dashboard" element={<SeniorDashboard />} />
          <Route path="/senior/my-tasks" element={<div>Senior My Tasks</div>} />
          <Route path="/senior/my-events" element={<div>Senior My Events</div>} />
          <Route path="/senior/my-volunteers" element={<div>Senior My Volunteers</div>} />
          <Route path="/senior/messages" element={<div>Senior Messages</div>} />
          <Route path="/senior/donations" element={<div>Senior Donations</div>} />
          <Route path="/senior/location-tracking" element={<div>Senior Location Tracking</div>} />
          <Route path="/senior/emergency" element={<div>Senior Emergency</div>} />
          <Route path="/senior/request-help" element={<div>Senior Request Help</div>} />
          <Route path="/senior/settings" element={<div>Senior Settings</div>} />
          
          {/* Volunteer Routes */}
          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer/available-tasks" element={<div>Available Tasks</div>} />
          <Route path="/volunteer/my-tasks" element={<div>My Tasks</div>} />
          <Route path="/volunteer/my-seniors" element={<div>My Seniors</div>} />
          <Route path="/volunteer/messages" element={<div>Messages</div>} />
          <Route path="/volunteer/rewards" element={<div>Rewards & Badges</div>} />
          <Route path="/volunteer/safety" element={<div>Location & Safety</div>} />
          <Route path="/volunteer/profile" element={<div>Profile & Skills</div>} />
          <Route path="/volunteer/settings" element={<div>Settings</div>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
