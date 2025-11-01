import { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  MapPin, 
  Calendar, 
  Users, 
  MessageSquare, 
  Trophy, 
  Settings, 
  Bell, 
  Shield,
  Heart,
  LogOut,
  Search,
  Flame
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VolunteerLayoutProps {
  children: React.ReactNode;
}

const VolunteerLayout = ({ children }: VolunteerLayoutProps) => {
  const navigate = useNavigate();
  const [notifications] = useState(5);

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/volunteer/dashboard",
      badge: null
    },
    {
      title: "Available Tasks",
      icon: Search,
      url: "/volunteer/available-tasks",
      badge: "12"
    },
    {
      title: "My Tasks",
      icon: Calendar,
      url: "/volunteer/my-tasks",
      badge: "1"
    },
    {
      title: "My Seniors",
      icon: Users,
      url: "/volunteer/my-seniors",
      badge: null
    },
    {
      title: "Messages",
      icon: MessageSquare,
      url: "/volunteer/messages",
      badge: "3"
    },
    {
      title: "Rewards & Badges",
      icon: Trophy,
      url: "/volunteer/rewards",
      badge: null
    },
    {
      title: "Location & Safety",
      icon: MapPin,
      url: "/volunteer/safety",
      badge: null
    },
    {
      title: "Profile & Skills",
      icon: Users,
      url: "/volunteer/profile",
      badge: null
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/volunteer/settings",
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
                <Heart className="h-8 w-8 text-primary" />
                <div>
                  <h2 className="font-bold text-lg">Volunteer Portal</h2>
                  <p className="text-sm text-muted-foreground">Senior Saathi</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-4 border-b">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Points</span>
                  <span className="font-bold text-primary">1,250</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Flame className="h-3 w-3 mr-1 text-orange-500" />
                    Streak
                  </span>
                  <span className="font-bold">12 days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rank</span>
                  <Badge variant="secondary">Gold</Badge>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b">
              <div className="space-y-2">
                <Button className="w-full justify-start" size="sm" onClick={() => navigate("/volunteer/available-tasks")}>
                  <Search className="h-4 w-4 mr-2" />
                  Find Tasks
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm" onClick={() => navigate("/volunteer/safety")}>
                  <Shield className="h-4 w-4 mr-2" />
                  SOS Alert
                </Button>
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
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">John Doe</p>
                  <p className="text-xs text-muted-foreground">Gold Volunteer</p>
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

export default VolunteerLayout;