import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Shield, 
  MapPin, 
  Clock, 
  Users, 
  Heart,
  Phone,
  Database,
  Bell
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-Time Matching",
      description: "Instant compatibility matching based on blood type, organ requirements, and location proximity.",
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: "Location-Based Priority",
      description: "Smart geolocation matching to connect nearby donors and recipients for faster response times.",
      color: "text-success"
    },
    {
      icon: Clock,
      title: "Emergency Alerts",
      description: "Critical urgency notifications with real-time status updates for life-threatening situations.",
      color: "text-urgent"
    },
    {
      icon: Shield,
      title: "Medical Verification",
      description: "Verified medical professional oversight with HIPAA-compliant secure data handling.",
      color: "text-primary"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Intelligent alert system for matches, updates, and critical status changes via multiple channels.",
      color: "text-warning"
    },
    {
      icon: Database,
      title: "Comprehensive Database",
      description: "Extensive donor and recipient profiles with medical history and availability tracking.",
      color: "text-success"
    }
  ];

  const urgencyLevels = [
    {
      level: "Critical",
      color: "bg-urgent",
      description: "Life-threatening emergency",
      response: "< 15 minutes"
    },
    {
      level: "High",
      color: "bg-warning",
      description: "Urgent medical need",
      response: "< 1 hour"
    },
    {
      level: "Standard",
      color: "bg-primary",
      description: "Scheduled procedure",
      response: "< 24 hours"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Life-Saving Technology at Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform uses cutting-edge matching algorithms and real-time communication 
            to connect donors and recipients when every second matters most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 border-border/50 hover:shadow-lg transition-all duration-300 group">
              <div className="mb-4">
                <div className="inline-flex p-3 rounded-lg bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Urgency Levels */}
        <div className="bg-secondary/30 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Emergency Response Levels</h3>
            <p className="text-muted-foreground">
              Our tiered system ensures the most critical cases receive immediate attention
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {urgencyLevels.map((level, index) => (
              <Card key={index} className="p-6 text-center border-border/50">
                <div className={`w-16 h-16 ${level.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{level.level} Priority</h4>
                <p className="text-sm text-muted-foreground mb-3">{level.description}</p>
                <div className="text-sm font-medium text-primary">
                  Response: {level.response}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="medical" size="lg">
              <Phone className="w-5 h-5 mr-2" />
              24/7 Emergency Hotline
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;