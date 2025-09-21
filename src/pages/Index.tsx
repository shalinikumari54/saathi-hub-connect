import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, MapPin, Star, Shield, Phone } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Senior Saathi</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setShowLogin(true)}>
              Login
            </Button>
            <Button onClick={() => setShowSignup(true)}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Connecting <span className="text-primary">Seniors</span> with <span className="text-primary">Volunteers</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A compassionate platform that brings together seniors who need assistance and volunteers ready to help, creating meaningful connections in our community.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={() => setShowSignup(true)}>
              Join as Volunteer
            </Button>
            <Button variant="outline" size="lg" onClick={() => setShowSignup(true)}>
              Get Help as Senior
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">How Senior Saathi Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>For Seniors</CardTitle>
                <CardDescription>Request help with daily tasks, events, and emergencies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Request assistance for daily tasks</li>
                  <li>• Schedule events and gatherings</li>
                  <li>• Emergency support system</li>
                  <li>• Real-time volunteer tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4" />
                <CardTitle>For Volunteers</CardTitle>
                <CardDescription>Help seniors in your community and earn rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Find tasks based on your skills</li>
                  <li>• Earn points and badges</li>
                  <li>• Real-time chat with seniors</li>
                  <li>• Safety tracking features</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Safety First</CardTitle>
                <CardDescription>Verified volunteers and secure communication</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Background verified volunteers</li>
                  <li>• Real-time location tracking</li>
                  <li>• Emergency alert system</li>
                  <li>• Secure in-app communication</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">1,200+</div>
              <div className="text-muted-foreground">Active Seniors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">2,500+</div>
              <div className="text-muted-foreground">Volunteers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">15,000+</div>
              <div className="text-muted-foreground">Tasks Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">4.9</div>
              <div className="text-muted-foreground flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">Ready to Make a Difference?</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of volunteers helping seniors in their community
          </p>
          <Button size="lg" onClick={() => setShowSignup(true)}>
            Start Helping Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-semibold">Senior Saathi</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© 2024 Senior Saathi. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>Emergency: 911</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
      <SignupModal open={showSignup} onOpenChange={setShowSignup} />
    </div>
  );
};

export default Index;
