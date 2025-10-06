import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminMessages = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">Monitor and manage platform messages</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Send Broadcast
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Input placeholder="Search messages..." className="w-full" />
          </div>
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">1,234</CardTitle>
              <CardDescription>Total Messages</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">45</CardTitle>
              <CardDescription>Unread Messages</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">12</CardTitle>
              <CardDescription>Flagged Messages</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Latest platform communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { from: "Senior User 1", to: "Volunteer User 1", preview: "Thank you for your help with...", unread: true },
                { from: "Volunteer User 2", to: "Senior User 2", preview: "I'll be there at 3 PM...", unread: true },
                { from: "Senior User 3", to: "Volunteer User 3", preview: "Can you help me with...", unread: false },
                { from: "Volunteer User 4", to: "Senior User 4", preview: "Task completed successfully...", unread: false },
                { from: "Senior User 5", to: "Volunteer User 5", preview: "Looking forward to meeting...", unread: true },
              ].map((message, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{message.from} → {message.to}</p>
                      <p className="text-sm text-muted-foreground">{message.preview}</p>
                    </div>
                  </div>
                  {message.unread && <Badge>Unread</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
