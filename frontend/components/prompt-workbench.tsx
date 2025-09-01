"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

export function PromptWorkbench() {
  const [original, setOriginal] = useState("")
  const [refined, setRefined] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  const canRefine = original.trim().length > 0 && !busy

  const hint = useMemo(() => "Write what you want the model to do. Add context like audience, tone, and format.", [])

  const onRefine = async () => {
    if (!canRefine) return

    setBusy(true)
    setError("")
    setRefined("")

    // Use environment variable for the API URL for flexibility between local dev and production
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

    try {
      const response = await fetch(`${apiUrl}/refine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: original }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the server returns an error, display it
        throw new Error(data.error || "An unknown error occurred.");
      }

      setRefined(data.refined_prompt);

    } catch (err: any) {
      console.error("API call failed:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Left: Input panel */}
      <div className="rounded-xl bg-neutral-900 p-4">
        <div className="flex items-center justify-between">
          <label htmlFor="original" className="text-xs font-medium text-white">
            Original prompt
          </label>
          <span className="text-xs text-neutral-400">{original.length} chars</span>
        </div>
        <div className="mt-3">
          <textarea
            id="original"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder={hint}
            className={cn(
              "min-h-48 w-full resize-y rounded-lg bg-neutral-900 p-4 text-sm text-white outline-none",
              "ring-1 ring-white/10 transition focus:ring-2 focus:ring-white/20",
              "placeholder:text-neutral-400",
            )}
            aria-label="Original prompt input"
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-neutral-400">Tip: Include audience, goals, and constraints.</div>
          <button
            type="button"
            onClick={onRefine}
            disabled={!canRefine}
            className={cn(
              "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition",
              "bg-white text-neutral-950 hover:bg-neutral-200",
              "disabled:opacity-50 disabled:hover:bg-white",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer",
            )}
            aria-label="Generate refined prompt"
          >
            {busy ? "Refining…" : "Refine Prompt"}
          </button>
        </div>
      </div>

      {/* Right: Output panel */}
      <div className="rounded-xl bg-neutral-900 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium text-white">Refined prompt</h3>
          <button
            type="button"
            onClick={() => {
              const textToCopy = error || refined
              if (!textToCopy) return
              navigator.clipboard.writeText(textToCopy)
            }}
            className={cn(
              "text-xs text-neutral-400 underline-offset-4 transition hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer",
            )}
          >
            Copy
          </button>
        </div>

        <div
          className={cn(
            "mt-3 min-h-48 rounded-lg border border-white/10 p-4",
            "transition-opacity",
            refined || error ? "opacity-100" : "opacity-80",
          )}
          aria-live="polite"
        >
          {error ? (
             <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-red-400">{error}</pre>
          ) : refined ? (
            <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-white">{refined}</pre>
          ) : (
            <div className="text-sm leading-relaxed text-neutral-400">
              Your refined prompt will appear here after you click “Refine Prompt.”
            </div>
          )}
        </div>
      </div>
    </div>
  )
}