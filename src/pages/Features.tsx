import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Calculator, Users, Eye, Zap, CheckCircle, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your health data is encrypted client-side using AES-256 encryption before transmission. Zero-knowledge architecture ensures even we can't see your raw data.",
      color: "medical-blue"
    },
    {
      icon: Shield,
      title: "Zero-Knowledge Computation",
      description: "Advanced cryptographic techniques allow premium calculations without revealing personal health information to insurers or third parties.",
      color: "medical-green"
    },
    {
      icon: Calculator,
      title: "Fair Actuarial Pricing",
      description: "Our algorithms use statistical models to calculate accurate premiums based on risk assessment without compromising individual privacy.",
      color: "primary"
    },
    {
      icon: Users,
      title: "Multi-Party Security",
      description: "Secure multi-party computation protocols enable collaboration between patients, insurers, and healthcare providers while maintaining data confidentiality.",
      color: "medical-blue"
    },
    {
      icon: Eye,
      title: "Transparent Process",
      description: "Every step of the underwriting process is auditable and transparent, giving you full visibility into how your premium is calculated.",
      color: "medical-green"
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Get instant premium quotes and policy decisions through our high-performance computing infrastructure designed for healthcare data.",
      color: "primary"
    },
    {
      icon: CheckCircle,
      title: "Regulatory Compliance",
      description: "Built with HIPAA, GDPR, and other healthcare privacy regulations in mind. Full compliance without sacrificing innovation.",
      color: "medical-blue"
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "Compatible with international healthcare and insurance standards, enabling cross-border coverage and portability.",
      color: "medical-green"
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
                Revolutionary Features
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology that transforms medical insurance underwriting 
              while protecting your most sensitive health information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-gradient-card border-opacity-10 shadow-trust hover:shadow-secure transition-all duration-300">
                <div className={`flex items-center justify-center w-12 h-12 bg-${feature.color}/10 rounded-lg mb-4`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;