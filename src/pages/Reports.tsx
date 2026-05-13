import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Download, FileText } from "lucide-react";
import { revenueSeries, utilizationSeries, fleetMix } from "@/lib/mockData";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";

const pieColors = ["#0369A1", "#F97316", "#10B981", "#8B5CF6"];

const driverPerf = [
  { metric: "Safety", value: 92 },
  { metric: "On-time", value: 88 },
  { metric: "Fuel", value: 76 },
  { metric: "Customer", value: 94 },
  { metric: "Mileage", value: 84 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Operational KPIs, exports and deep insights.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="w-4 h-4" />Export Excel</Button>
          <Button variant="primary" size="sm"><FileText className="w-4 h-4" />Export PDF</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader><CardTitle>Revenue trend</CardTitle><Badge tone="success">YTD</Badge></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="r2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,140,0.15)" />
                <XAxis dataKey="name" stroke="rgba(120,120,140,0.6)" fontSize={11} />
                <YAxis stroke="rgba(120,120,140,0.6)" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="#0EA5E9" strokeWidth={3} fill="url(#r2)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Fleet composition</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={fleetMix} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={3}>
                  {fleetMix.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                </Pie>
                <Legend iconType="circle" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Utilization (last 7 days)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={utilizationSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,140,0.15)" />
                <XAxis dataKey="name" stroke="rgba(120,120,140,0.6)" fontSize={11} />
                <YAxis stroke="rgba(120,120,140,0.6)" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Bar dataKey="trips" fill="#0369A1" radius={[8, 8, 0, 0]} />
                <Bar dataKey="idle" fill="#F97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Driver performance score</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={driverPerf} outerRadius={90}>
                <PolarGrid stroke="rgba(120,120,140,0.2)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <Radar dataKey="value" stroke="#F97316" fill="#F97316" fillOpacity={0.35} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
