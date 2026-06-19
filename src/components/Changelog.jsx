import { useState } from "react";
import CodeBlock, { InlineCode } from "./CodeBlock";

const releases = [
  {
    version: "1.1.6",
    date: "2026-06",
    tag: "next",
    changes: [
      {
        type: "new",
        text: "Dynamic CSS Fluid Variables — declare specs as custom properties inside the plugin block or in config with automatic theme extensions.",
        showGuide: true,
      },
    ],
  },
  {
    version: "1.1.5",
    date: "2026-05",
    changes: [
      {
        type: "new",
        text: "Layout viewport options — match exact design breakpoints while fluid scaling continues beyond",
        detail: "minLayoutViewport / maxLayoutViewport",
      },
      {
        type: "fix",
        text: "Fixed fluid text calculation for edge cases",
      },
    ],
  },
  {
    version: "1.1.3",
    date: "2026-05",
    changes: [
      {
        type: "feat",
        text: "Support fluid letter-spacing when fontSize theme includes letterSpacing",
      },
    ],
  },
  {
    version: "1.1.2",
    date: "2026-05",
    changes: [
      {
        type: "new",
        text: "Breakpoint range — limit fluid scaling to a specific viewport range",
        detail: "fl-p-4/8--md-lg",
      },
    ],
  },
  {
    version: "1.1.1",
    date: "2025-05",
    changes: [
      {
        type: "feat",
        text: "Support non-default numeric spacing values",
        detail: "fl-mt-4.5/10, fl-pb-6/15",
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2025-03",
    changes: [
      { type: "feat", text: "Initial release with full fluid utility support" },
      { type: "feat", text: "Tailwind CSS v4 compatibility" },
      { type: "feat", text: "Negative values via neg-fl-* prefix" },
      { type: "feat", text: "Arbitrary values with unit validation" },
      { type: "feat", text: "tailwind-merge integration" },
      { type: "feat", text: "Accessibility checks (SC 1.4.4)" },
    ],
  },
];

const typeColors = {
  new: "text-cyan-400 bg-cyan-500/10",
  feat: "text-emerald-400 bg-emerald-500/10",
  fix: "text-amber-400 bg-amber-500/10",
  breaking: "text-red-400 bg-red-500/10",
};

const typeLabels = {
  new: "New",
  feat: "Feat",
  fix: "Fix",
  breaking: "Breaking",
};

export default function Changelog() {
  return (
    <section id="changelog" className="fl-mb-12/20 scroll-mt-6">
      <h2 className="fl-text-xl/3xl font-semibold text-white fl-mb-4/6">
        Changelog
      </h2>

      <div className="space-y-0">
        {releases.map((release, i) => (
          <div key={release.version} className="relative fl-pl-6/8">
            {/* Timeline line */}
            {i < releases.length - 1 && (
              <div className="absolute left-[9px] lg:left-[11px] top-8 bottom-0 w-px bg-slate-800" />
            )}

            {/* Timeline dot */}
            <div
              className={`absolute left-0 top-[6px] fl-w-2.5/3 fl-h-2.5/3 rounded-full border-2 ${
                release.tag === "next"
                  ? "border-cyan-400 bg-cyan-400/20"
                  : "border-slate-600 bg-slate-900"
              }`}
            />

            {/* Content */}
            <div className="fl-pb-6/8">
              <div className="flex items-center fl-gap-2/3 fl-mb-2/3">
                <span className="fl-text-base/lg font-semibold text-white">
                  v{release.version}
                </span>
                {release.tag === "next" && (
                  <span className="fl-text-xs/sm font-medium text-cyan-400 bg-cyan-500/10 fl-px-2/2.5 fl-py-0.5/1 rounded-full">
                    Next
                  </span>
                )}
                <span className="fl-text-xs/sm text-slate-500">
                  {release.date}
                </span>
              </div>

              <ul className="fl-space-y-3/4">
                {release.changes.map((change, j) => (
                  <ChangeItem key={j} change={change} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChangeItem({ change }) {
  const [guideOpen, setGuideOpen] = useState(false);
  return (
    <li className="flex flex-col items-start w-full">
      <div className="flex items-start fl-gap-2/3">
        <span
          className={`fl-text-xs font-medium fl-px-1.5/2 fl-py-0.5 rounded shrink-0 mt-[2px] ${typeColors[change.type]}`}
        >
          {typeLabels[change.type]}
        </span>
        <span className="fl-text-sm/base text-slate-300">
          {change.text}
          {change.detail && (
            <>
              {" "}
              <InlineCode className="text-slate-400 bg-slate-800/80">
                {change.detail}
              </InlineCode>
            </>
          )}
        </span>
      </div>
      
      {change.showGuide && (
        <div className="w-full fl-mt-3/4">
          <button
            onClick={() => setGuideOpen(!guideOpen)}
            className="flex items-center fl-gap-1.5/2 text-cyan-400 hover:text-cyan-300 font-medium fl-text-xs/sm transition-colors duration-150 cursor-pointer"
          >
            <span>{guideOpen ? "Hide Setup Guide" : "Show Setup Guide"}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${guideOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {guideOpen && (
            <div className="w-full fl-mt-4/5 border-l-2 border-slate-800/80 fl-pl-4/5 fl-space-y-4/6 transition-all duration-300">
              <div>
                <h4 className="fl-text-xs/sm font-semibold text-slate-200 fl-mb-2/3">
                  1. Setup the Plugin & Custom Properties
                </h4>
                
                <p className="fl-text-xs/sm text-slate-400 fl-mb-2/3">
                  <strong>Option A: CSS-first approach</strong> (Recommended for TailwindCSS v4)
                  <br />
                  In your main CSS entrypoint (e.g., <InlineCode>index.css</InlineCode> or <InlineCode>global.css</InlineCode>), import Tailwind, load the plugin, and declare your fluid specs directly as CSS properties inside the plugin block:
                </p>
                
                <CodeBlock
                  language="css"
                  title="src/index.css"
                  code={`/* src/index.css */
@import "tailwindcss";
@plugin "fluid-tailwindcss" {
  /* 1. Typography */
  --text-head-1: 36px/60px;
  
  /* 2. Spacing (resolves automatically as a theme extension) */
  --spacing-gutter: 16px/32px;
  
  /* 3. Border Radius */
  --radius-card: 8px/20px;
  
  /* 4. Non-matching custom properties (available via var()) */
  --brand-section-min-height: 400px/600px;
}`}
                />
                
                <p className="fl-text-xs/sm text-slate-400 fl-my-2/3">
                  <strong>Option B: JavaScript-based configuration</strong> (TailwindCSS v3 or v4 config)
                  <br />
                  If you prefer or are using JS config, declare them in the plugins array of <InlineCode>tailwind.config.js</InlineCode>:
                </p>
                
                <CodeBlock
                  language="javascript"
                  title="tailwind.config.js"
                  code={`// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("fluid-tailwindcss")({
      variables: {
        "text-head-1": "36px/60px",
        "spacing-gutter": "16px/32px",
        "radius-card": "8px/20px",
        "brand-section-min-height": "400px/600px",
      },
    }),
  ],
};`}
                />
              </div>
              
              <div>
                <h4 className="fl-text-xs/sm font-semibold text-slate-200 fl-mb-2/3">
                  2. Use in your React Components
                </h4>
                <p className="fl-text-xs/sm text-slate-400 fl-mb-2/3">
                  Once declared, the plugin registers these directly with Tailwind. In your React components, you can use normal Tailwind class names for the matching prefixes, and standard <InlineCode>var()</InlineCode> functions for non-prefixed variables:
                </p>
                
                <CodeBlock
                  language="tsx"
                  title="src/components/HeroSection.tsx"
                  code={`// src/components/HeroSection.tsx
import React from "react";

export function HeroSection() {
  return (
    <section 
      className="bg-slate-900 text-white flex flex-col justify-center"
      // Consume non-matching fluid variables manually via inline styles:
      style={{ minHeight: "var(--fluid-brand-section-min-height)" }}
    >
      {/* 
        - p-gutter: Fluid padding scaling from 16px to 32px
        - rounded-card: Fluid border-radius scaling from 8px to 20px
      */}
      <div className="max-w-4xl mx-auto p-gutter bg-slate-800 rounded-card shadow-xl">
        
        {/* text-head-1: Fluid typography scaling from 36px to 60px */}
        <h1 className="text-head-1 font-extrabold leading-tight tracking-tight">
          Responsive design made simple.
        </h1>
        
        {/* mt-gutter: Fluid margin-top matching the spacing-gutter */}
        <p className="mt-gutter text-slate-300 text-lg">
          Teammates can use normal-looking Tailwind utility classes like{" "}
          <code className="text-pink-400">text-head-1</code> or{" "}
          <code className="text-pink-400">p-gutter</code>, while responsive{" "}
          <code className="text-pink-400">clamp()</code> sizing runs under the hood.
        </p>
        <button className="mt-gutter px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded font-semibold transition-colors">
          Get Started
        </button>
      </div>
    </section>
  );
}`}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
