import CodeBlock, { InlineCode } from "./CodeBlock";

export default function BreakpointRange() {
  return (
    <div className="fl-mb-8/12">
      <h3 className="fl-text-base/lg font-medium text-sky-300 fl-mb-3/4 flex items-center fl-gap-2/3">
        <span className="fl-w-2/3 fl-h-2/3 rounded-full bg-sky-400"></span>
        Breakpoint Range
        <span className="fl-text-xs/sm font-normal text-sky-400/70 bg-sky-500/10 fl-px-2/3 fl-py-0.5/1 rounded-full">
          New
        </span>
      </h3>
      <p className="fl-text-sm/base text-slate-400 fl-mb-4/6">
        Limit fluid scaling to a specific breakpoint range. Values are clamped
        outside the range instead of scaling across the full viewport.
      </p>

      <div className="grid lg:grid-cols-2 fl-gap-4/6 fl-mb-4/6">
        <CodeBlock
          language="html"
          code={`<!-- Scale between md (768px) and lg (1024px) -->
<div class="fl-p-4/8--md-lg">
  Fluid only between md and lg
</div>

<!-- Typography: scale between sm and xl -->
<h1 class="fl-text-base/2xl--sm-xl">
  Controlled fluid heading
</h1>

<!-- Arbitrary pixel breakpoints -->
<div class="fl-gap-4/12--[768px-1024px]">
  Custom viewport range
</div>`}
        />
        <div className="bg-slate-900/50 border border-sky-800/30 fl-rounded-lg/xl fl-p-4/6">
          <p className="fl-text-xs/sm text-slate-500 fl-mb-3/4">
            Live demo — resize your browser:
          </p>

          {/* Demo: fl-p-4/8--md-lg */}
          <div className="fl-mb-3/4">
            <p className="fl-text-xs/sm text-sky-400/70 fl-mb-1/2 font-mono">
              fl-p-4/8--md-lg
            </p>
            <div className="fl-p-4/8--md-lg bg-sky-500/20 border border-sky-500/40 rounded-lg">
              <div className="bg-sky-500/30 fl-p-2/3 rounded text-center fl-text-xs/sm text-sky-200">
                Padding scales 1rem→2rem between 768px–1024px
              </div>
            </div>
          </div>

          {/* Demo: fl-text comparison */}
          <div className="fl-mb-3/4">
            <p className="fl-text-xs/sm text-sky-400/70 fl-mb-1/2 font-mono">
              fl-text-base/2xl--sm-xl
            </p>
            <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg fl-p-2/3">
              <p className="fl-text-base/2xl--sm-xl text-sky-200 text-center font-medium">
                Fluid heading
              </p>
            </div>
          </div>

          {/* Demo: comparison with global */}
          <div>
            <p className="fl-text-xs/sm text-slate-500 fl-mb-1/2">
              Comparison (global vs ranged):
            </p>
            <div className="space-y-2">
              <div className="fl-p-4/8 bg-slate-700/50 border border-slate-600/30 rounded text-center fl-text-xs/sm text-slate-400">
                fl-p-4/8 (375px–1440px)
              </div>
              <div className="fl-p-4/8--md-lg bg-sky-500/20 border border-sky-500/40 rounded text-center fl-text-xs/sm text-sky-300">
                fl-p-4/8--md-lg (768px–1024px)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Syntax explanation */}
      <div className="bg-sky-500/5 border border-sky-500/20 fl-rounded-lg/xl fl-p-4/6">
        <div className="flex fl-gap-3/4">
          <span className="fl-text-lg/xl">💡</span>
          <div>
            <h4 className="fl-text-sm/base font-medium text-sky-300 fl-mb-1/2">
              How it works
            </h4>
            <p className="fl-text-xs/sm text-slate-400 fl-mb-2/3">
              Append a double-dash{" "}
              <InlineCode className="text-sky-400 bg-sky-500/10">
                --
              </InlineCode>{" "}
              followed by the breakpoint range:
            </p>
            <div className="font-mono fl-text-xs/sm text-slate-300 bg-slate-900/50 fl-p-3/4 rounded-lg">
              <span className="text-emerald-400">fl-p-</span>
              <span className="text-amber-400">4</span>
              <span className="text-slate-400">/</span>
              <span className="text-amber-400">8</span>
              <span className="text-slate-500">--</span>
              <span className="text-pink-400">md-lg</span>
              <span className="text-slate-500 ml-4">
                {"// "}min/max--startBP-endBP
              </span>
            </div>
            <ul className="fl-text-xs/sm text-slate-400 fl-mt-2/3 space-y-1">
              <li>
                • Named breakpoints:{" "}
                <InlineCode className="text-sky-400 bg-sky-500/10">
                  fl-p-4/8--sm-lg
                </InlineCode>{" "}
                <InlineCode className="text-sky-400 bg-sky-500/10">
                  fl-text-base/2xl--md-xl
                </InlineCode>
              </li>
              <li>
                • Arbitrary pixel values:{" "}
                <InlineCode className="text-sky-400 bg-sky-500/10">
                  fl-p-4/8--[600px-1200px]
                </InlineCode>
              </li>
              <li>
                • Works with all fluid utilities:{" "}
                <InlineCode className="text-sky-400 bg-sky-500/10">
                  fl-text-
                </InlineCode>{" "}
                <InlineCode className="text-sky-400 bg-sky-500/10">
                  fl-m-
                </InlineCode>{" "}
                <InlineCode className="text-sky-400 bg-sky-500/10">
                  fl-gap-
                </InlineCode>{" "}
                etc.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
