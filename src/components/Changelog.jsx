import { InlineCode } from "./CodeBlock";

const releases = [
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

              <ul className="fl-space-y-1.5/2">
                {release.changes.map((change, j) => (
                  <li key={j} className="flex items-start fl-gap-2/3">
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
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
