import "./dashboard.css";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import React from "react";
import { Sidebar } from "./components/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        <Sidebar />
        <div className="ms-[var(--sidebar-width)]">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
