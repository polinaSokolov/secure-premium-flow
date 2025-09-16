import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Lock, Calculator, FileCheck, ArrowRight, Shield } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Submit Health Data",
      description: "Upload your medical history, test results, and health metrics through our secure portal. All data is encrypted before leaving your device.",
      details: [
        "Client-side encryption using AES-256",
        "Secure file upload with integrity verification",
        "Support for multiple medical record formats"
      ]
    },
    {
      number: "02", 
      icon: Lock,
      title: "Data Encryption & Processing",
      description: "Your data is processed using zero-knowledge cryptographic protocols that preserve privacy while enabling computation.",
      details: [
        "Homomorphic encryption for computation on encrypted data",
        "Multi-party computation protocols",
        "No plaintext data exposure to any party"
      ]
    },
    {
      number: "03",
      icon: Calculator,
      title: "Premium Calculation",
      description: "Our actuarial algorithms calculate fair premiums based on encrypted risk assessment without accessing your raw health data.",
      details: [
        "Statistical risk modeling on encrypted data",
        "Fair pricing without discrimination",
        "Real-time premium computation"
      ]
    },
    {
      number: "04",
      icon: FileCheck,
      title: "Policy Generation",
      description: "Receive your personalized insurance policy with transparent pricing and coverage details, all while maintaining data privacy.",
      details: [
        "Instant policy generation",
        "Transparent coverage terms",
        "Digital policy management"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="bg-gradient-primary bg-clip-text text-transparent">Works</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our revolutionary process ensures fair insurance pricing while maintaining 
              complete privacy of your health information.
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-1/2">
                  <Card className="p-8 bg-gradient-card border-medical-blue/10 shadow-trust">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-3xl font-bold text-medical-blue/30">
                        {step.number}
                      </div>
                      <div className="flex items-center justify-center w-12 h-12 bg-medical-blue/10 rounded-lg">
                        <step.icon className="h-6 w-6 text-medical-blue" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-medical-green" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                
                <div className="lg:w-1/2 flex justify-center">
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-8 w-8 text-medical-blue/50 transform lg:rotate-0 rotate-90" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button variant="medical" size="lg" className="gap-2">
              Start Your Application
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;