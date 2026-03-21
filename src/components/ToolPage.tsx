"use client";

import { useState, useCallback } from "react";
import { generateContent } from "@/lib/ai";
import ExportMenu from "./ExportMenu";
import FavoriteButton from "./FavoriteButton";
import ApiErrorFallback from "./ApiErrorFallback";

interface ToolPageProps {
  title: string;
  description: string;
  placeholder: string;
  systemPrompt: string;
  buildUserPrompt: (transcript: string) => string;
  icon: React.ReactNode;
}

export default function ToolPage({
  title,
  description,
  placeholder,
  systemPrompt,
  buildUserPrompt,
  icon,
}: ToolPageProps) {
  const [transcript, setTranscript] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!transcript.trim()) {
      setError("Please paste a transcript first.");
      return;
    }
    if (transcript.trim().length < 50) {
      setError("Transcript seems too short. Paste more content for better results.");
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const result = await generateContent(
        systemPrompt,
        buildUserPrompt(transcript)
      );
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [transcript, systemPrompt, buildUserPrompt]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-muted">{description}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-400">
              Podcast Transcript
            </label>
            <span className="text-xs text-muted">
              {transcript.length.toLocaleString()} chars
            </span>
          </div>
          <textarea
            value={transcript}
            onChange={(e) => {
              setTranscript(e.target.value);
              setError("");
            }}
            placeholder={placeholder}
            className="w-full h-[500px] bg-bg-card border border-border rounded-xl p-4 text-sm text-zinc-300 resize-none focus:border-accent/50 transition-colors placeholder:text-zinc-700"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 px-6 bg-accent hover:bg-accent-dark text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed pulse-glow"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Generating...
              </span>
            ) : (
              "Generate"
            )}
          </button>
          {error && (
            <ApiErrorFallback error={error} onRetry={handleGenerate} />
          )}
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-400">
              Generated Output
            </label>
            {output && (
              <div className="flex items-center gap-2">
                <FavoriteButton itemId={`podcraft-${title.toLowerCase().replace(/\s+/g, "-")}`} itemLabel={title} size="sm" />
                <button
                  onClick={handleCopy}
                  className="text-xs text-accent hover:text-accent-light transition-colors flex items-center gap-1"
                >
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>
                  {copied ? "Copied!" : "Copy"}
                </button>
                <ExportMenu content={output} title={title} />
              </div>
            )}
          </div>
          <div className="w-full h-[500px] bg-bg-card border border-border rounded-xl p-4 overflow-y-auto">
            {output ? (
              <div className="prose-output text-sm whitespace-pre-wrap">
                {output}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-zinc-700 text-sm text-center">
                  {loading
                    ? "AI is analyzing your transcript..."
                    : "Output will appear here after generation"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
