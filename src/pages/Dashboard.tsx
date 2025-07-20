import Header from "@/components/navigation/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  AlertTriangle,
  CheckCircle,
  User,
  Activity
} from "lucide-react";

const Dashboard = () => {
  // Mock data - would come from backend
  const userProfile = {
    name: "Dr. Sarah Johnson",
    type: "Hospital Administrator",
    location: "Boston Medical Center",
    verified: true
  };

  const matches = [
    {
      id: 1,
      donorName: "Anonymous Donor #1247",
      bloodType: "O-",
      organType: "Kidney",
      location: "Boston, MA",
      distance: "2.3 miles",
      urgency: "critical",
      timePosted: "15 minutes ago",
      status: "pending"
    },
    {
      id: 2,
      donorName: "Anonymous Donor #1589",
      bloodType: "A+",
      organType: "Liver",
      location: "Cambridge, MA",
      distance: "5.7 miles",
      urgency: "high",
      timePosted: "1 hour ago",
      status: "contacted"
    },
    {
      id: 3,
      donorName: "Anonymous Donor #1823",
      bloodType: "B+",
      organType: "Bone Marrow",
      location: "Somerville, MA",
      distance: "8.1 miles",
      urgency: "standard",
      timePosted: "3 hours ago",
      status: "matched"
    }
  ];

  const emergencyRequests = [
    {
      id: 1,
      patientId: "P-2024-001",
      bloodType: "AB-",
      organType: "Heart",
      urgency: "critical",
      timeRemaining: "4 hours",
      hospital: "Mass General Hospital"
    },
    {
      id: 2,
      patientId: "P-2024-002",
      bloodType: "O+",
      organType: "Kidney",
      urgency: "high",
      timeRemaining: "18 hours",
      hospital: "Brigham and Women's"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical": return "bg-urgent text-urgent-foreground";
      case "high": return "bg-warning text-warning-foreground";
      case "standard": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "matched": return "bg-success text-success-foreground";
      case "contacted": return "bg-warning text-warning-foreground";
      case "pending": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Medical Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor active matches and emergency requests in real-time
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Card className="p-3">
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-semibold">{userProfile.name}</div>
                  <div className="text-sm text-muted-foreground">{userProfile.type}</div>
                </div>
                {userProfile.verified && (
                  <CheckCircle className="w-5 h-5 text-success" />
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-urgent/10">
                <AlertTriangle className="w-6 h-6 text-urgent" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Emergency Cases</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Heart className="w-6 h-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">47</div>
                <div className="text-sm text-muted-foreground">Active Matches</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">Available Donors</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold">8 min</div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Requests */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <AlertTriangle className="w-5 h-5 text-urgent mr-2" />
                Emergency Requests
              </h2>
              <Button variant="urgent" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {emergencyRequests.map((request) => (
                <Card key={request.id} className="p-4 border-l-4 border-l-urgent">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-semibold">{request.patientId}</div>
                      <div className="text-sm text-muted-foreground">{request.hospital}</div>
                    </div>
                    <Badge className={getUrgencyColor(request.urgency)}>
                      {request.urgency.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Blood Type:</span>
                      <span className="ml-2 font-semibold">{request.bloodType}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Organ:</span>
                      <span className="ml-2 font-semibold">{request.organType}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-sm text-urgent">
                      <Clock className="w-4 h-4 mr-1" />
                      {request.timeRemaining} remaining
                    </div>
                    <Button variant="urgent" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Recent Matches */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <Heart className="w-5 h-5 text-success mr-2" />
                Recent Matches
              </h2>
              <Button variant="medical" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {matches.map((match) => (
                <Card key={match.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-semibold">{match.donorName}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {match.location} • {match.distance}
                      </div>
                    </div>
                    <Badge className={getStatusColor(match.status)}>
                      {match.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Blood Type:</span>
                      <span className="ml-2 font-semibold">{match.bloodType}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Organ:</span>
                      <span className="ml-2 font-semibold">{match.organType}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {match.timePosted}
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getUrgencyColor(match.urgency)} variant="outline">
                        {match.urgency}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="medical" className="h-16 flex-col">
              <Heart className="w-6 h-6 mb-1" />
              Find Donors
            </Button>
            <Button variant="urgent" className="h-16 flex-col">
              <AlertTriangle className="w-6 h-6 mb-1" />
              Emergency Alert
            </Button>
            <Button variant="success" className="h-16 flex-col">
              <Users className="w-6 h-6 mb-1" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Activity className="w-6 h-6 mb-1" />
              View Reports
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;