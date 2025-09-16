import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Lock, 
  Upload, 
  CheckCircle, 
  FileText, 
  Heart, 
  Activity,
  Calendar,
  User
} from "lucide-react";

export const PatientDashboard = () => {
  const [encryptionProgress, setEncryptionProgress] = useState(0);
  const [isEncrypted, setIsEncrypted] = useState(false);

  const handleEncrypt = () => {
    setEncryptionProgress(0);
    const interval = setInterval(() => {
      setEncryptionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsEncrypted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Submit Your Health History</h2>
            <p className="text-muted-foreground">
              Secure, encrypted submission of your medical information for premium calculation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Health Data Form */}
            <Card className="shadow-trust">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-medical-blue" />
                  Health Information
                </CardTitle>
                <CardDescription>
                  All data will be encrypted before transmission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Input id="gender" placeholder="Male/Female/Other" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conditions">Pre-existing Conditions</Label>
                  <Textarea 
                    id="conditions" 
                    placeholder="List any medical conditions, allergies, or ongoing treatments..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <Textarea 
                    id="medications" 
                    placeholder="List current medications and dosages..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" type="number" placeholder="170" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" type="number" placeholder="70" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lifestyle">Lifestyle Factors</Label>
                  <Textarea 
                    id="lifestyle" 
                    placeholder="Smoking habits, alcohol consumption, exercise routine..."
                    className="min-h-[80px]"
                  />
                </div>

                <Button 
                  onClick={handleEncrypt} 
                  variant="medical" 
                  className="w-full"
                  disabled={encryptionProgress > 0 && encryptionProgress < 100}
                >
                  {encryptionProgress === 0 ? (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Encrypt & Submit
                    </>
                  ) : encryptionProgress < 100 ? (
                    "Encrypting..."
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submitted Successfully
                    </>
                  )}
                </Button>

                {encryptionProgress > 0 && encryptionProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Encryption Progress</span>
                      <span>{encryptionProgress}%</span>
                    </div>
                    <Progress value={encryptionProgress} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Features */}
            <div className="space-y-6">
              <Card className="shadow-secure">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-medical-green" />
                    Privacy Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-trust-blue rounded-lg">
                    <Lock className="h-5 w-5 text-medical-blue" />
                    <div>
                      <p className="font-medium text-sm">End-to-End Encryption</p>
                      <p className="text-xs text-muted-foreground">
                        Data encrypted with AES-256 before leaving your device
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-trust-green rounded-lg">
                    <Activity className="h-5 w-5 text-medical-green" />
                    <div>
                      <p className="font-medium text-sm">Zero-Knowledge Processing</p>
                      <p className="text-xs text-muted-foreground">
                        Calculations performed without data exposure
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Compliance Ready</p>
                      <p className="text-xs text-muted-foreground">
                        HIPAA and GDPR compliant processing
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {isEncrypted && (
                <Card className="shadow-trust border-medical-green">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-medical-green">
                      <CheckCircle className="h-5 w-5" />
                      Submission Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data Encrypted</span>
                        <Badge variant="secondary" className="bg-medical-green text-white">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Transmitted Securely</span>
                        <Badge variant="secondary" className="bg-medical-green text-white">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Processing Started</span>
                        <Badge variant="outline" className="border-medical-blue text-medical-blue">
                          In Progress
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-gradient-trust rounded-lg">
                      <p className="text-sm font-medium">Estimated Premium Calculation Time</p>
                      <p className="text-xs text-muted-foreground">2-5 minutes</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};