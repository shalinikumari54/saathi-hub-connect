import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  Star, 
  Edit, 
  X, 
  Eye,
  MessageSquare,
  Phone
} from "lucide-react";
import SeniorLayout from "@/components/layout/SeniorLayout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const SeniorMyTasks = () => {
  const [tasks] = useState([
    {
      id: 1,
      title: "Weekly Grocery Shopping",
      description: "Need help with weekly grocery shopping including heavy items like milk, flour, and household supplies.",
      category: "Groceries",
      status: "in-progress",
      urgency: "normal",
      volunteer: "John Doe",
      volunteerRating: 4.9,
      dateCreated: "2024-01-15",
      timeWindow: "2 hours",
      location: "Downtown Market",
      progress: 60,
      estimatedCompletion: "30 mins remaining",
      contactPhone: "+1-555-0123"
    },
    {
      id: 2,
      title: "Doctor Appointment Transport",
      description: "Need transportation to my cardiologist appointment. Appointment is at 2:30 PM, need to arrive 15 minutes early.",
      category: "Transportation",
      status: "assigned",
      urgency: "urgent",
      volunteer: "Sarah Wilson",
      volunteerRating: 4.8,
      dateCreated: "2024-01-18",
      timeWindow: "4 hours",
      location: "City Medical Center",
      progress: 0,
      estimatedCompletion: "Tomorrow 2:00 PM",
      contactPhone: "+1-555-0198"
    },
    {
      id: 3,
      title: "Technology Help - Smart TV Setup",
      description: "Recently purchased a smart TV and need help setting it up, connecting to WiFi, and installing streaming apps.",
      category: "Technology",
      status: "completed",
      urgency: "normal",
      volunteer: "Mike Chen",
      volunteerRating: 5.0,
      dateCreated: "2024-01-10",
      timeWindow: "2 hours",
      location: "My Home",
      progress: 100,
      estimatedCompletion: "Completed on Jan 12",
      contactPhone: "+1-555-0167",
      completedDate: "Jan 12, 2024",
      rating: 5,
      feedback: "Mike was excellent! Very patient and explained everything clearly."
    },
    {
      id: 4,
      title: "Home Cleaning Assistance",
      description: "Need help with deep cleaning of living room and kitchen. Includes dusting, mopping, and organizing.",
      category: "Household",
      status: "pending",
      urgency: "normal",
      volunteer: null,
      dateCreated: "2024-01-20",
      timeWindow: "Same day",
      location: "My Home",
      progress: 0,
      estimatedCompletion: "Awaiting volunteer assignment"
    }
  ]);

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success";
      case "in-progress": return "bg-primary";
      case "assigned": return "bg-warning";
      case "pending": return "bg-muted";
      default: return "bg-muted";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency": return "bg-destructive";
      case "urgent": return "bg-warning";
      case "normal": return "bg-success";
      default: return "bg-muted";
    }
  };

  const handleRateVolunteer = (taskId: number) => {
    console.log(`Rating task ${taskId} with ${rating} stars: ${feedback}`);
    // Here you would typically send the rating to your backend
    setRating(0);
    setFeedback("");
  };

  return (
    <SeniorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
            <p className="text-muted-foreground">Track your help requests and volunteer assignments</p>
          </div>
          <Button size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Request New Help
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">In progress or assigned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21</div>
              <p className="text-xs text-muted-foreground">Successfully finished</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Given to volunteers</p>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="shadow-elegant">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <Badge variant="outline" className={getUrgencyColor(task.urgency)}>
                        {task.urgency}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {task.description}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status.replace('-', ' ')}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Task Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Created: {task.dateCreated}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Duration: {task.timeWindow}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{task.location}</span>
                  </div>
                </div>

                {/* Volunteer Info */}
                {task.volunteer && (
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <User className="h-8 w-8 p-1 bg-primary text-primary-foreground rounded-full" />
                      <div>
                        <p className="font-medium">{task.volunteer}</p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-warning fill-current" />
                          <span className="text-xs">{task.volunteerRating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                )}

                {/* Progress Bar for Active Tasks */}
                {task.status === "in-progress" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="w-full" />
                    <p className="text-xs text-muted-foreground">{task.estimatedCompletion}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{task.title}</DialogTitle>
                          <DialogDescription>Complete task information</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Category:</span> {task.category}
                            </div>
                            <div>
                              <span className="font-medium">Status:</span> {task.status}
                            </div>
                            <div>
                              <span className="font-medium">Created:</span> {task.dateCreated}
                            </div>
                            <div>
                              <span className="font-medium">Duration:</span> {task.timeWindow}
                            </div>
                          </div>
                          {task.contactPhone && (
                            <div>
                              <span className="font-medium">Contact:</span> {task.contactPhone}
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {task.status === "pending" && (
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Request
                      </Button>
                    )}

                    {task.status !== "completed" && (
                      <Button variant="destructive" size="sm">
                        <X className="h-4 w-4 mr-1" />
                        Cancel Task
                      </Button>
                    )}
                  </div>

                  {/* Rating Section for Completed Tasks */}
                  {task.status === "completed" && !task.rating && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Star className="h-4 w-4 mr-1" />
                          Rate Volunteer
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Rate Your Experience</DialogTitle>
                          <DialogDescription>
                            How was your experience with {task.volunteer}?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Rating</label>
                            <div className="flex space-x-1 mt-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-6 w-6 cursor-pointer ${
                                    star <= rating ? "text-warning fill-current" : "text-muted-foreground"
                                  }`}
                                  onClick={() => setRating(star)}
                                />
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Feedback (Optional)</label>
                            <Textarea
                              placeholder="Share your experience to help other seniors..."
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              className="mt-2"
                            />
                          </div>
                          <Button onClick={() => handleRateVolunteer(task.id)} disabled={rating === 0}>
                            Submit Rating
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {task.rating && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span>Rated:</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= task.rating! ? "text-warning fill-current" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Completed Task Feedback */}
                {task.status === "completed" && task.feedback && (
                  <div className="p-3 bg-muted rounded-lg">
                    <h5 className="text-sm font-medium mb-1">Your Feedback:</h5>
                    <p className="text-sm text-muted-foreground">{task.feedback}</p>
                    <p className="text-xs text-muted-foreground mt-1">Completed on {task.completedDate}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Tasks Yet</h3>
              <p className="text-muted-foreground mb-4">You haven't requested any help yet.</p>
              <Button>Request Your First Task</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </SeniorLayout>
  );
};

export default SeniorMyTasks;