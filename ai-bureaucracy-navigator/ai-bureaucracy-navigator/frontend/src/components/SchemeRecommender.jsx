import { useState } from "react";
import { Search, Bot, ExternalLink, ShieldCheck, Filter, ArrowRight, Award } from "lucide-react";
import { schemes } from "@/data/seedData";


const labels = {
  likely: "Likely eligible",
  possible: "May be eligible",
  unlikely: "Criteria may not be met",
};

const badgeStyles = {
  likely: "bg-good-100 text-good-500 border-good-500/30",
  possible: "bg-warn-100 text-warn-500 border-warn-500/30",
  unlikely: "bg-slate-100 text-slate-600 border-slate-200",
};

export function SchemeRecommender({ onViewScheme, openOfficialUrl, askAssistant }) {
  const [answers, setAnswers] = useState({
    ageGroup: "",
    occupation: "",
    state: "",
    incomeRange: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState("");

  const set = (field, value) => setAnswers({ ...answers, [field]: value });

  const results = schemes.filter((scheme) =>
    `${scheme.name} ${scheme.description} ${scheme.category.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-line bg-gradient-to-r from-teal-500/10 via-brand-50 to-brand-500/10 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md">
            <Award size={22} />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Government Schemes Recommender
            </h1>
            <p className="mt-1 text-sm text-ink-soft sm:text-base">
              Answer a few simple questions to find relevant welfare schemes, financial aid, and benefits.
            </p>
          </div>
        </div>
      </div>

      {/* Questionnaire Form */}
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-xs sm:p-8">
        <div className="mb-6 flex items-center gap-2 border-b border-line pb-4">
          <Filter size={18} className="text-brand-500" />
          <h2 className="font-display text-lg font-bold text-ink">Find Eligible Schemes</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Age group
            <select
              value={answers.ageGroup}
              onChange={(e) => set("ageGroup", e.target.value)}
              className="focus-ring mt-1.5 w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm font-normal text-ink"
            >
              <option value="">Select age group</option>
              <option value="Under 18">Under 18</option>
              <option value="18-59">18-59</option>
              <option value="60 and above">60 and above</option>
            </select>
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Occupation
            <select
              value={answers.occupation}
              onChange={(e) => set("occupation", e.target.value)}
              className="focus-ring mt-1.5 w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm font-normal text-ink"
            >
              <option value="">Select occupation</option>
              <option value="Student">Student</option>
              <option value="Employee">Employee</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Farmer">Farmer</option>
              <option value="Business owner">Business owner</option>
            </select>
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
            State or UT
            <input
              type="text"
              value={answers.state}
              onChange={(e) => set("state", e.target.value)}
              placeholder="e.g. Tamil Nadu, Delhi"
              className="focus-ring mt-1.5 w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm font-normal text-ink"
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Income range
            <select
              value={answers.incomeRange}
              onChange={(e) => set("incomeRange", e.target.value)}
              className="focus-ring mt-1.5 w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm font-normal text-ink"
            >
              <option value="">Prefer not to say</option>
              <option value="Below 2.5 lakh">Below 2.5 lakh</option>
              <option value="2.5-5 lakh">2.5 - 5 lakh</option>
              <option value="Above 5 lakh">Above 5 lakh</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Find schemes <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Results Section */}
      {submitted && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input
                type="text"
                aria-label="Search government schemes"
                placeholder="Search government schemes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="focus-ring w-full rounded-xl border border-line bg-surface py-2.5 pl-9 pr-3 text-sm"
              />
            </div>

            {askAssistant && (
              <button
                type="button"
                onClick={() => askAssistant(`Find government schemes: ${query || answers.occupation || "all"}`)}
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
              >
                <Bot size={16} /> Ask AI Assistant
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-800">
            <ShieldCheck size={16} className="shrink-0 text-amber-600" />
            <span>
              Potentially eligible based on the information provided. Final eligibility is determined by the relevant government authority.
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((scheme) => {
              const status = scheme.matches(answers);
              return (
                <div
                  key={scheme.id}
                  className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-xs transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${badgeStyles[status]}`}>
                        {labels[status]}
                      </span>
                      <span className="text-xs text-ink-soft">Last verified: {scheme.lastVerified}</span>
                    </div>

                    <h3 className="mt-3 font-display text-xl font-bold text-ink">{scheme.name}</h3>
                    <p className="mt-1 text-sm text-ink-soft leading-relaxed">{scheme.description}</p>

                    <div className="mt-4 rounded-xl bg-canvas p-3 border border-line/60 space-y-2 text-xs">
                      <div>
                        <strong className="text-ink">Benefits: </strong>
                        <span className="text-ink-soft">{scheme.benefits.join(", ")}</span>
                      </div>
                      <div>
                        <strong className="text-ink">Required Documents: </strong>
                        <span className="text-ink-soft">{scheme.documents.join(", ")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line/60 pt-4">
                    {onViewScheme && (
                      <button
                        type="button"
                        onClick={() => onViewScheme(scheme)}
                        className="focus-ring rounded-xl border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink hover:bg-canvas transition-colors"
                      >
                        View details
                      </button>
                    )}
                    {openOfficialUrl && (
                      <button
                        type="button"
                        onClick={() => openOfficialUrl(scheme.officialUrl)}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-600 transition-colors"
                      >
                        Apply on official portal <ExternalLink size={12} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {results.length === 0 && (
              <div className="col-span-full rounded-2xl border border-line bg-surface p-8 text-center text-sm text-ink-soft">
                No schemes found matching "{query}".
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
