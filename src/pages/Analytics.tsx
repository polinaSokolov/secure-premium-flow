import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TrendingUp, TrendingDown, Activity, Shield, Users, DollarSign, FileText, Clock } from "lucide-react";

const Analytics = () => {
  const monthlyData = [
    { month: "Jan", premiums: 45000, claims: 32000, policies: 234 },
    { month: "Feb", premiums: 52000, claims: 28000, policies: 267 },
    { month: "Mar", premiums: 48000, claims: 35000, policies: 289 },
    { month: "Apr", premiums: 61000, claims: 41000, policies: 312 },
    { month: "May", premiums: 55000, claims: 38000, policies: 334 },
    { month: "Jun", premiums: 67000, claims: 42000, policies: 356 }
  ];

  const riskDistribution = [
    { name: "Low Risk", value: 45, color: "#10B981" },
    { name: "Medium Risk", value: 35, color: "#3B82F6" },
    { name: "High Risk", value: 20, color: "#EF4444" }
  ];

  const metrics = [
    {
      title: "Total Policies",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: FileText,
      color: "medical-blue"
    },
    {
      title: "Premium Revenue",
      value: "$328,000",
      change: "+8.2%", 
      trend: "up",
      icon: DollarSign,
      color: "medical-green"
    },
    {
      title: "Claims Processed",
      value: "89",
      change: "-3.1%",
      trend: "down", 
      icon: Activity,
      color: "primary"
    },
    {
      title: "Avg. Processing Time",
      value: "2.3 hrs",
      change: "-15.4%",
      trend: "down",
      icon: Clock,
      color: "medical-blue"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  Detailed <span className="bg-gradient-primary bg-clip-text text-transparent">Analytics</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Comprehensive insights into your insurance portfolio performance
                </p>
              </div>
              <Badge variant="secondary" className="gap-2">
                <Shield className="h-4 w-4" />
                Privacy Protected Data
              </Badge>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <Card key={index} className="p-6 bg-gradient-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-${metric.color}/10`}>
                      <metric.icon className={`h-5 w-5 text-${metric.color}`} />
                    </div>
                    <Badge variant={metric.trend === "up" ? "secondary" : "outline"} className="gap-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {metric.change}
                    </Badge>
                  </div>
                  <h3 className="font-medium text-muted-foreground mb-1">{metric.title}</h3>
                  <div className="text-2xl font-bold">{metric.value}</div>
                </Card>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Premium vs Claims Chart */}
              <Card className="p-6 bg-gradient-card">
                <h3 className="text-lg font-semibold mb-4">Premium vs Claims Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="premiums" fill="hsl(var(--medical-blue))" name="Premiums" />
                    <Bar dataKey="claims" fill="hsl(var(--medical-green))" name="Claims" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Risk Distribution */}
              <Card className="p-6 bg-gradient-card">
                <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {riskDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Policy Growth Chart */}
            <Card className="p-6 mb-8 bg-gradient-card">
              <h3 className="text-lg font-semibold mb-4">Policy Growth Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="policies" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Performance Indicators */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-card border-medical-blue/10">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-medical-blue" />
                  <h3 className="font-semibold">Privacy Compliance</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">HIPAA Compliance</span>
                    <Badge className="bg-medical-green text-white">100%</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    All data processing meets HIPAA standards
                  </p>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-medical-green/10">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-medical-green" />
                  <h3 className="font-semibold">Customer Satisfaction</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Satisfaction Score</span>
                    <Badge className="bg-medical-green text-white">4.8/5</Badge>
                  </div>
                  <Progress value={96} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Based on 1,247 customer reviews
                  </p>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">System Performance</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Uptime</span>
                    <Badge className="bg-primary text-white">99.9%</Badge>
                  </div>
                  <Progress value={99.9} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Average response time: 120ms
                  </p>
                </div>
              </Card>
            </div>

            {/* Export Options */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-4">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export PDF Report
                </Button>
                <Button variant="medical">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;