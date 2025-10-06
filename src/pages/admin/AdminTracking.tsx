import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminTracking = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Location Tracking</h1>
            <p className="text-muted-foreground">Monitor senior locations and safety</p>
          </div>
          <Button>
            <MapPin className="h-4 w-4 mr-2" />
            View Map
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Input placeholder="Search locations..." className="w-full" />
          </div>
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">156</CardTitle>
              <CardDescription>Active Trackers</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">143</CardTitle>
              <CardDescription>Online Now</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">13</CardTitle>
              <CardDescription>Offline</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">2</CardTitle>
              <CardDescription>Safe Zones Breached</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Locations</CardTitle>
            <CardDescription>Real-time location of seniors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Margaret Smith", location: "Downtown Shopping Mall", status: "Safe", lastUpdate: "2 min ago" },
                { name: "Robert Johnson", location: "Central Park", status: "Safe", lastUpdate: "5 min ago" },
                { name: "Linda Davis", location: "Community Center", status: "Safe", lastUpdate: "8 min ago" },
                { name: "Alice Brown", location: "Medical Clinic", status: "Safe", lastUpdate: "12 min ago" },
                { name: "Tom Wilson", location: "Home", status: "Safe", lastUpdate: "15 min ago" },
              ].map((person, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.location} • {person.lastUpdate}</p>
                    </div>
                  </div>
                  <Badge>{person.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminTracking;
