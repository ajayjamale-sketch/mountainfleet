import { bookings } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Plus, Calendar, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const tone: Record<string, "success" | "info" | "warning" | "danger"> = {
  Confirmed: "success",
  Pending: "warning",
  Completed: "info",
  Cancelled: "danger",
};

export default function Bookings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Bookings & Reservations</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage incoming customer reservations and trips.</p>
        </div>
        <Button variant="primary" size="sm"><Plus className="w-4 h-4" />New booking</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[{ label: "Total bookings", value: bookings.length }, { label: "Confirmed", value: bookings.filter((b) => b.status === "Confirmed").length }, { label: "Revenue", value: formatCurrency(bookings.reduce((s, b) => s + b.amount, 0)) }].map((s) => (
          <Card key={s.label}><CardContent>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
          </CardContent></Card>
        ))}
      </div>

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 font-semibold">Booking</th>
                  <th className="py-3 font-semibold">Customer</th>
                  <th className="py-3 font-semibold">Service</th>
                  <th className="py-3 font-semibold">Route</th>
                  <th className="py-3 font-semibold">Date</th>
                  <th className="py-3 font-semibold">Amount</th>
                  <th className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t border-border hover:bg-muted/30">
                    <td className="py-3 font-semibold">{b.id}</td>
                    <td className="py-3">{b.customer}</td>
                    <td className="py-3">{b.service}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 text-xs"><MapPin className="w-3 h-3 text-primary" />{b.pickup}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="w-3 h-3 text-accent" />{b.dropoff}</div>
                    </td>
                    <td className="py-3"><div className="flex items-center gap-1 text-xs"><Calendar className="w-3 h-3" />{b.date}</div></td>
                    <td className="py-3 font-bold">{formatCurrency(b.amount)}</td>
                    <td className="py-3"><Badge tone={tone[b.status]}>{b.status}</Badge></td>
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
