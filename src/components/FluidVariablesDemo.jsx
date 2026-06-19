import { useState, useEffect, useRef } from "react";
import CodeBlock, { InlineCode } from "./CodeBlock";

export default function FluidVariablesDemo() {
  const demoRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [computedValues, setComputedValues] = useState({
    fontSize: "36px",
    padding: "16px",
    borderRadius: "8px",
    minHeight: "400px",
  });

  useEffect(() => {
    const updateValues = () => {
      setViewportWidth(window.innerWidth);
      if (demoRef.current) {
        const style = window.getComputedStyle(demoRef.current);
        const header = demoRef.current.querySelector("h1");

        setComputedValues({
          fontSize: header ? window.getComputedStyle(header).fontSize : "36px",
          padding: style.padding || "16px",
          borderRadius: style.borderRadius || "8px",
          minHeight: style.minHeight || "400px",
        });
      }
    };

    window.addEventListener("resize", updateValues);

    // Defer the initial update to avoid synchronous setState during effect setup
    const timer = setTimeout(updateValues, 50);

    return () => {
      window.removeEventListener("resize", updateValues);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="fluid-variables" className="fl-mb-12/20 scroll-mt-6">
      <div className="flex items-center fl-gap-3/4 fl-mb-4/6">
        <h2 className="fl-text-xl/3xl font-semibold text-white">
          Fluid CSS Variables
        </h2>
        <span className="fl-text-xs font-semibold text-cyan-400 bg-cyan-500/10 fl-px-2/2.5 fl-py-0.5/1 rounded-full border border-cyan-500/20">
          New in v1.1.6
        </span>
      </div>

      <p className="fl-text-sm/base text-slate-400 fl-mb-6/8">
        Declare fluid specs directly inside your CSS{" "}
        <InlineCode>@plugin</InlineCode> block or JavaScript configuration. The
        plugin automatically generates responsive{" "}
        <InlineCode>clamp()</InlineCode> CSS variables and maps them to Tailwind
        theme extensions.
      </p>

      {/* Configuration Code Blocks */}
      <div className="grid lg:grid-cols-2 fl-gap-6/8 fl-mb-8/12">
        <div>
          <h3 className="fl-text-sm/base font-semibold text-slate-200 fl-mb-2/3">
            Option A: CSS-first (TailwindCSS v4)
          </h3>
          <CodeBlock
            language="css"
            title="src/index.css"
            code={`@import "tailwindcss";
@plugin "fluid-tailwindcss" {
  /* 1. Typography */
  --text-head-1: 36px/60px;
  
  /* 2. Spacing (theme extension) */
  --spacing-gutter: 16px/32px;
  
  /* 3. Border Radius */
  --radius-card: 8px/20px;
  
  /* 4. Non-matching custom properties */
  --brand-section-min-height: 400px/600px;
}`}
          />
        </div>

        <div>
          <h3 className="fl-text-sm/base font-semibold text-slate-200 fl-mb-2/3">
            Option B: JS-based Configuration
          </h3>
          <CodeBlock
            language="javascript"
            title="tailwind.config.js"
            code={`module.exports = {
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
      </div>

      {/* Live Demo Showcase */}
      <div className="fl-mb-6/10">
        <h3 className="fl-text-base/lg font-medium text-slate-200 fl-mb-3/4">
          Live Demo Showcase
        </h3>

        <p className="fl-text-sm/base text-slate-400 fl-mb-4/6">
          Below is a live rendering of the <InlineCode>HeroSection</InlineCode>{" "}
          component. Try resizing your browser window width to see the fluid
          variables scale smoothly.
        </p>

        <div className="grid xl:grid-cols-3 fl-gap-6/8">
          {/* Live Component Render */}
          <div className="xl:col-span-2 flex flex-col justify-center">
            <div className="fl-text-xs/sm text-slate-500 fl-mb-2/3 flex items-center justify-between">
              <span>Preview: HeroSection Component</span>
              <span className="text-cyan-400 font-mono">
                Viewport: {viewportWidth}px
              </span>
            </div>

            <section
              ref={demoRef}
              className="bg-slate-900/60 border border-slate-800 text-white flex flex-col justify-center rounded-xl p-2 transition-all duration-300"
              style={{ minHeight: "var(--fluid-brand-section-min-height)" }}
            >
              {/* 
                - p-gutter: Fluid padding scaling from 16px to 32px
                - rounded-card: Fluid border-radius scaling from 8px to 20px
              */}
              <div className="max-w-4xl mx-auto p-gutter bg-slate-800/80 rounded-card shadow-2xl border border-slate-700/30">
                {/* text-head-1: Fluid typography scaling from 36px to 60px */}
                <h1 className="text-head-1 font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-slate-100 to-slate-300">
                  Responsive design made simple.
                </h1>

                {/* mt-gutter: Fluid margin-top matching the spacing-gutter */}
                <p className="mt-gutter text-slate-300 text-sm/base">
                  Teammates can use normal-looking Tailwind utility classes like{" "}
                  <code className="text-pink-400 font-mono bg-pink-950/30 px-1.5 py-0.5 rounded">
                    text-head-1
                  </code>{" "}
                  or{" "}
                  <code className="text-pink-400 font-mono bg-pink-950/30 px-1.5 py-0.5 rounded">
                    p-gutter
                  </code>
                  , while responsive{" "}
                  <code className="text-pink-400 font-mono bg-pink-950/30 px-1.5 py-0.5 rounded">
                    clamp()
                  </code>{" "}
                  sizing runs under the hood.
                </p>
                <button className="mt-gutter px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded font-semibold transition-colors cursor-pointer shadow-lg shadow-indigo-600/20">
                  Get Started
                </button>
              </div>
            </section>
          </div>

          {/* Real-time Computed Values Monitor */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl fl-p-4/6 flex flex-col justify-between">
            <div>
              <h4 className="fl-text-sm/base font-semibold text-slate-200 fl-mb-1/2 flex items-center fl-gap-2/3">
                <span className="fl-w-2/3 fl-h-2/3 rounded-full bg-cyan-400 animate-pulse"></span>
                Computed CSS Monitor
              </h4>
              <p className="fl-text-xs/sm text-slate-500 fl-mb-4/6">
                Real-time values computed by the browser:
              </p>

              <div className="space-y-4 font-mono fl-text-xs/sm">
                <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                  <div className="text-slate-400 font-sans mb-1 text-[11px] uppercase tracking-wider">
                    Font Size (
                    <code className="text-pink-400">text-head-1</code>)
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-500">--fluid-text-head-1</span>
                    <span className="text-cyan-400 font-semibold text-sm">
                      {computedValues.fontSize}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                  <div className="text-slate-400 font-sans mb-1 text-[11px] uppercase tracking-wider">
                    Padding/Margin (
                    <code className="text-pink-400">p-gutter</code>)
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-500">
                      --fluid-spacing-gutter
                    </span>
                    <span className="text-cyan-400 font-semibold text-sm">
                      {computedValues.padding}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                  <div className="text-slate-400 font-sans mb-1 text-[11px] uppercase tracking-wider">
                    Border Radius (
                    <code className="text-pink-400">rounded-card</code>)
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-500">--fluid-radius-card</span>
                    <span className="text-cyan-400 font-semibold text-sm">
                      {computedValues.borderRadius}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                  <div className="text-slate-400 font-sans mb-1 text-[11px] uppercase tracking-wider">
                    Min Height (
                    <code className="text-pink-400">
                      {"style={{ minHeight: ... }}"}
                    </code>
                    )
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-500">
                      --fluid-brand-section...
                    </span>
                    <span className="text-cyan-400 font-semibold text-sm">
                      {computedValues.minHeight}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="fl-mt-4/6 fl-pt-3/4 border-t border-slate-800/60 text-center">
              <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-sans">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                  />
                </svg>
                Resize browser window to view scaling
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Component Usage Code Block */}
      <div>
        <h3 className="fl-text-sm/base font-semibold text-slate-200 fl-mb-2/3">
          React Usage
        </h3>
        <CodeBlock
          language="tsx"
          title="src/components/HeroSection.tsx"
          code={`import React from "react";

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
    </section>
  );
}
