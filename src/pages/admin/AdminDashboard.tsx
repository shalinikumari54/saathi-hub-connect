import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Heart, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Bell
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Progress } from "@/components/ui/progress";

const AdminDashboard = () => {
  const [stats] = useState({
    totalSeniors: 1247,
    totalVolunteers: 2856,
    activeTasks: 156,
    completedTasks: 15234,
    totalDonations: 45600,
    emergencyAlerts: 3
  });

  const [recentTasks] = useState([
    { id: 1, senior: "Mary Johnson", volunteer: "John Doe", type: "Grocery Shopping", status: "in-progress", location: "Downtown" },
    { id: 2, senior: "Robert Smith", volunteer: "Sarah Wilson", type: "Medical Appointment", status: "completed", location: "Uptown" },
    { id: 3, senior: "Eleanor Brown", volunteer: "Mike Chen", type: "Technology Help", status: "pending", location: "Midtown" },
    { id: 4, senior: "Frank Davis", volunteer: "Lisa Garcia", type: "Home Maintenance", status: "in-progress", location: "Westside" }
  ]);

  const [topVolunteers] = useState([
    { name: "John Doe", points: 2450, tasks: 67, rating: 4.9 },
    { name: "Sarah Wilson", points: 2200, tasks: 58, rating: 4.8 },
    { name: "Mike Chen", points: 1980, tasks: 52, rating: 4.9 },
    { name: "Lisa Garcia", points: 1750, tasks: 45, rating: 4.7 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in-progress": return "bg-blue-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage the Senior Saathi platform</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Alerts ({stats.emergencyAlerts})
            </Button>
            <Button>Generate Report</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Seniors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSeniors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVolunteers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedTasks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +23% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalDonations.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tasks</CardTitle>
                  <CardDescription>Latest task activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{task.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {task.senior} → {task.volunteer}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            {task.location}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Volunteers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Volunteers</CardTitle>
                  <CardDescription>This month's star performers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topVolunteers.map((volunteer, index) => (
                      <div key={volunteer.name} className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{volunteer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {volunteer.points} points • {volunteer.tasks} tasks
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{volunteer.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Alerts */}
            {stats.emergencyAlerts > 0 && (
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span>Emergency Alerts</span>
                  </CardTitle>
                  <CardDescription>Immediate attention required</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Medical Emergency - Downtown</p>
                        <p className="text-sm text-muted-foreground">Eleanor Brown, 5 minutes ago</p>
                      </div>
                      <Button size="sm" variant="destructive">Respond</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Fall Detection - Westside</p>
                        <p className="text-sm text-muted-foreground">Frank Davis, 12 minutes ago</p>
                      </div>
                      <Button size="sm" variant="destructive">Respond</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Task Management</CardTitle>
                <CardDescription>Monitor and manage all platform tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Active Tasks: {stats.activeTasks}</h3>
                    <Button>Create Task</Button>
                  </div>
                  <Progress value={85} className="w-full" />
                  <p className="text-sm text-muted-foreground">85% of tasks completed this week</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Management</CardTitle>
                <CardDescription>Approve and manage volunteer applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Pending Applications: 23</h3>
                    <Button>Review Applications</Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">2,543</div>
                      <div className="text-sm text-muted-foreground">Verified</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">156</div>
                      <div className="text-sm text-muted-foreground">Pending</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">12</div>
                      <div className="text-sm text-muted-foreground">Rejected</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Insights and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">94.2%</div>
                    <div className="text-sm text-muted-foreground">Task Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">4.8</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;