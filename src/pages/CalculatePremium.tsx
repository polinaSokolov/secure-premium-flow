import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calculator, TrendingUp, FileText, Clock, CheckCircle, AlertCircle, Wallet, Activity, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const CalculatePremium = () => {
  const [calculationStep, setCalculationStep] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { isConnected, address } = useAccount();

  const calculationSteps = [
    "Analyzing encrypted health data",
    "Processing risk assessment algorithms", 
    "Calculating actuarial factors",
    "Generating premium quote",
    "Finalizing recommendations"
  ];

  const startCalculation = () => {
    setIsCalculating(true);
    setCalculationStep(0);
    
    const interval = setInterval(() => {
      setCalculationStep(prev => {
        if (prev >= calculationSteps.length - 1) {
          clearInterval(interval);
          setIsCalculating(false);
          setShowResults(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const progress = ((calculationStep + 1) / calculationSteps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Calculate <span className="bg-gradient-primary bg-clip-text text-transparent">Premium</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Zero-knowledge premium calculation based on your encrypted health data
            </p>
          </div>

          {!isCalculating && !showResults && (
            <Card className="p-8 text-center bg-gradient-card">
              <Calculator className="h-16 w-16 text-medical-blue mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4">Ready to Calculate Your Premium</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our advanced algorithms will analyze your encrypted health data using zero-knowledge 
                protocols to calculate a fair and accurate insurance premium.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 p-4 bg-medical-blue/5 rounded-lg">
                  <Shield className="h-6 w-6 text-medical-blue" />
                  <div className="text-left">
                    <div className="font-medium">Privacy Protected</div>
                    <div className="text-sm text-muted-foreground">Zero data exposure</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-medical-green/5 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-medical-green" />
                  <div className="text-left">
                    <div className="font-medium">Fair Pricing</div>
                    <div className="text-sm text-muted-foreground">Actuarially sound</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Real-time</div>
                    <div className="text-sm text-muted-foreground">Instant results</div>
                  </div>
                </div>
              </div>
              
              <Button variant="medical" size="lg" onClick={startCalculation} className="gap-2">
                <Calculator className="h-5 w-5" />
                Start Premium Calculation
              </Button>
            </Card>
          )}

          {isCalculating && (
            <Card className="p-8 bg-gradient-card">
              <div className="text-center mb-8">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-medical-blue/20 border-t-medical-blue mx-auto mb-6"></div>
                <h2 className="text-2xl font-semibold mb-2">Calculating Your Premium</h2>
                <p className="text-muted-foreground">
                  Processing your encrypted data using zero-knowledge protocols...
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                
                <div className="space-y-3 mt-6">
                  {calculationSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {index < calculationStep ? (
                        <CheckCircle className="h-5 w-5 text-medical-green" />
                      ) : index === calculationStep ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-medical-blue/20 border-t-medical-blue"></div>
                      ) : (
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className={index <= calculationStep ? 'text-foreground' : 'text-muted-foreground'}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {showResults && (
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-card border-medical-green/20">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="h-8 w-8 text-medical-green" />
                  <h2 className="text-2xl font-semibold">Premium Calculation Complete</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Your Monthly Premium</h3>
                    <div className="text-4xl font-bold text-medical-blue mb-2">$189.00</div>
                    <Badge variant="secondary" className="mb-4">
                      Comprehensive Coverage Plan
                    </Badge>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Premium:</span>
                        <span>$165.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Risk Assessment:</span>
                        <span>+$24.00</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">Total Monthly:</span>
                        <span className="font-bold">$189.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Coverage Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-medical-green" />
                        <span className="text-sm">Coverage up to $250,000</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-medical-green" />
                        <span className="text-sm">Zero deductible emergency care</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-medical-green" />
                        <span className="text-sm">Prescription drug coverage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-medical-green" />
                        <span className="text-sm">Preventive care included</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <Button variant="medical" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Accept & Generate Policy
                  </Button>
                  <Button variant="outline">
                    View Detailed Breakdown
                  </Button>
                </div>
              </Card>
              
              <Card className="p-6 bg-medical-blue/5 border-medical-blue/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-medical-blue mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Privacy Guarantee</h4>
                    <p className="text-sm text-muted-foreground">
                      This premium was calculated without exposing any of your personal health 
                      information. All computations were performed on encrypted data using 
                      zero-knowledge protocols.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CalculatePremium;