  import React, { useMemo } from "react";
import { CreditCard, Download, ReceiptText, Wallet } from "lucide-react";
import { getPlatformSnapshot } from "../../lib/platformData";

const FinancePage: React.FC = () => {
  const snapshot = useMemo(() => getPlatformSnapshot(), []);

  return (
    <div className="space-y-6 pb-8">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Payments and Billing</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Track revenue, invoices, expenses, payouts, and approvals with an enterprise-grade billing workspace.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              The finance module combines invoice visibility, expense monitoring, and operational cost control so fleet teams can move from manual spreadsheets to real dashboards.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary/90">
            <Download size={16} />
            Download invoices
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Trip revenue", `$${snapshot.metrics.totalRevenue.toLocaleString()}`, "Current trip earnings"],
          ["Booking revenue", `$${snapshot.metrics.bookingRevenue.toLocaleString()}`, "Reservation pipeline total"],
          ["Operating cost", `$${snapshot.metrics.totalExpense.toLocaleString()}`, "Expenses across the fleet"],
          ["Overdue invoices", String(snapshot.metrics.overdueInvoices), "Collections needing follow-up"],
        ].map(([label, value, description]) => (
          <article key={label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{value}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Expense approval queue</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Operational spend by category, vehicle, and approval status.</p>
            </div>
            <ReceiptText size={18} className="text-primary" />
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Vehicle</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.expenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-slate-100 dark:border-slate-800/80">
                    <td className="py-4 pr-4 font-medium text-slate-900 dark:text-white">{expense.category}</td>
                    <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">{expense.vehicle}</td>
                    <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">${expense.amount.toLocaleString()}</td>
                    <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">{expense.date}</td>
                    <td className="py-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {expense.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Invoice center</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Customer invoices and collection state.</p>
              </div>
              <CreditCard size={18} className="text-primary" />
            </div>
            <div className="mt-5 space-y-3">
              {snapshot.invoices.map((invoice) => (
                <div key={invoice.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{invoice.customer}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{invoice.id} · Due {invoice.due}</p>
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-white">${invoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded-full bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-600 dark:text-sky-400">
                      {invoice.status}
                    </span>
                    <button className="text-sm font-medium text-primary">Download PDF</button>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Finance modules</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Capabilities prepared for scaling.</p>
              </div>
              <Wallet size={18} className="text-primary" />
            </div>
            <div className="mt-5 space-y-3">
              {[
                "Driver payout summaries with settlement visibility",
                "Expense approval workflows for managers and admins",
                "Invoice generation with PDF export and payment state",
                "Tax and commission reporting for customer contracts",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default FinancePage;
