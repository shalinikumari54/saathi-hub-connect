import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Clock, 
  Star, 
  Trophy, 
  Flame, 
  Calendar,
  User,
  MessageSquare,
  Shield,
  CheckCircle,
  Award
} from "lucide-react";
import VolunteerLayout from "@/components/layout/VolunteerLayout";

const VolunteerDashboard = () => {
  const [availableTasks] = useState([
    { 
      id: 1, 
      title: "Grocery Shopping", 
      senior: "Eleanor Brown", 
      distance: "0.8 miles",
      time: "3:00 PM",
      duration: "1-2 hours",
      points: 25,
      type: "shopping"
    },
    { 
      id: 2, 
      title: "Technology Help", 
      senior: "Frank Davis", 
      distance: "1.2 miles",
      time: "Tomorrow 10:00 AM",
      duration: "1 hour",
      points: 20,
      type: "tech"
    },
    { 
      id: 3, 
      title: "Medical Appointment", 
      senior: "Mary Johnson", 
      distance: "2.1 miles",
      time: "Dec 25, 9:00 AM",
      duration: "3 hours",
      points: 45,
      type: "transport"
    }
  ]);

  const [myTasks] = useState([
    { 
      id: 1, 
      title: "Grocery Shopping", 
      senior: "Robert Smith", 
      status: "in-progress",
      startTime: "2:30 PM",
      location: "Downtown Market"
    }
  ]);

  const [stats] = useState({
    totalPoints: 1250,
    streak: 12,
    completedTasks: 47,
    rating: 4.9,
    rank: "Gold Volunteer",
    nextBadge: "Platinum Helper",
    progressToNext: 75
  });

  const [recentBadges] = useState([
    { name: "Tech Helper", icon: "💻", earned: "2 days ago" },
    { name: "Streak Master", icon: "🔥", earned: "1 week ago" }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "shopping": return "🛒";
      case "tech": return "💻";
      case "transport": return "🚗";
      default: return "🤝";
    }
  };

  return (
    <VolunteerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back, John!</h1>
            <p className="text-muted-foreground">Ready to make a difference today?</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              SOS
            </Button>
            <Button>
              <MapPin className="h-4 w-4 mr-2" />
              Find Tasks
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPoints}</div>
              <p className="text-xs text-muted-foreground">
                Rank: {stats.rank}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.streak}</div>
              <p className="text-xs text-muted-foreground">
                days in a row
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedTasks}</div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rating}</div>
              <p className="text-xs text-muted-foreground">
                Average rating
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress to Next Badge */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Progress to {stats.nextBadge}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={stats.progressToNext} className="w-full" />
              <p className="text-sm text-muted-foreground">
                {stats.progressToNext}% complete • Complete 3 more tasks to unlock
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="available" className="space-y-4">
          <TabsList>
            <TabsTrigger value="available">Available Tasks</TabsTrigger>
            <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="seniors">My Seniors</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            <div className="grid gap-4">
              {availableTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{getTypeIcon(task.type)}</span>
                          <h3 className="font-semibold text-lg">{task.title}</h3>
                          <Badge variant="secondary">{task.points} points</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{task.senior}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{task.distance}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{task.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Duration: {task.duration}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Accept Task</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-tasks" className="space-y-4">
            <div className="grid gap-4">
              {myTasks.length > 0 ? (
                myTasks.map((task) => (
                  <Card key={task.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{task.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{task.senior}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>Started at {task.startTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{task.location}</span>
                            </div>
                          </div>
                          <Badge className="w-fit">In Progress</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MapPin className="h-4 w-4 mr-2" />
                            Navigate
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat
                          </Button>
                          <Button size="sm">Complete Task</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center p-12">
                    <div className="text-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Active Tasks</h3>
                      <p className="text-muted-foreground mb-4">
                        Look for available tasks to start helping seniors in your area
                      </p>
                      <Button>Find Available Tasks</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Badges</CardTitle>
                  <CardDescription>Your latest achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBadges.map((badge, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="text-2xl">{badge.icon}</div>
                        <div>
                          <p className="font-medium">{badge.name}</p>
                          <p className="text-sm text-muted-foreground">Earned {badge.earned}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Points History</CardTitle>
                  <CardDescription>Your recent point earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Grocery Shopping</span>
                      <span className="font-medium text-green-600">+25 points</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Technology Help</span>
                      <span className="font-medium text-green-600">+20 points</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Medical Transport</span>
                      <span className="font-medium text-green-600">+45 points</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="seniors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Seniors You've Helped</CardTitle>
                <CardDescription>Build lasting relationships with seniors in your community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Eleanor Brown", "Robert Smith", "Mary Johnson"].map((senior, index) => (
                    <div key={senior} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {senior.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{senior}</p>
                          <p className="text-sm text-muted-foreground">
                            {(index + 1) * 3} tasks completed
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerDashboard;