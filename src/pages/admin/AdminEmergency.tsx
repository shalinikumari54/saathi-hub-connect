import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminEmergency = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Emergency Alerts</h1>
            <p className="text-muted-foreground">Monitor and respond to emergency situations</p>
          </div>
          <Button variant="destructive">
            <AlertTriangle className="h-4 w-4 mr-2" />
            View All Alerts
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Input placeholder="Search emergencies..." className="w-full" />
          </div>
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">3</CardTitle>
              <CardDescription>Active Alerts</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">12</CardTitle>
              <CardDescription>Resolved Today</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">2.5 min</CardTitle>
              <CardDescription>Avg Response Time</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">98%</CardTitle>
              <CardDescription>Resolution Rate</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Emergencies</CardTitle>
            <CardDescription>Current emergency situations requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { senior: "Margaret Smith", type: "Medical", location: "123 Oak St", time: "5 min ago", status: "Active" },
                { senior: "Robert Johnson", type: "Fall Detection", location: "456 Pine Ave", time: "12 min ago", status: "Responding" },
                { senior: "Linda Davis", type: "Panic Button", location: "789 Elm Rd", time: "18 min ago", status: "Active" },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg border-destructive/50 bg-destructive/5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-medium">{alert.senior} - {alert.type}</p>
                      <p className="text-sm text-muted-foreground">{alert.location} • {alert.time}</p>
                    </div>
                  </div>
                  <Badge variant="destructive">{alert.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Resolved Alerts</CardTitle>
            <CardDescription>Recently resolved emergency situations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { senior: "Alice Brown", type: "Check-in Alert", resolved: "1 hour ago" },
                { senior: "Tom Wilson", type: "Medical", resolved: "2 hours ago" },
                { senior: "Emma Taylor", type: "Fall Detection", resolved: "3 hours ago" },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{alert.senior} - {alert.type}</p>
                      <p className="text-sm text-muted-foreground">Resolved {alert.resolved}</p>
                    </div>
                  </div>
                  <Badge variant="outline">Resolved</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminEmergency;
