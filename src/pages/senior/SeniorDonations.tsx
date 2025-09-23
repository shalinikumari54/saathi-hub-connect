import { useState } from "react";
import SeniorLayout from "@/components/layout/SeniorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gift, DollarSign, Package, Heart, Clock, CheckCircle,
  AlertCircle, User, MessageCircle, Upload, Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SeniorDonations = () => {
  const { toast } = useToast();
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    type: "",
    amount: "",
    category: "",
    urgency: ""
  });

  const [donationRequests] = useState([
    {
      id: 1,
      title: "Winter Clothing Assistance",
      description: "Need warm winter clothes including coat, boots, and gloves for the upcoming cold season",
      type: "items",
      category: "clothing",
      amount: null,
      items: ["Winter Coat (Size L)", "Waterproof Boots (Size 9)", "Warm Gloves", "Wool Scarf"],
      status: "approved",
      urgency: "medium",
      requested: "2024-01-10",
      donors: 3,
      raised: null,
      messages: 2
    },
    {
      id: 2,
      title: "Medical Equipment Support",
      description: "Requesting assistance for purchasing a blood pressure monitor for daily health monitoring",
      type: "money",
      category: "medical",
      amount: 150,
      target: 150,
      status: "active",
      urgency: "high",
      requested: "2024-01-12",
      donors: 5,
      raised: 120,
      messages: 8
    },
    {
      id: 3,
      title: "Grocery Assistance",
      description: "Monthly grocery support for essential food items and household supplies",
      type: "money",
      category: "food",
      amount: 200,
      target: 200,
      status: "completed",
      urgency: "medium",
      requested: "2024-01-05",
      donors: 7,
      raised: 200,
      messages: 12
    }
  ]);

  const [donations] = useState([
    {
      id: 1,
      donorName: "Anonymous Donor",
      amount: 50,
      type: "money",
      message: "Hope this helps with your medical needs. Stay healthy!",
      date: "2024-01-15",
      requestId: 2
    },
    {
      id: 2,
      donorName: "Jennifer Smith",
      items: ["Winter Coat", "Boots"],
      type: "items",
      message: "I had these items and thought they might help. They're in great condition!",
      date: "2024-01-14",
      requestId: 1
    },
    {
      id: 3,
      donorName: "Community Church",
      amount: 100,
      type: "money",
      message: "From our community assistance fund. God bless!",
      date: "2024-01-13",
      requestId: 3
    }
  ]);

  const handleSubmitRequest = () => {
    if (!newRequest.title || !newRequest.description || !newRequest.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Request Submitted",
      description: "Your donation request has been submitted for admin approval",
    });

    setNewRequest({
      title: "",
      description: "",
      type: "",
      amount: "",
      category: "",
      urgency: ""
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success";
      case "active": return "bg-primary";
      case "completed": return "bg-success";
      case "pending": return "bg-warning";
      case "rejected": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-destructive";
      case "medium": return "bg-warning";
      case "low": return "bg-success";
      default: return "bg-muted";
    }
  };

  return (
    <SeniorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Donations & Support</h1>
            <p className="text-muted-foreground">Request and manage donations from the community</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <p className="text-sm text-muted-foreground">Active Requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">$470</div>
              <p className="text-sm text-muted-foreground">Total Received</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">15</div>
              <p className="text-sm text-muted-foreground">Kind Donors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">1</div>
              <p className="text-sm text-muted-foreground">Completed Goals</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="donations">Received Donations</TabsTrigger>
            <TabsTrigger value="new-request">New Request</TabsTrigger>
          </TabsList>

          {/* My Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            {donationRequests.map((request) => (
              <Card key={request.id} className="border-l-4" style={{ borderLeftColor: 'hsl(var(--primary))' }}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{request.title}</CardTitle>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency} priority
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{request.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      {request.type === "money" ? (
                        <DollarSign className="w-4 h-4 text-primary" />
                      ) : (
                        <Package className="w-4 h-4 text-primary" />
                      )}
                      <span className="text-sm">Type: {request.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm">Requested: {request.requested}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-sm">{request.donors} donors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">{request.messages} messages</span>
                    </div>
                  </div>

                  {/* Progress for money requests */}
                  {request.type === "money" && request.target && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold">Progress</span>
                        <span className="text-sm">${request.raised} / ${request.target}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(request.raised! / request.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Items list for item requests */}
                  {request.type === "items" && request.items && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Requested Items</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {request.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Package className="w-3 h-3 text-primary" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      View Messages
                    </Button>
                    <Button variant="outline">
                      <User className="w-4 h-4 mr-2" />
                      Thank Donors
                    </Button>
                    {request.status === "completed" && (
                      <Button className="bg-success hover:bg-success/90">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Received Donations Tab */}
          <TabsContent value="donations" className="space-y-4">
            {donations.map((donation) => (
              <Card key={donation.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {donation.type === "money" ? (
                        <DollarSign className="w-8 h-8 text-success" />
                      ) : (
                        <Gift className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{donation.donorName}</h3>
                        <Badge variant="outline">{donation.type}</Badge>
                      </div>
                      
                      {donation.amount && (
                        <p className="text-lg font-bold text-success mb-2">
                          ${donation.amount}
                        </p>
                      )}
                      
                      {donation.items && (
                        <div className="mb-2">
                          <p className="text-sm font-semibold">Items donated:</p>
                          <p className="text-sm">{donation.items.join(", ")}</p>
                        </div>
                      )}
                      
                      <p className="text-muted-foreground text-sm mb-2">
                        "{donation.message}"
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{donation.date}</p>
                        <Button size="sm" variant="outline">
                          <Heart className="w-4 h-4 mr-2" />
                          Send Thank You
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* New Request Tab */}
          <TabsContent value="new-request">
            <Card>
              <CardHeader>
                <CardTitle>Create New Donation Request</CardTitle>
                <p className="text-muted-foreground">
                  Submit a request for financial assistance or specific items you need
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold">Request Title *</label>
                  <Input
                    placeholder="Brief title for your request"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Description *</label>
                  <Textarea
                    placeholder="Explain what you need and why it would help you..."
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold">Request Type *</label>
                    <Select value={newRequest.type} onValueChange={(value) => setNewRequest({...newRequest, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="money">Financial Assistance</SelectItem>
                        <SelectItem value="items">Specific Items</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Category</label>
                    <Select value={newRequest.category} onValueChange={(value) => setNewRequest({...newRequest, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="food">Food & Groceries</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="household">Household Items</SelectItem>
                        <SelectItem value="transportation">Transportation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {newRequest.type === "money" && (
                    <div>
                      <label className="text-sm font-semibold">Amount Needed ($)</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={newRequest.amount}
                        onChange={(e) => setNewRequest({...newRequest, amount: e.target.value})}
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-semibold">Urgency Level</label>
                    <Select value={newRequest.urgency} onValueChange={(value) => setNewRequest({...newRequest, urgency: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Can wait</SelectItem>
                        <SelectItem value="medium">Medium - Within a month</SelectItem>
                        <SelectItem value="high">High - Urgent need</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold">Attachments (Optional)</label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload photos or documents that support your request
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSubmitRequest} className="bg-primary hover:bg-primary/90">
                    Submit Request
                  </Button>
                  <Button variant="outline">
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SeniorLayout>
  );
};

export default SeniorDonations;