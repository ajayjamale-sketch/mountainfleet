import React, { useState } from "react";
import { FolderOpen, Upload, FileText, Image, File, Shield, CheckCircle2, Clock, Search, Filter, Download, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "../../utils/cn";

interface Document {
  id: string;
  name: string;
  type: "license" | "insurance" | "registration" | "inspection" | "contract" | "other";
  category: "vehicle" | "driver" | "company";
  status: "verified" | "pending" | "expired";
  uploadDate: string;
  size: string;
  entity: string;
}

const mockDocuments: Document[] = [
  { id: "1", name: "Commercial Vehicle License - MTN-1027", type: "license", category: "vehicle", status: "verified", uploadDate: "2024-03-15", size: "2.4 MB", entity: "Volvo FH16" },
  { id: "2", name: "Driver License - Sarah Chen", type: "license", category: "driver", status: "verified", uploadDate: "2024-02-20", size: "1.8 MB", entity: "Sarah Chen" },
  { id: "3", name: "Fleet Insurance Policy 2024", type: "insurance", category: "company", status: "pending", uploadDate: "2024-04-01", size: "5.2 MB", entity: "MountainFleet Corp" },
  { id: "4", name: "Vehicle Inspection Report - MTN-1045", type: "inspection", category: "vehicle", status: "expired", uploadDate: "2023-11-10", size: "3.1 MB", entity: "Mercedes Sprinter" },
  { id: "5", name: "Driver Contract - Marcus Rivera", type: "contract", category: "driver", status: "verified", uploadDate: "2024-01-05", size: "890 KB", entity: "Marcus Rivera" },
  { id: "6", name: "Vehicle Registration - MTN-1032", type: "registration", category: "vehicle", status: "verified", uploadDate: "2024-03-28", size: "1.2 MB", entity: "Ford Transit" },
  { id: "7", name: "Annual Insurance Renewal", type: "insurance", category: "company", status: "pending", uploadDate: "2024-04-15", size: "4.7 MB", entity: "MountainFleet Corp" },
  { id: "8", name: "Driver Medical Certificate - Alex Park", type: "other", category: "driver", status: "verified", uploadDate: "2024-02-28", size: "650 KB", entity: "Alex Park" },
];

const typeIcons: Record<Document["type"], React.ReactNode> = {
  license: <Shield size={16} />,
  insurance: <FileText size={16} />,
  registration: <File size={16} />,
  inspection: <Eye size={16} />,
  contract: <FileText size={16} />,
  other: <File size={16} />,
};

const statusStyles: Record<Document["status"], string> = {
  verified: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  expired: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const DocumentsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || doc.entity.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: mockDocuments.length,
    verified: mockDocuments.filter((d) => d.status === "verified").length,
    pending: mockDocuments.filter((d) => d.status === "pending").length,
    expired: mockDocuments.filter((d) => d.status === "expired").length,
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground">Manage fleet documents, licenses, and certifications</p>
        </div>
        <button
          onClick={() => toast.success("Upload dialog would open here")}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
        >
          <Upload size={16} />
          Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Documents", value: stats.total, icon: FolderOpen, color: "text-sky-500", bg: "bg-sky-500/10" },
          { label: "Verified", value: stats.verified, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Pending Review", value: stats.pending, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Expired", value: stats.expired, icon: Shield, color: "text-rose-500", bg: "bg-rose-500/10" },
        ].map((stat) => (
          <div key={stat.label} className="premium-card p-4">
            <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", stat.bg)}>
              <stat.icon size={16} className={stat.color} />
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <div className="inline-flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
          {["all", "vehicle", "driver", "company"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium capitalize transition",
                categoryFilter === cat
                  ? "bg-white text-foreground shadow-sm dark:bg-slate-700"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-slate-50/50 dark:bg-slate-800/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Document</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Entity</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">Uploaded</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        {typeIcons[doc.type]}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="capitalize text-muted-foreground">{doc.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{doc.entity}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize", statusStyles[doc.status])}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{doc.uploadDate}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => toast.success(`Downloading ${doc.name}`)}
                      className="rounded-lg p-2 text-muted-foreground transition hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800"
                      aria-label={`Download ${doc.name}`}
                    >
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">No documents found</div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;
