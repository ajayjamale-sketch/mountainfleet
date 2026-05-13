import { invoices, revenueSeries } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CreditCard, Download, FileText } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const tone: Record<string, "success" | "warning" | "danger"> = { Paid: "success", Pending: "warning", Overdue: "danger" };

export default function Payments() {
  const total = invoices.reduce((s, i) => s + i.amount, 0);
  const paid = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const pending = invoices.filter((i) => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Payments & Billing</h1>
          <p className="text-sm text-muted-foreground mt-1">Invoices, payouts and revenue analytics.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="w-4 h-4" />Export PDF</Button>
          <Button variant="primary" size="sm"><FileText className="w-4 h-4" />New invoice</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardContent>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Total billed</div>
          <div className="text-2xl font-bold mt-1">{formatCurrency(total)}</div>
        </CardContent></Card>
        <Card><CardContent>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Collected</div>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{formatCurrency(paid)}</div>
        </CardContent></Card>
        <Card><CardContent>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Outstanding</div>
          <div className="text-2xl font-bold mt-1 text-amber-600">{formatCurrency(pending)}</div>
        </CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Revenue by month</CardTitle><Badge tone="success">▲ 12.4%</Badge></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,120,140,0.15)" />
              <XAxis dataKey="name" stroke="rgba(120,120,140,0.6)" fontSize={11} />
              <YAxis stroke="rgba(120,120,140,0.6)" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Bar dataKey="revenue" fill="#0369A1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Invoices</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-3 font-semibold">Invoice</th>
                <th className="py-3 font-semibold">Customer</th>
                <th className="py-3 font-semibold">Issued</th>
                <th className="py-3 font-semibold">Due</th>
                <th className="py-3 font-semibold">Amount</th>
                <th className="py-3 font-semibold">Status</th>
              </tr></thead>
              <tbody>
                {invoices.map((i) => (
                  <tr key={i.id} className="border-t border-border hover:bg-muted/30">
                    <td className="py-3 font-semibold flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" />{i.id}</td>
                    <td className="py-3">{i.customer}</td>
                    <td className="py-3">{i.date}</td>
                    <td className="py-3">{i.due}</td>
                    <td className="py-3 font-bold">{formatCurrency(i.amount)}</td>
                    <td className="py-3"><Badge tone={tone[i.status]}>{i.status}</Badge></td>
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
