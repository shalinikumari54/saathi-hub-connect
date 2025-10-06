import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminDonations = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Donations</h1>
            <p className="text-muted-foreground">Track and manage all donations</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Record Donation
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Input placeholder="Search donations..." className="w-full" />
          </div>
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">$45,231</CardTitle>
              <CardDescription>Total Donations</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">$8,456</CardTitle>
              <CardDescription>This Month</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">156</CardTitle>
              <CardDescription>Total Donors</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">23</CardTitle>
              <CardDescription>Active Campaigns</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Latest donation transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { donor: "Anonymous", amount: 500, date: "Today" },
                { donor: "John Smith", amount: 250, date: "Yesterday" },
                { donor: "Sarah Johnson", amount: 1000, date: "2 days ago" },
                { donor: "Mike Brown", amount: 150, date: "3 days ago" },
                { donor: "Lisa Davis", amount: 300, date: "4 days ago" },
              ].map((donation, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{donation.donor}</p>
                      <p className="text-sm text-muted-foreground">{donation.date}</p>
                    </div>
                  </div>
                  <Badge>${donation.amount}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDonations;
