"use client"

import * as React from "react"

export function PromptImprover() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [isRefining, setIsRefining] = React.useState(false)

  function fakeRefinePrompt(text: string) {
    // Simple client-only transformation to demo the design without backend.
    // In production, replace with a server action/route using the AI SDK.
    const trimmed = text.trim()
    if (!trimmed) return ""
    const bullets = trimmed
      .replace(/\s+/g, " ")
      .split(/[.?!]\s+/)
      .filter(Boolean)
      .slice(0, 5)
      .map((s) => s.replace(/^[-•\s]*/, "").trim())
    return [
      "System: You are a precise assistant that improves prompts for clarity, constraints, and expected outputs.",
      "",
      "Task:",
      `- Rewrite the user's prompt to be unambiguous and actionable.`,
      `- Preserve the user’s intent while improving structure.`,
      "",
      "User Prompt (summary):",
      ...bullets.map((b, i) => `- ${b}`),
      "",
      "Deliverables:",
      "- A refined prompt with: role, goal, constraints, steps, and expected output format.",
      "- Keep it concise (150–250 words).",
    ].join("\n")
  }

  async function handleRefine(e: React.FormEvent) {
    e.preventDefault()
    setIsRefining(true)
    // Simulate processing delay for subtle UX feedback
    await new Promise((r) => setTimeout(r, 600))
    setOutput(fakeRefinePrompt(input))
    setIsRefining(false)
  }

  function handleCopy() {
    if (!output) return
    navigator.clipboard.writeText(output).catch(() => {})
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Input panel */}
      <form
        className="rounded-xl border border-neutral-200 bg-white p-4 md:p-5 transition-shadow duration-200 hover:shadow-sm"
        onSubmit={handleRefine}
        aria-labelledby="original-prompt-title"
      >
        <div className="flex items-center justify-between">
          <h2 id="original-prompt-title" className="font-sans text-sm font-medium text-neutral-700">
            Original prompt
          </h2>
          <span className="text-xs text-neutral-500">Plain text</span>
        </div>

        <label htmlFor="original-prompt" className="sr-only">
          Enter your original prompt
        </label>
        <textarea
          id="original-prompt"
          className="mt-3 h-56 w-full resize-none rounded-md border border-neutral-300 bg-white px-3 py-2 font-sans text-sm leading-relaxed text-neutral-900 outline-none transition-all duration-150 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
          placeholder="Describe your task, goals, constraints, and any examples. Avoid chatty language—be specific."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-describedby="original-prompt-help"
        />
        <p id="original-prompt-help" className="mt-2 text-xs text-neutral-500">
          Tip: Include goals, constraints, style, and output format.
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-neutral-500">
            {input.length ? `${input.length} chars` : "Ready when you are"}
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isRefining}
            className="group inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 cursor-pointer"
            aria-live="polite"
          >
            <span className="inline-block">{isRefining ? "Refining…" : "Refine prompt"}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>

      {/* Output panel */}
      <section
        className="rounded-xl border border-neutral-200 bg-white p-4 md:p-5 transition-shadow duration-200 hover:shadow-sm"
        aria-labelledby="refined-prompt-title"
      >
        <div className="flex items-center justify-between">
          <h2 id="refined-prompt-title" className="font-sans text-sm font-medium text-neutral-700">
            Refined prompt
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!output}
              className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 transition-colors duration-150 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/15 cursor-pointer"
            >
              Copy
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <rect x="4" y="4" width="11" height="11" rx="2" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="mt-3 h-56 overflow-auto rounded-md border border-neutral-300 bg-neutral-50 p-3 font-mono text-xs leading-relaxed text-neutral-900"
          role="region"
          aria-live="polite"
          aria-busy={isRefining ? "true" : "false"}
        >
          {!output ? (
            <div className="h-full w-full grid place-items-center text-neutral-500">
              <p className="text-center">
                Your refined prompt will appear here.
                <br />
                Click “Refine prompt” to generate.
              </p>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap">{output}</pre>
          )}
        </div>
      </section>
    </div>
  )
}
