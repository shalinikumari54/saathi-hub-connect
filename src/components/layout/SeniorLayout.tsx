import { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Calendar, 
  Users, 
  MessageSquare, 
  DollarSign, 
  Settings, 
  Bell, 
  Phone,
  MapPin,
  Heart,
  LogOut,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SeniorLayoutProps {
  children: React.ReactNode;
}

const SeniorLayout = ({ children }: SeniorLayoutProps) => {
  const navigate = useNavigate();
  const [notifications] = useState(3);

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/senior/dashboard",
      badge: null
    },
    {
      title: "My Tasks",
      icon: Calendar,
      url: "/senior/my-tasks",
      badge: "2"
    },
    {
      title: "My Events",
      icon: Calendar,
      url: "/senior/my-events",
      badge: null
    },
    {
      title: "My Volunteers",
      icon: Users,
      url: "/senior/my-volunteers",
      badge: null
    },
    {
      title: "Messages",
      icon: MessageSquare,
      url: "/senior/messages",
      badge: "3"
    },
    {
      title: "Donations",
      icon: DollarSign,
      url: "/senior/donations",
      badge: null
    },
    {
      title: "Location Tracking",
      icon: MapPin,
      url: "/senior/location-tracking",
      badge: null
    },
    {
      title: "Emergency Contacts",
      icon: Phone,
      url: "/senior/emergency",
      badge: null
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/senior/settings",
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
                  <h2 className="font-bold text-lg">Senior Portal</h2>
                  <p className="text-sm text-muted-foreground">Senior Saathi</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b">
              <div className="space-y-2">
                <Button className="w-full justify-start" size="sm" onClick={() => navigate("/senior/request-help")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Request Help
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm" onClick={() => navigate("/senior/emergency")}>
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency
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
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">Mary Johnson</p>
                  <p className="text-xs text-muted-foreground">Senior Member</p>
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

export default SeniorLayout;