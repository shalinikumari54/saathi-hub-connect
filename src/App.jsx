import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVolunteerManagement from "./pages/admin/AdminVolunteerManagement";
import AdminSeniorManagement from "./pages/admin/AdminSeniorManagement";
import AdminTaskManagement from "./pages/admin/AdminTaskManagement";
import AdminEventManagement from "./pages/admin/AdminEventManagement";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminRewards from "./pages/admin/AdminRewards";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminEmergency from "./pages/admin/AdminEmergency";
import AdminTracking from "./pages/admin/AdminTracking";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import SeniorDashboard from "./pages/senior/SeniorDashboard";
import SeniorMyTasks from "./pages/senior/SeniorMyTasks";
import SeniorMyEvents from "./pages/senior/SeniorMyEvents";
import SeniorMyVolunteers from "./pages/senior/SeniorMyVolunteers";
import SeniorMessages from "./pages/senior/SeniorMessages";
import SeniorDonations from "./pages/senior/SeniorDonations";
import SeniorLocationTracking from "./pages/senior/SeniorLocationTracking";
import SeniorEmergency from "./pages/senior/SeniorEmergency";
import SeniorRequestHelp from "./pages/senior/SeniorRequestHelp";
import SeniorSettings from "./pages/senior/SeniorSettings";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import VolunteerAvailableTasks from "./pages/volunteer/VolunteerAvailableTasks";
import VolunteerMyTasks from "./pages/volunteer/VolunteerMyTasks";
import VolunteerMySeniors from "./pages/volunteer/VolunteerMySeniors";
import VolunteerMessages from "./pages/volunteer/VolunteerMessages";
import VolunteerRewards from "./pages/volunteer/VolunteerRewards";
import VolunteerSafety from "./pages/volunteer/VolunteerSafety";

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
          <Route path="/admin/volunteers" element={<AdminVolunteerManagement />} />
          <Route path="/admin/seniors" element={<AdminSeniorManagement />} />
          <Route path="/admin/tasks" element={<AdminTaskManagement />} />
          <Route path="/admin/events" element={<AdminEventManagement />} />
          <Route path="/admin/donations" element={<AdminDonations />} />
          <Route path="/admin/rewards" element={<AdminRewards />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/emergency" element={<AdminEmergency />} />
          <Route path="/admin/tracking" element={<AdminTracking />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Senior Routes */}
          <Route path="/senior/dashboard" element={<SeniorDashboard />} />
          <Route path="/senior/my-tasks" element={<SeniorMyTasks />} />
          <Route path="/senior/my-events" element={<SeniorMyEvents />} />
          <Route path="/senior/my-volunteers" element={<SeniorMyVolunteers />} />
          <Route path="/senior/messages" element={<SeniorMessages />} />
          <Route path="/senior/donations" element={<SeniorDonations />} />
          <Route path="/senior/location-tracking" element={<SeniorLocationTracking />} />
          <Route path="/senior/emergency" element={<SeniorEmergency />} />
          <Route path="/senior/request-help" element={<SeniorRequestHelp />} />
          <Route path="/senior/settings" element={<SeniorSettings />} />
          
          {/* Volunteer Routes */}
          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer/available-tasks" element={<VolunteerAvailableTasks />} />
          <Route path="/volunteer/my-tasks" element={<VolunteerMyTasks />} />
          <Route path="/volunteer/my-seniors" element={<VolunteerMySeniors />} />
          <Route path="/volunteer/messages" element={<VolunteerMessages />} />
          <Route path="/volunteer/rewards" element={<VolunteerRewards />} />
          <Route path="/volunteer/safety" element={<VolunteerSafety />} />
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
