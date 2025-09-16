import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Shield, Zap } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic Coverage",
      price: "$89",
      period: "month",
      description: "Essential health coverage with privacy protection",
      features: [
        "Basic health coverage up to $50,000",
        "Zero-knowledge data processing",
        "Standard premium calculation",
        "Digital policy management",
        "24/7 customer support",
        "Mobile app access"
      ],
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Comprehensive Care",
      price: "$189",
      period: "month", 
      description: "Complete health protection with advanced features",
      features: [
        "Comprehensive coverage up to $250,000",
        "Advanced encryption protocols",
        "Real-time health monitoring integration",
        "Priority claims processing",
        "Dedicated health advisor",
        "Worldwide emergency coverage",
        "Preventive care included",
        "Prescription drug coverage"
      ],
      popular: true,
      variant: "medical" as const
    },
    {
      name: "Premium Protection",
      price: "$349",
      period: "month",
      description: "Ultimate health security for comprehensive peace of mind",
      features: [
        "Unlimited health coverage",
        "Quantum-encrypted data processing", 
        "AI-powered health insights",
        "Instant claim approvals",
        "Personal health concierge",
        "Global specialist network access",
        "Alternative medicine coverage",
        "Mental health support",
        "Family coverage options"
      ],
      popular: false,
      variant: "trust" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Transparent Pricing
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fair, transparent pricing with no hidden fees. Choose the plan that 
              best fits your health coverage needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card key={index} className={`p-8 relative ${plan.popular ? 'border-medical-blue shadow-secure' : 'border-border'} bg-gradient-card`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-medical-blue text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-medical-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.variant} 
                  className="w-full"
                  size="lg"
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-gradient-card border-medical-blue/10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-medical-blue" />
                <h3 className="font-semibold">Privacy Guarantee</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your health data remains private and encrypted at all times. 
                We never see your raw medical information, only encrypted computations.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card border-medical-green/10">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-medical-green" />
                <h3 className="font-semibold">Instant Coverage</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Get coverage approval in minutes, not weeks. Our automated 
                underwriting process provides instant decisions.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;