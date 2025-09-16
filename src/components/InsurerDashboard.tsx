import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  Users, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from "lucide-react";

export const InsurerDashboard = () => {
  const [calculations, setCalculations] = useState([
    { id: 1, status: "completed", risk: "Low", premium: "$89", age: "25-35", confidence: 94 },
    { id: 2, status: "processing", risk: "Medium", premium: "Calculating...", age: "45-55", confidence: 0 },
    { id: 3, status: "pending", risk: "Unknown", premium: "Pending", age: "35-45", confidence: 0 },
    { id: 4, status: "completed", risk: "High", premium: "$245", age: "55-65", confidence: 89 },
  ]);

  const completedCalculations = calculations.filter(c => c.status === "completed");
  const averagePremium = completedCalculations.reduce((acc, c) => acc + parseInt(c.premium.replace("$", "")), 0) / completedCalculations.length;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Insurer Dashboard</h2>
            <p className="text-muted-foreground">
              Calculate premiums using encrypted health data without compromising privacy
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-trust">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Calculations</p>
                    <p className="text-2xl font-bold">{calculations.length}</p>
                  </div>
                  <Calculator className="h-8 w-8 text-medical-blue" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-secure">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Premium</p>
                    <p className="text-2xl font-bold">${averagePremium.toFixed(0)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-medical-green" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-trust">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Privacy Score</p>
                    <p className="text-2xl font-bold">100%</p>
                  </div>
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-secure">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Processing Time</p>
                    <p className="text-2xl font-bold">3.2m</p>
                  </div>
                  <Clock className="h-8 w-8 text-medical-blue" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculation Queue */}
            <div className="lg:col-span-2">
              <Card className="shadow-trust">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-medical-blue" />
                    Premium Calculations
                  </CardTitle>
                  <CardDescription>
                    Real-time processing of encrypted health submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {calculations.map((calc) => (
                      <div key={calc.id} className="p-4 border rounded-lg bg-gradient-card">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">#{calc.id}</span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">Patient Age: {calc.age}</p>
                              <p className="text-xs text-muted-foreground">Risk Assessment: {calc.risk}</p>
                            </div>
                          </div>
                          
                          {calc.status === "completed" && (
                            <Badge variant="secondary" className="bg-medical-green text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Complete
                            </Badge>
                          )}
                          {calc.status === "processing" && (
                            <Badge variant="outline" className="border-medical-blue text-medical-blue">
                              <Clock className="w-3 h-3 mr-1" />
                              Processing
                            </Badge>
                          )}
                          {calc.status === "pending" && (
                            <Badge variant="outline">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-medical-blue">{calc.premium}</span>
                            {calc.confidence > 0 && (
                              <span className="text-sm text-muted-foreground">
                                {calc.confidence}% confidence
                              </span>
                            )}
                          </div>
                          
                          {calc.status === "processing" && (
                            <div className="w-24">
                              <Progress value={65} className="h-2" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="trust" className="w-full mt-6">
                    Process New Calculation
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Privacy & Security Panel */}
            <div className="space-y-6">
              <Card className="shadow-secure">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-medical-green" />
                    Privacy Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Data Anonymization</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Encryption Strength</span>
                      <span className="font-medium">256-bit AES</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Compliance Score</span>
                      <span className="font-medium">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-trust">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-medical-blue" />
                    Risk Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Low Risk</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-medical-green rounded-full"></div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Medium Risk</span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-medical-blue rounded-full"></div>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">High Risk</span>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-2 bg-destructive rounded-full"></div>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="secure" size="sm" className="w-full mt-4">
                    View Detailed Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};