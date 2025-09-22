import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  AlertTriangle, 
  Upload,
  Phone,
  DollarSign,
  Heart
} from "lucide-react";
import SeniorLayout from "@/components/layout/SeniorLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const SeniorRequestHelp = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    volunteersNeeded: "1",
    timeWindow: "",
    customDateTime: "",
    duration: "",
    address: "",
    urgency: "normal",
    contactPhone: "",
    emergencyContact: "",
    acceptDonations: false,
    donationType: "",
    attachments: []
  });

  const categories = [
    { value: "groceries", label: "Grocery Shopping", icon: "🛒" },
    { value: "transport", label: "Transportation", icon: "🚗" },
    { value: "medical", label: "Medical Assistance", icon: "🏥" },
    { value: "household", label: "Household Tasks", icon: "🏠" },
    { value: "technology", label: "Technology Help", icon: "💻" },
    { value: "companionship", label: "Companionship", icon: "👥" },
    { value: "emergency", label: "Emergency", icon: "🚨" },
    { value: "other", label: "Other", icon: "📝" }
  ];

  const timeWindows = [
    { value: "2hours", label: "Within 2 hours", urgency: "urgent" },
    { value: "4hours", label: "Within 4 hours", urgency: "normal" },
    { value: "sameday", label: "Same day", urgency: "normal" },
    { value: "1day", label: "Within 1 day", urgency: "normal" },
    { value: "flexible", label: "Flexible timing", urgency: "normal" },
    { value: "custom", label: "Custom date/time", urgency: "normal" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the request to your backend
    console.log("Submitting help request:", formData);
    
    toast({
      title: "Help Request Submitted!",
      description: "We're finding the perfect volunteer for you. You'll be notified when someone accepts your request.",
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      volunteersNeeded: "1",
      timeWindow: "",
      customDateTime: "",
      duration: "",
      address: "",
      urgency: "normal",
      contactPhone: "",
      emergencyContact: "",
      acceptDonations: false,
      donationType: "",
      attachments: []
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <SeniorLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Request Help</h1>
          <p className="text-muted-foreground">
            Tell us what you need help with, and we'll connect you with a caring volunteer in your area.
          </p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {categories.slice(0, 4).map((category) => (
            <Card 
              key={category.value} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.category === category.value ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleInputChange('category', category.value)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{category.icon}</div>
                <p className="text-sm font-medium">{category.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>
                Help us understand what kind of assistance you need.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Request Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Weekly grocery shopping assistance"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Keep it short and clear - this is what volunteers will see first.
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe exactly what help you need. Include any specific requirements, preferences, or important details that would help a volunteer understand your request better."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  The more details you provide, the better we can match you with the right volunteer.
                </p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type of help you need" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <span className="flex items-center space-x-2">
                          <span>{category.icon}</span>
                          <span>{category.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Volunteer Requirements</span>
              </CardTitle>
              <CardDescription>
                Specify how many volunteers you need and when you need help.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Number of Volunteers */}
              <div className="space-y-2">
                <Label>Number of Volunteers Needed</Label>
                <Select value={formData.volunteersNeeded} onValueChange={(value) => handleInputChange('volunteersNeeded', value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 volunteer</SelectItem>
                    <SelectItem value="2">2 volunteers</SelectItem>
                    <SelectItem value="3">3 volunteers</SelectItem>
                    <SelectItem value="4">4+ volunteers</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Most tasks only need 1 volunteer. Choose more for tasks that require multiple people.
                </p>
              </div>

              {/* Time Window */}
              <div className="space-y-2">
                <Label>When do you need help? *</Label>
                <RadioGroup 
                  value={formData.timeWindow} 
                  onValueChange={(value) => handleInputChange('timeWindow', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  {timeWindows.map((window) => (
                    <div key={window.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={window.value} id={window.value} />
                      <Label htmlFor={window.value} className="text-sm">
                        {window.label}
                        {window.urgency === 'urgent' && (
                          <Badge variant="destructive" className="ml-2 text-xs">Urgent</Badge>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Custom Date/Time */}
              {formData.timeWindow === 'custom' && (
                <div className="space-y-2">
                  <Label htmlFor="customDateTime">Preferred Date & Time</Label>
                  <Input
                    id="customDateTime"
                    type="datetime-local"
                    value={formData.customDateTime}
                    onChange={(e) => handleInputChange('customDateTime', e.target.value)}
                  />
                </div>
              )}

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration">Estimated Duration</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How long do you think this will take?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="2hours">2 hours</SelectItem>
                    <SelectItem value="halfday">Half day (4 hours)</SelectItem>
                    <SelectItem value="fullday">Full day (8 hours)</SelectItem>
                    <SelectItem value="unsure">Not sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Location & Contact</span>
              </CardTitle>
              <CardDescription>
                Help volunteers find you and stay in touch.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address or Location *</Label>
                <Input
                  id="address"
                  placeholder="Enter your address or the location where help is needed"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  We only share your general area with volunteers until they accept your request.
                </p>
              </div>

              {/* Contact Phone */}
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone Number *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+1-555-123-4567"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  This will be shared with your assigned volunteer for coordination.
                </p>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact (Optional)</Label>
                <Input
                  id="emergencyContact"
                  type="tel"
                  placeholder="+1-555-987-6543"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  A backup contact in case we can't reach you directly.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Additional Options</span>
              </CardTitle>
              <CardDescription>
                Extra preferences and options for your request.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Urgency */}
              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <RadioGroup 
                  value={formData.urgency} 
                  onValueChange={(value) => handleInputChange('urgency', value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent">Urgent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emergency" id="emergency" />
                    <Label htmlFor="emergency">Emergency</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Donations */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptDonations"
                    checked={formData.acceptDonations}
                    onCheckedChange={(checked) => handleInputChange('acceptDonations', checked)}
                  />
                  <Label htmlFor="acceptDonations" className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>I would also appreciate donations for this request</span>
                  </Label>
                </div>
                
                {formData.acceptDonations && (
                  <div className="ml-6 space-y-2">
                    <Label>What kind of donations would help?</Label>
                    <RadioGroup 
                      value={formData.donationType} 
                      onValueChange={(value) => handleInputChange('donationType', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="money" id="money" />
                        <Label htmlFor="money">Financial assistance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="items" id="items" />
                        <Label htmlFor="items">Specific items (groceries, supplies, etc.)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">Both money and items</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label>Attachments (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload photos or documents that might help explain your request
                  </p>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported: JPG, PNG, PDF, DOC (Max 5MB each)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex space-x-4">
            <Button type="submit" size="lg" className="flex-1">
              <Heart className="h-4 w-4 mr-2" />
              Submit Help Request
            </Button>
            <Button type="button" variant="outline" size="lg">
              Save as Draft
            </Button>
          </div>

          {/* Help Text */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">💡 Tips for a Great Request:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Be specific about what you need - volunteers appreciate clear instructions</li>
                <li>• Include any physical requirements (lifting, stairs, etc.)</li>
                <li>• Mention if you need someone with specific skills or experience</li>
                <li>• Let us know about any accessibility needs or special considerations</li>
                <li>• Be realistic about timing - allow extra time for complex tasks</li>
              </ul>
            </CardContent>
          </Card>
        </form>
      </div>
    </SeniorLayout>
  );
};

export default SeniorRequestHelp;