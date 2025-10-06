import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminRewards = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Rewards System</h1>
            <p className="text-muted-foreground">Manage rewards and recognition</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Reward
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Input placeholder="Search rewards..." className="w-full" />
          </div>
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">45</CardTitle>
              <CardDescription>Total Rewards</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">234</CardTitle>
              <CardDescription>Rewards Claimed</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">12</CardTitle>
              <CardDescription>Active Badges</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reward Categories</CardTitle>
            <CardDescription>Available rewards and badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Helping Hand Badge", category: "Achievement", claimed: 45 },
                { title: "Senior Champion", category: "Recognition", claimed: 23 },
                { title: "Task Master", category: "Achievement", claimed: 67 },
                { title: "Community Hero", category: "Recognition", claimed: 12 },
                { title: "Volunteer of the Month", category: "Award", claimed: 8 },
              ].map((reward, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{reward.title}</p>
                      <p className="text-sm text-muted-foreground">{reward.category}</p>
                    </div>
                  </div>
                  <Badge>{reward.claimed} claimed</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminRewards;
