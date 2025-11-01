import { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  Calendar, 
  DollarSign, 
  Settings, 
  Bell, 
  Shield,
  TrendingUp,
  MessageSquare,
  MapPin,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [notifications] = useState(5);

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/admin/dashboard",
      badge: null
    },
    {
      title: "Volunteer Management",
      icon: Heart,
      url: "/admin/volunteers",
      badge: "23"
    },
    {
      title: "Senior Management",
      icon: Users,
      url: "/admin/seniors",
      badge: null
    },
    {
      title: "Task Management",
      icon: Calendar,
      url: "/admin/tasks",
      badge: null
    },
    {
      title: "Event Management",
      icon: Calendar,
      url: "/admin/events",
      badge: null
    },
    {
      title: "Donations",
      icon: DollarSign,
      url: "/admin/donations",
      badge: null
    },
    {
      title: "Rewards System",
      icon: TrendingUp,
      url: "/admin/rewards",
      badge: null
    },
    {
      title: "Messages",
      icon: MessageSquare,
      url: "/admin/messages",
      badge: "12"
    },
    {
      title: "Emergency Alerts",
      icon: Shield,
      url: "/admin/emergency",
      badge: "3"
    },
    {
      title: "Location Tracking",
      icon: MapPin,
      url: "/admin/tracking",
      badge: null
    },
    {
      title: "Analytics",
      icon: TrendingUp,
      url: "/admin/analytics",
      badge: null
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/admin/settings",
      badge: null
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h2 className="font-bold text-lg">Admin Panel</h2>
                  <p className="text-sm text-muted-foreground">Senior Saathi</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        onClick={() => navigate(item.url)}
                        className="w-full justify-start"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="destructive" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* User Profile */}
            <div className="mt-auto p-4 border-t">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@seniorsaathi.com</p>
                </div>
                <Button variant="outline" size="icon" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="border-b bg-background p-4">
            <div className="flex items-center justify-between">
              <SidebarTrigger />
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;