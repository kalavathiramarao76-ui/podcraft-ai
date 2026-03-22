"use client";

import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main role="main" className="flex-1 ml-56 p-8 lg:p-12">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
    </div>
  );
}
