import type { Metadata } from "next"
import { PromptWorkbench } from "@/components/prompt-workbench"

export const metadata: Metadata = {
  title: "Prompt Improver — Dark",
  description: "Refine AI prompts with a clean, dark, and modern interface.",
}

export default function PromptPage() {
  return (
    <main className="min-h-dvh bg-neutral-950 text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div aria-hidden className="h-6 w-6 rounded-sm bg-white" />
            <span className="text-sm font-medium tracking-wide">Prompt Improver</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-neutral-400 md:flex">
            <a href="#workbench" className="transition-colors hover:text-white">
              Workbench
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-white">
              How it works
            </a>
            <a href="#faq" className="transition-colors hover:text-white">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-8 pt-10 md:pt-16">
        <div className="max-w-2xl">
          <h1 className="text-pretty text-3xl font-semibold leading-tight md:text-4xl">
            Elevate your AI prompts with a focused, distraction-free workspace
          </h1>
          <p className="mt-3 max-w-xl text-balance text-sm leading-relaxed text-neutral-400 md:text-base">
            Craft clearer intent, add context, and guide outputs. Designed for dark mode and built to avoid the typical
            messenger layout.
          </p>
        </div>
        <div className="mt-8" id="workbench">
          <PromptWorkbench />
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-neutral-900 p-5 transition-colors">
            <h3 className="text-sm font-medium">1. Paste your prompt</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              Start with your original idea. Keep it simple—details can be layered in.
            </p>
          </div>
          <div className="rounded-lg bg-neutral-900 p-5 transition-colors">
            <h3 className="text-sm font-medium">2. Add constraints</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              Specify audience, tone, format, and success criteria to guide the model.
            </p>
          </div>
          <div className="rounded-lg bg-neutral-900 p-5 transition-colors">
            <h3 className="text-sm font-medium">3. Generate refinement</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              Get a sharper version you can copy, reuse, and iterate on without friction.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-lg bg-neutral-900 p-6">
          <details className="group">
            <summary className="cursor-pointer list-none text-sm font-medium marker:hidden">
              Is this using AI to refine my prompt?
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              This preview runs locally to demonstrate the UI/UX. You can connect your preferred model later.
            </p>
          </details>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-neutral-400">
          © {new Date().getFullYear()} Prompt Improver
        </div>
      </footer>
    </main>
  )
}
