import { expenses, fuelSeries } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Plus, Fuel, Wrench, Shield, MoreHorizontal } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const tone: Record<string, "success" | "warning" | "danger"> = { Approved: "success", Pending: "warning", Rejected: "danger" };

const categoryIcon: Record<string, any> = { Fuel, Repair: Wrench, Insurance: Shield };

export default function Expenses() {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const byCat = expenses.reduce<Record<string, number>>((acc, e) => { acc[e.category] = (acc[e.category] || 0) + e.amount; return acc; }, {});
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Fuel & Expenses</h1>
          <p className="text-sm text-muted-foreground mt-1">Capture costs, approvals and operational spend.</p>
        </div>
        <Button variant="primary" size="sm"><Plus className="w-4 h-4" />Log expense</Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card><CardContent>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Total expenses</div>
          <div className="text-2xl font-bold mt-1">{formatCurrency(total)}</div>
        </CardContent></Card>
        {Object.entries(byCat).slice(0, 3).map(([cat, val]) => {
          const Icon = categoryIcon[cat] || Fuel;
          return (
            <Card key={cat}><CardContent className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center"><Icon className="w-5 h-5 text-white" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{cat}</div>
                <div className="text-lg font-bold">{formatCurrency(val)}</div>
              </div>
            </CardContent></Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Fuel cost trend</CardTitle><Badge tone="info">4-week</Badge></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={fuelSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,140,0.15)" />
                <XAxis dataKey="name" stroke="rgba(120,120,140,0.6)" fontSize={11} />
                <YAxis stroke="rgba(120,120,140,0.6)" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Line type="monotone" dataKey="value" stroke="#F97316" strokeWidth={3} dot={{ r: 6, fill: "#F97316" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending approvals</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {expenses.filter((e) => e.status === "Pending").map((e) => (
              <div key={e.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                <div>
                  <div className="text-sm font-semibold">{e.category} · {e.vehicle}</div>
                  <div className="text-xs text-muted-foreground">{e.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatCurrency(e.amount)}</div>
                  <div className="text-[10px] text-amber-600 uppercase tracking-wider">Pending</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>All expenses</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-3 font-semibold">ID</th>
                <th className="py-3 font-semibold">Category</th>
                <th className="py-3 font-semibold">Vehicle</th>
                <th className="py-3 font-semibold">Date</th>
                <th className="py-3 font-semibold">Amount</th>
                <th className="py-3 font-semibold">Status</th>
                <th></th>
              </tr></thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id} className="border-t border-border hover:bg-muted/30">
                    <td className="py-3 font-semibold">{e.id}</td>
                    <td className="py-3">{e.category}</td>
                    <td className="py-3">{e.vehicle}</td>
                    <td className="py-3">{e.date}</td>
                    <td className="py-3 font-bold">{formatCurrency(e.amount)}</td>
                    <td className="py-3"><Badge tone={tone[e.status]}>{e.status}</Badge></td>
                    <td className="py-3"><MoreHorizontal className="w-4 h-4 text-muted-foreground" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
