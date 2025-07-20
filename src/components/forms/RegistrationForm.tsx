import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, User, MapPin, Phone, Calendar, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegistrationForm = () => {
  const [userType, setUserType] = useState<"donor" | "recipient" | "">("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    bloodType: "",
    location: "",
    medicalHistory: "",
    emergencyContact: "",
    urgencyLevel: "",
    organType: "",
  });

  const { toast } = useToast();

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const organTypes = ["Kidney", "Liver", "Heart", "Lung", "Pancreas", "Cornea", "Bone Marrow"];
  const urgencyLevels = [
    { value: "critical", label: "Critical (Life-threatening)", color: "text-urgent" },
    { value: "high", label: "High (Urgent)", color: "text-warning" },
    { value: "standard", label: "Standard (Scheduled)", color: "text-primary" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!userType || !formData.name || !formData.email || !formData.bloodType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Submitted",
      description: `Thank you for registering as a ${userType}. You'll receive confirmation shortly.`,
    });
    
    console.log("Form submitted:", { userType, ...formData });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-8">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-urgent mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Join the LifeMatch Network</h2>
          <p className="text-muted-foreground">
            Register as a donor or recipient to start saving lives today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">I want to register as:</Label>
            <RadioGroup value={userType} onValueChange={(value: "donor" | "recipient") => setUserType(value)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className={`p-4 cursor-pointer transition-all ${userType === "donor" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                  <RadioGroupItem value="donor" id="donor" className="sr-only" />
                  <Label htmlFor="donor" className="flex items-center space-x-3 cursor-pointer">
                    <Heart className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold">Donor</div>
                      <div className="text-sm text-muted-foreground">I want to donate blood/organs</div>
                    </div>
                  </Label>
                </Card>
                
                <Card className={`p-4 cursor-pointer transition-all ${userType === "recipient" ? "border-urgent bg-urgent/5" : "border-border hover:border-urgent/50"}`}>
                  <RadioGroupItem value="recipient" id="recipient" className="sr-only" />
                  <Label htmlFor="recipient" className="flex items-center space-x-3 cursor-pointer">
                    <User className="w-6 h-6 text-urgent" />
                    <div>
                      <div className="font-semibold">Recipient</div>
                      <div className="text-sm text-muted-foreground">I need blood/organ donation</div>
                    </div>
                  </Label>
                </Card>
              </div>
            </RadioGroup>
          </div>

          {userType && (
            <>
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      placeholder="Your age"
                      min="18"
                      max="80"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Medical Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bloodType">Blood Type *</Label>
                    <Select value={formData.bloodType} onValueChange={(value) => handleInputChange("bloodType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="organType">
                      {userType === "donor" ? "Organ Willing to Donate" : "Organ Needed"}
                    </Label>
                    <Select value={formData.organType} onValueChange={(value) => handleInputChange("organType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select organ type" />
                      </SelectTrigger>
                      <SelectContent>
                        {organTypes.map((organ) => (
                          <SelectItem key={organ} value={organ}>{organ}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {userType === "recipient" && (
                  <div>
                    <Label htmlFor="urgencyLevel">Urgency Level *</Label>
                    <Select value={formData.urgencyLevel} onValueChange={(value) => handleInputChange("urgencyLevel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <span className={level.color}>{level.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location Information
                </h3>
                
                <div>
                  <Label htmlFor="location">Location (City, State) *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter your city and state"
                    required
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="medicalHistory">Medical History & Notes</Label>
                  <Textarea
                    id="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                    placeholder="Any relevant medical history, allergies, or special notes..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    placeholder="Name and phone number of emergency contact"
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the Terms of Service and Privacy Policy. I understand that my information 
                    will be shared with verified medical professionals for matching purposes.
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="emergency" />
                  <Label htmlFor="emergency" className="text-sm leading-relaxed">
                    I consent to being contacted for emergency situations and understand the importance 
                    of timely response in life-threatening cases.
                  </Label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  variant={userType === "recipient" ? "urgent" : "medical"}
                  size="lg"
                  className="flex-1"
                >
                  {userType === "donor" ? (
                    <>
                      <Heart className="w-5 h-5 mr-2" />
                      Register as Donor
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setUserType("")}
                >
                  Back to Selection
                </Button>
              </div>
            </>
          )}
        </form>
      </Card>
    </div>
  );
};

export default RegistrationForm;