import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminVolunteerManagement = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Volunteer Management</h1>
            <p className="text-muted-foreground">Manage and monitor all volunteers</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Volunteer
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Input placeholder="Search volunteers..." className="w-full" />
          </div>
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">156</CardTitle>
              <CardDescription>Total Volunteers</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">89</CardTitle>
              <CardDescription>Active This Month</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">23</CardTitle>
              <CardDescription>Pending Applications</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Volunteers</CardTitle>
            <CardDescription>Latest volunteer registrations and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Volunteer {i}</p>
                      <p className="text-sm text-muted-foreground">volunteer{i}@example.com</p>
                    </div>
                  </div>
                  <Badge>Active</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminVolunteerManagement;
