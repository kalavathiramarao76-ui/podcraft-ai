"use client";

import { useState, useEffect, useCallback } from "react";

interface ApiErrorFallbackProps {
  error: string;
  onRetry: () => void;
}

export default function ApiErrorFallback({ error, onRetry }: ApiErrorFallbackProps) {
  const [countdown, setCountdown] = useState(10);
  const [autoRetry, setAutoRetry] = useState(true);

  const handleRetry = useCallback(() => {
    setCountdown(10);
    setAutoRetry(false);
    onRetry();
  }, [onRetry]);

  useEffect(() => {
    if (!autoRetry || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRetry();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRetry, countdown, handleRetry]);

  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/5 backdrop-blur-xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-red-300 mb-1">
            API Error
          </h4>
          <p className="text-xs text-zinc-400 mb-3 break-words">{error}</p>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRetry}
              className="px-4 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-medium rounded-lg transition-colors"
            >
              Retry Now
            </button>
            {autoRetry && countdown > 0 && (
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6">
                  <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="#27272a"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeDasharray={62.83}
                      strokeDashoffset={62.83 * (1 - countdown / 10)}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                </div>
                <span className="text-xs text-zinc-500">
                  Auto-retry in {countdown}s
                </span>
                <button
                  onClick={() => setAutoRetry(false)}
                  className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
