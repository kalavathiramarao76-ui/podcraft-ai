"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const models = [
  { id: "gpt-4o-mini", label: "GPT-4o Mini (fast)" },
  { id: "gpt-4o", label: "GPT-4o (quality)" },
  { id: "gpt-3.5-turbo", label: "GPT-3.5 Turbo (budget)" },
];

const STORAGE_KEYS = {
  endpoint: "podcraft-api-endpoint",
  model: "podcraft-model",
};

export default function SettingsPage() {
  const [endpoint, setEndpoint] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      setEndpoint(localStorage.getItem(STORAGE_KEYS.endpoint) || "");
      setModel(localStorage.getItem(STORAGE_KEYS.model) || "gpt-4o-mini");
    } catch {}
  }, []);

  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.endpoint, endpoint);
      localStorage.setItem(STORAGE_KEYS.model, model);
    } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearData = () => {
    if (!confirm("Clear all PodCraft AI local data? This cannot be undone.")) return;
    try {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith("podcraft"));
      keys.forEach((k) => localStorage.removeItem(k));
    } catch {}
    setEndpoint("");
    setModel("gpt-4o-mini");
    window.location.reload();
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Settings
        </h1>
        <p className="text-zinc-500">
          Configure your PodCraft AI workspace.
        </p>
      </div>

      <div className="space-y-8">
        {/* Theme */}
        <section className="rounded-2xl border border-[var(--pc-border,#27272a)] bg-[var(--pc-bg-card,#111113)] p-6">
          <h2 className="text-lg font-semibold text-[var(--pc-text,#fafafa)] mb-1">
            Appearance
          </h2>
          <p className="text-sm text-[var(--pc-text-muted,#71717a)] mb-4">
            Switch between dark, light, and system themes.
          </p>
          <ThemeToggle />
        </section>

        {/* API Endpoint */}
        <section className="rounded-2xl border border-[var(--pc-border,#27272a)] bg-[var(--pc-bg-card,#111113)] p-6">
          <h2 className="text-lg font-semibold text-[var(--pc-text,#fafafa)] mb-1">
            API Endpoint
          </h2>
          <p className="text-sm text-[var(--pc-text-muted,#71717a)] mb-4">
            Custom OpenAI-compatible endpoint URL. Leave blank for default.
          </p>
          <input
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.openai.com/v1"
            className="w-full bg-[var(--pc-surface,rgba(255,255,255,0.03))] border border-[var(--pc-border,#27272a)] rounded-xl px-4 py-3 text-[var(--pc-text,#fafafa)] placeholder-[var(--pc-text-muted,#71717a)] focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-colors text-sm"
          />
        </section>

        {/* Model Selector */}
        <section className="rounded-2xl border border-[var(--pc-border,#27272a)] bg-[var(--pc-bg-card,#111113)] p-6">
          <h2 className="text-lg font-semibold text-[var(--pc-text,#fafafa)] mb-1">
            AI Model
          </h2>
          <p className="text-sm text-[var(--pc-text-muted,#71717a)] mb-4">
            Choose the model for content generation.
          </p>
          <div className="space-y-2">
            {models.map((m) => (
              <label
                key={m.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                  model === m.id
                    ? "border-violet-500/40 bg-violet-500/5"
                    : "border-[var(--pc-border,#27272a)] bg-transparent hover:border-[var(--pc-text-muted,#71717a)]/30"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    model === m.id
                      ? "border-violet-500 bg-violet-500"
                      : "border-[var(--pc-border,#27272a)]"
                  }`}
                >
                  {model === m.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-sm text-[var(--pc-text,#fafafa)]">
                  {m.label}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button
            onClick={save}
            className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
          >
            {saved ? "Saved!" : "Save Settings"}
          </button>
        </div>

        {/* Danger Zone */}
        <section className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-1">
            Danger Zone
          </h2>
          <p className="text-sm text-[var(--pc-text-muted,#71717a)] mb-4">
            Clear all locally stored data including theme, settings, and cached content.
          </p>
          <button
            onClick={clearData}
            className="px-5 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-medium hover:bg-red-500/10 hover:border-red-500/30 transition-colors"
          >
            Clear All Data
          </button>
        </section>
      </div>
    </div>
  );
}
