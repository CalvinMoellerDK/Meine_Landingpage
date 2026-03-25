"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Palette, FileText, BarChart3, LogOut } from "lucide-react";
import { SiteEditor } from "./SiteEditor";
import { ThemeEditor } from "./ThemeEditor";
import { ContentEditor } from "./ContentEditor";
import { TrackingEditor } from "./TrackingEditor";

type Tab = "site" | "theme" | "tracking" | "verkauf" | "akquise";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "site", label: "Firmendaten", icon: <Building2 className="h-4 w-4" /> },
  { id: "theme", label: "Farben", icon: <Palette className="h-4 w-4" /> },
  { id: "tracking", label: "Tracking", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "verkauf", label: "Seite: Verkauf", icon: <FileText className="h-4 w-4" /> },
  { id: "akquise", label: "Seite: Akquise", icon: <FileText className="h-4 w-4" /> },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("site");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin");
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 flex h-full w-60 flex-col border-r border-stone-200 bg-white">
        <div className="border-b border-stone-200 px-5 py-4">
          <h1 className="text-base font-bold text-stone-900">Admin Dashboard</h1>
          <p className="text-xs text-stone-400">Inhalte verwalten</p>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-stone-900 text-white"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-stone-200 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-stone-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-60 flex-1 p-8">
        <div className="mx-auto max-w-4xl">
          {activeTab === "site" && <SiteEditor />}
          {activeTab === "theme" && <ThemeEditor />}
          {activeTab === "tracking" && <TrackingEditor />}
          {activeTab === "verkauf" && <ContentEditor page="verkauf" />}
          {activeTab === "akquise" && <ContentEditor page="akquise" />}
        </div>
      </main>
    </div>
  );
}
