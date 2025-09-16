import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Shield, Upload, FileText, Lock, AlertCircle, Wallet } from "lucide-react";
import { useState } from "react";
import { useAccount, useConnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const SubmitHealthData = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  const { isConnected, address } = useAccount();

  const nextStep = () => setStep(Math.min(step + 1, totalSteps));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Submit <span className="bg-gradient-primary bg-clip-text text-transparent">Health Data</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Securely submit your health information for accurate premium calculation
            </p>
          </div>

          {/* Wallet Connection Check */}
          {!isConnected && (
            <Card className="p-6 mb-8 border-orange-200 bg-orange-50">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="h-6 w-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-orange-800">Wallet Connection Required</h3>
              </div>
              <p className="text-orange-700 mb-4">
                Please connect your wallet to submit health data securely on the blockchain.
              </p>
              <ConnectButton />
            </Card>
          )}

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-8 bg-gradient-card">
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-6 w-6 text-medical-blue" />
                  <h2 className="text-2xl font-semibold">Basic Information</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Upload className="h-6 w-6 text-medical-blue" />
                  <h2 className="text-2xl font-semibold">Medical History</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="conditions">Current Medical Conditions</Label>
                    <Textarea 
                      id="conditions" 
                      placeholder="List any current medical conditions, medications, or ongoing treatments"
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="surgeries">Previous Surgeries/Hospitalizations</Label>
                    <Textarea 
                      id="surgeries" 
                      placeholder="Describe any previous surgeries or hospitalizations with dates"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="familyHistory">Family Medical History</Label>
                    <Textarea 
                      id="familyHistory" 
                      placeholder="Include family history of major diseases (diabetes, heart disease, cancer, etc.)"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-6 w-6 text-medical-blue" />
                  <h2 className="text-2xl font-semibold">Upload Medical Records</h2>
                </div>
                
                <div className="border-2 border-dashed border-medical-blue/20 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-medical-blue mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Upload Medical Documents</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your medical records, lab results, or click to browse
                  </p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
                
                <div className="bg-medical-blue/5 border border-medical-blue/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-medical-blue mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Privacy Protection</h4>
                      <p className="text-sm text-muted-foreground">
                        All files are encrypted before upload and processed using zero-knowledge protocols. 
                        Your medical data remains private and secure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="h-6 w-6 text-medical-blue" />
                  <h2 className="text-2xl font-semibold">Review & Submit</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="accuracy" />
                    <Label htmlFor="accuracy" className="text-sm">
                      I confirm that all information provided is accurate and complete
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacy" />
                    <Label htmlFor="privacy" className="text-sm">
                      I understand that my data will be encrypted and processed using zero-knowledge protocols
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>
                </div>
                
                <div className="bg-medical-green/5 border border-medical-green/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-medical-green mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Next Steps</h4>
                      <p className="text-sm text-muted-foreground">
                        After submission, your data will be processed and premium calculations will be 
                        available within 24 hours. You'll receive a notification when ready.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={step === 1}
              >
                Previous
              </Button>
              
              {step < totalSteps ? (
                <Button variant="medical" onClick={nextStep}>
                  Continue
                </Button>
              ) : (
                <Button variant="medical" className="gap-2">
                  <Lock className="h-4 w-4" />
                  Submit Encrypted Data
                </Button>
              )}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SubmitHealthData;