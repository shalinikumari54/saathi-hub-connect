import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download } from "lucide-react";

const AdminAnalytics = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Platform performance and insights</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">1,234</CardTitle>
              <CardDescription>Total Users</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">87%</CardTitle>
              <CardDescription>Platform Satisfaction</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">456</CardTitle>
              <CardDescription>Monthly Active Users</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">+23%</CardTitle>
              <CardDescription>Growth This Month</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Task Performance</CardTitle>
              <CardDescription>Task completion metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completion Rate</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Time</span>
                  <span className="font-medium">2.3 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tasks This Month</span>
                  <span className="font-medium">324</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-medium">95%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volunteer Metrics</CardTitle>
              <CardDescription>Volunteer engagement statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Volunteers</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg Hours/Month</span>
                  <span className="font-medium">12.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Retention Rate</span>
                  <span className="font-medium">88%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg Rating</span>
                  <span className="font-medium">4.7/5</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Senior Engagement</CardTitle>
              <CardDescription>Senior activity and satisfaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Seniors</span>
                  <span className="font-medium">243</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Satisfaction Score</span>
                  <span className="font-medium">4.8/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg Tasks/Month</span>
                  <span className="font-medium">5.2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Return Rate</span>
                  <span className="font-medium">91%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Donation and funding metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Donations</span>
                  <span className="font-medium">$45,231</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="font-medium">$8,456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Donors</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg Donation</span>
                  <span className="font-medium">$54</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Platform Growth
            </CardTitle>
            <CardDescription>Monthly growth trends and projections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">The platform has shown consistent growth with a 23% increase in active users this month. Volunteer retention remains strong at 88%, and senior satisfaction scores continue to improve.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
