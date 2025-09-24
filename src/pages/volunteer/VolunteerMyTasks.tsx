import { useState } from "react";
import VolunteerLayout from "@/components/layout/VolunteerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, Car, Heart, Wrench, Book, Users, MapPin, 
  Clock, Phone, MessageCircle, CheckCircle, AlertCircle, Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VolunteerMyTasks = () => {
  const { toast } = useToast();

  const [activeTasks] = useState([
    {
      id: 1,
      title: "Grocery Shopping for Mrs. Anderson",
      category: "shopping",
      senior: {
        name: "Margaret Anderson",
        avatar: "/placeholder.svg",
        age: 78,
        phone: "+1 (555) 123-4567"
      },
      description: "Weekly grocery shopping including fresh vegetables, medications pickup from pharmacy",
      scheduledDate: "Today",
      scheduledTime: "2:00 PM",
      estimatedDuration: "2 hours",
      distance: "1.2 km",
      urgency: "medium",
      address: "123 Oak Street, Apt 4B",
      specialInstructions: "Ring doorbell twice, Mrs. Anderson moves slowly. Pharmacy is next to grocery store.",
      status: "accepted"
    },
    {
      id: 2,
      title: "Medical Appointment Transport",
      category: "transportation",
      senior: {
        name: "Robert Chen",
        avatar: "/placeholder.svg",
        age: 82,
        phone: "+1 (555) 234-5678"
      },
      description: "Transportation to cardiology appointment at General Hospital",
      scheduledDate: "Tomorrow",
      scheduledTime: "10:30 AM",
      estimatedDuration: "3 hours",
      distance: "5.8 km",
      urgency: "high",
      address: "456 Maple Avenue",
      specialInstructions: "Appointment is at 11:00 AM. Mr. Chen uses a walker and needs extra time.",
      status: "in-progress"
    }
  ]);

  const [completedTasks] = useState([
    {
      id: 3,
      title: "Technology Help - Smart TV Setup",
      category: "tech",
      senior: {
        name: "Dorothy Williams",
        avatar: "/placeholder.svg",
        age: 75
      },
      completedDate: "2024-01-14",
      duration: "1.5 hours",
      rating: 5,
      feedback: "John was incredibly patient and helpful. My TV is working perfectly now!",
      status: "completed"
    },
    {
      id: 4,
      title: "Companionship Visit",
      category: "companionship",
      senior: {
        name: "Frank Rodriguez",
        avatar: "/placeholder.svg",
        age: 88
      },
      completedDate: "2024-01-12",
      duration: "2 hours",
      rating: 5,
      feedback: "Such a wonderful conversation! Thank you for bringing the photo albums.",
      status: "completed"
    },
    {
      id: 5,
      title: "Pharmacy Pickup",
      category: "shopping",
      senior: {
        name: "Helen Thompson",
        avatar: "/placeholder.svg",
        age: 69
      },
      completedDate: "2024-01-10",
      duration: "45 minutes",
      rating: 4,
      feedback: "Quick and efficient service. Very appreciative!",
      status: "completed"
    }
  ]);

  const [upcomingTasks] = useState([
    {
      id: 6,
      title: "Home Maintenance - Light Bulb Replacement",
      category: "maintenance",
      senior: {
        name: "Agnes Miller",
        avatar: "/placeholder.svg",
        age: 71,
        phone: "+1 (555) 345-6789"
      },
      description: "Replace light bulbs in kitchen and bathroom, check smoke detector batteries",
      scheduledDate: "Jan 18",
      scheduledTime: "9:00 AM",
      estimatedDuration: "1 hour",
      distance: "2.1 km",
      urgency: "low",
      address: "789 Pine Street",
      status: "scheduled"
    }
  ]);

  const getCategoryIcon = (category: string) => {
    const icons = {
      shopping: ShoppingCart,
      transportation: Car,
      medical: Heart,
      maintenance: Wrench,
      tech: Book,
      companionship: Users
    };
    const Icon = icons[category as keyof typeof icons] || Book;
    return <Icon className="w-4 h-4" />;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "low": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "high": return "bg-orange-500";
      case "urgent": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleStartTask = (taskId: number) => {
    toast({
      title: "Task Started",
      description: "You've started the task. The senior has been notified.",
    });
  };

  const handleCompleteTask = (taskId: number) => {
    toast({
      title: "Task Completed",
      description: "Great job! Please wait for the senior to provide feedback.",
    });
  };

  const handleContactSenior = (phone: string) => {
    toast({
      title: "Calling Senior",
      description: `Dialing ${phone}`,
    });
  };

  const handleMessage = (seniorName: string) => {
    toast({
      title: "Opening Chat",
      description: `Starting conversation with ${seniorName}`,
    });
  };

  return (
    <VolunteerLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Tasks</h1>
            <p className="text-muted-foreground">Manage your accepted tasks and view your history</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-blue-600">{activeTasks.length} Active</Badge>
            <Badge className="bg-green-600">{completedTasks.length} Completed</Badge>
          </div>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Tasks ({activeTasks.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingTasks.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeTasks.map((task) => (
              <Card key={task.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={task.senior.avatar} alt={task.senior.name} />
                        <AvatarFallback>{task.senior.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <Badge className={getUrgencyColor(task.urgency)}>
                            {task.urgency}
                          </Badge>
                          <Badge className={task.status === "in-progress" ? "bg-blue-600" : "bg-green-600"}>
                            {task.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            {getCategoryIcon(task.category)}
                            {task.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {task.scheduledDate} at {task.scheduledTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {task.estimatedDuration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {task.distance} away
                          </span>
                        </div>
                        <p className="text-sm mb-2">{task.description}</p>
                        <p className="text-xs text-muted-foreground">{task.address}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="bg-muted/30 p-3 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold mb-1">Special Instructions:</h4>
                    <p className="text-sm">{task.specialInstructions}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {task.status === "accepted" && (
                      <Button 
                        onClick={() => handleStartTask(task.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Start Task
                      </Button>
                    )}
                    
                    {task.status === "in-progress" && (
                      <Button 
                        onClick={() => handleCompleteTask(task.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleContactSenior(task.senior.phone)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call {task.senior.name}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleMessage(task.senior.name)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>

                    <Button variant="outline">
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingTasks.map((task) => (
              <Card key={task.id} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={task.senior.avatar} alt={task.senior.name} />
                        <AvatarFallback>{task.senior.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <Badge className={getUrgencyColor(task.urgency)}>
                            {task.urgency}
                          </Badge>
                          <Badge className="bg-green-600">scheduled</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            {getCategoryIcon(task.category)}
                            {task.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {task.scheduledDate} at {task.scheduledTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {task.estimatedDuration}
                          </span>
                        </div>
                        <p className="text-sm">{task.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedTasks.map((task) => (
              <Card key={task.id} className="border-l-4 border-l-gray-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={task.senior.avatar} alt={task.senior.name} />
                        <AvatarFallback>{task.senior.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <Badge className="bg-gray-600">completed</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            {getCategoryIcon(task.category)}
                            {task.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {task.completedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {task.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="flex">
                              {Array.from({ length: task.rating }).map((_, i) => (
                                <span key={i} className="text-yellow-500">⭐</span>
                              ))}
                            </div>
                            ({task.rating}/5)
                          </span>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                          <h4 className="text-sm font-semibold text-green-800 mb-1">Senior Feedback:</h4>
                          <p className="text-sm text-green-700">"{task.feedback}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerMyTasks;