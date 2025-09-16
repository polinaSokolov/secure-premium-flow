import { Button } from "@/components/ui/button";
import { Shield, Wallet, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Features", href: "/features" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Analytics", href: "/analytics" }
  ];

  const workflowItems = [
    { name: "Submit Health Data", href: "/submit-health-data" },
    { name: "Calculate Premium", href: "/calculate-premium" }
  ];

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MedSecure
              </h1>
              <p className="text-sm text-muted-foreground">
                Fair Premiums, Private Health
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.href 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Workflow Actions */}
            <div className="flex items-center gap-2 ml-6 pl-6 border-l border-border">
              {workflowItems.map((item) => (
                <Link key={item.name} to={item.href}>
                  <Button 
                    variant={location.pathname === item.href ? "medical" : "outline"} 
                    size="sm"
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>

          {/* Wallet Section */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="medical" size="sm" className="gap-2">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 border-t border-border">
            <nav className="flex flex-col gap-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.href 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-border pt-4 mt-4 space-y-2">
                {workflowItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button 
                      variant={location.pathname === item.href ? "medical" : "outline"} 
                      size="sm" 
                      className="w-full"
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
                
                <Button variant="ghost" size="sm" className="w-full">
                  Sign In
                </Button>
                <Button variant="medical" size="sm" className="w-full gap-2">
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};