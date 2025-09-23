import { useState } from "react";
import SeniorLayout from "@/components/layout/SeniorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, Bell, Shield, MapPin, Phone, Mail, Camera,
  Edit, Save, Lock, Eye, EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SeniorSettings = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "Margaret Wilson",
    email: "margaret.wilson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Maple Street, Springfield, IL 62701",
    bio: "Retired teacher who enjoys reading, gardening, and spending time with family. Looking for friendly volunteers to help with occasional errands and companionship.",
    emergencyContact: "Jane Wilson - Daughter",
    emergencyPhone: "+1 (555) 987-6543",
    medicalInfo: "Diabetes Type 2, High Blood Pressure",
    avatar: "/placeholder.svg"
  });

  const [notifications, setNotifications] = useState({
    taskUpdates: true,
    volunteerMessages: true,
    emergencyAlerts: true,
    donationUpdates: true,
    eventReminders: true,
    weeklyDigest: false,
    smsNotifications: true,
    emailNotifications: true
  });

  const [privacy, setPrivacy] = useState({
    shareLocation: true,
    showProfile: true,
    allowDirectContact: true,
    dataCollection: false,
    marketingEmails: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved",
    });
  };

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Request",
      description: "A confirmation email has been sent to you",
      variant: "destructive"
    });
  };

  return (
    <SeniorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <p className="text-muted-foreground">
                  Update your personal information and emergency contacts
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold">Full Name</label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Email Address</label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Phone Number</label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Language</label>
                    <Select defaultValue="english">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold">Home Address</label>
                  <Input
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">About Me</label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={4}
                    placeholder="Tell volunteers a bit about yourself and your interests..."
                  />
                </div>

                <Separator />

                {/* Emergency Contacts */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold">Emergency Contact Name</label>
                      <Input
                        value={profile.emergencyContact}
                        onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Emergency Contact Phone</label>
                      <Input
                        value={profile.emergencyPhone}
                        onChange={(e) => setProfile({...profile, emergencyPhone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold">Medical Information (Optional)</label>
                  <Textarea
                    value={profile.medicalInfo}
                    onChange={(e) => setProfile({...profile, medicalInfo: e.target.value})}
                    rows={3}
                    placeholder="Any important medical information volunteers should know..."
                  />
                </div>

                <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <p className="text-muted-foreground">
                  Choose how you want to be notified about activity
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Task Updates</p>
                        <p className="text-sm text-muted-foreground">When volunteers accept or update your tasks</p>
                      </div>
                      <Switch
                        checked={notifications.taskUpdates}
                        onCheckedChange={(checked) => setNotifications({...notifications, taskUpdates: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Volunteer Messages</p>
                        <p className="text-sm text-muted-foreground">New messages from your volunteers</p>
                      </div>
                      <Switch
                        checked={notifications.volunteerMessages}
                        onCheckedChange={(checked) => setNotifications({...notifications, volunteerMessages: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Emergency Alerts</p>
                        <p className="text-sm text-muted-foreground">Critical safety and emergency notifications</p>
                      </div>
                      <Switch
                        checked={notifications.emergencyAlerts}
                        onCheckedChange={(checked) => setNotifications({...notifications, emergencyAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Donation Updates</p>
                        <p className="text-sm text-muted-foreground">Updates on your donation requests</p>
                      </div>
                      <Switch
                        checked={notifications.donationUpdates}
                        onCheckedChange={(checked) => setNotifications({...notifications, donationUpdates: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Event Reminders</p>
                        <p className="text-sm text-muted-foreground">Reminders about upcoming events</p>
                      </div>
                      <Switch
                        checked={notifications.eventReminders}
                        onCheckedChange={(checked) => setNotifications({...notifications, eventReminders: checked})}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Delivery Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Weekly Digest</p>
                        <p className="text-sm text-muted-foreground">Weekly summary of your activity</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => setNotifications({...notifications, weeklyDigest: checked})}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveNotifications} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Security Tab */}
          <TabsContent value="privacy">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Share Location</p>
                      <p className="text-sm text-muted-foreground">Allow volunteers to see your location for tasks</p>
                    </div>
                    <Switch
                      checked={privacy.shareLocation}
                      onCheckedChange={(checked) => setPrivacy({...privacy, shareLocation: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Profile</p>
                      <p className="text-sm text-muted-foreground">Make your profile visible to volunteers</p>
                    </div>
                    <Switch
                      checked={privacy.showProfile}
                      onCheckedChange={(checked) => setPrivacy({...privacy, showProfile: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow Direct Contact</p>
                      <p className="text-sm text-muted-foreground">Let volunteers contact you directly</p>
                    </div>
                    <Switch
                      checked={privacy.allowDirectContact}
                      onCheckedChange={(checked) => setPrivacy({...privacy, allowDirectContact: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Collection</p>
                      <p className="text-sm text-muted-foreground">Allow collection of usage data for improvement</p>
                    </div>
                    <Switch
                      checked={privacy.dataCollection}
                      onCheckedChange={(checked) => setPrivacy({...privacy, dataCollection: checked})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Change Password</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="New password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button className="mt-2" variant="outline">
                      Update Password
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleSavePrivacy} className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Save Privacy Settings
              </Button>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold">Account Type</label>
                      <p className="text-muted-foreground">Senior User</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Member Since</label>
                      <p className="text-muted-foreground">January 2024</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Account Status</label>
                      <p className="text-success">Verified</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Tasks Completed</label>
                      <p className="text-muted-foreground">23</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Export</CardTitle>
                  <p className="text-muted-foreground">
                    Download a copy of your personal data
                  </p>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">
                    Request Data Export
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-red-500">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <p className="text-muted-foreground">
                    These actions cannot be undone
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Deactivate Account</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Temporarily disable your account. You can reactivate it anytime.
                    </p>
                    <Button variant="outline">
                      Deactivate Account
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold mb-2">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete your account and all associated data. This action cannot be reversed.
                    </p>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SeniorLayout>
  );
};

export default SeniorSettings;