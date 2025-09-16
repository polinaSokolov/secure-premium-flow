import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Calculator, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-trust">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-medical-blue" />
              <span className="text-sm font-medium text-medical-blue">
                Privacy-First Insurance Platform
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Fair Premiums,
              </span>
              <br />
              <span className="text-foreground">Private Health</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Revolutionary medical insurance underwriting that calculates fair premiums 
              without exposing your sensitive health data. Zero-knowledge privacy meets 
              actuarial precision.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/submit-health-data">
              <Button variant="medical" size="lg" className="gap-2">
                Submit Health Data
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/calculate-premium">
              <Button variant="trust" size="lg" className="gap-2">
                <Calculator className="h-4 w-4" />
                Calculate Premium
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-card border-medical-blue/10 shadow-trust">
              <div className="flex items-center justify-center w-12 h-12 bg-medical-blue/10 rounded-lg mb-4 mx-auto">
                <Lock className="h-6 w-6 text-medical-blue" />
              </div>
              <h3 className="font-semibold mb-2">Encrypted Submission</h3>
              <p className="text-sm text-muted-foreground">
                Your health data is encrypted client-side before submission. 
                Never stored in plaintext.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card border-medical-green/10 shadow-secure">
              <div className="flex items-center justify-center w-12 h-12 bg-medical-green/10 rounded-lg mb-4 mx-auto">
                <Shield className="h-6 w-6 text-medical-green" />
              </div>
              <h3 className="font-semibold mb-2">Zero-Knowledge Computation</h3>
              <p className="text-sm text-muted-foreground">
                Premiums calculated without revealing your personal health information 
                to insurers.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card border-primary/10 shadow-trust">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Fair Pricing</h3>
              <p className="text-sm text-muted-foreground">
                Actuarially sound premiums based on risk assessment without 
                privacy compromise.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};