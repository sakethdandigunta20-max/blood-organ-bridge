import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Clock, MapPin, Zap } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

const Hero = () => {
  const stats = [
    { icon: Users, label: "Active Donors", value: "15,000+" },
    { icon: Heart, label: "Lives Saved", value: "3,200+" },
    { icon: Clock, label: "Avg Response Time", value: "12 min" },
    { icon: MapPin, label: "Cities Covered", value: "250+" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-primary/5">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Medical background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-urgent/10 border border-urgent/20">
                <Zap className="w-4 h-4 text-urgent mr-2" />
                <span className="text-sm font-medium text-urgent">
                  Emergency Matching Available 24/7
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Connecting{" "}
                <span className="text-primary">Life-Savers</span> with{" "}
                <span className="text-urgent">Life-Seekers</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Real-time matching platform for blood and organ donations. 
                Every second counts when lives are at stake. Join our network 
                of heroes making the ultimate difference.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg">
                <Heart className="w-5 h-5 mr-2" />
                Become a Donor
              </Button>
              <Button variant="urgent" size="lg" className="text-lg">
                <Clock className="w-5 h-5 mr-2" />
                Emergency Request
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              ✓ Verified medical professionals &nbsp;&nbsp;
              ✓ HIPAA compliant &nbsp;&nbsp;
              ✓ 24/7 emergency support
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 bg-card/80 backdrop-blur border-border/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;