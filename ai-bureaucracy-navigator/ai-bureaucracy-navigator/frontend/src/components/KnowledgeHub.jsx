import { useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ExternalLink,
  PlusCircle,
  Clock,
  HelpCircle,
  Bot,
  FileCheck,
} from "lucide-react";
import { articles } from "@/data/seedData";


const categories = [
  "Documents",
  "Government Services",
  "Business",
  "Property",
  "Education",
  "Tax & Finance",
  "Family & Life Events",
  "Transport",
  "Government Schemes",
  "Certificates",
  "Employment",
];

export function KnowledgeHub({
  initialArticleId,
  onArticleChange,
  addToRoadmap,
  addToChecklist,
  addToTracker,
  openOfficialUrl,
  askAssistant,
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [selectedId, setSelectedId] = useState(initialArticleId ?? "");

  const filtered = useMemo(
    () =>
      articles.filter(
        (article) =>
          (!category || article.category === category) &&
          `${article.title} ${article.summary} ${article.category}`
            .toLowerCase()
            .includes(query.toLowerCase())
      ),
    [category, query]
  );

  const selected = articles.find((article) => article.id === selectedId);

  const openArticle = (article) => {
    setSelectedId(article.id);
    onArticleChange?.(article);
  };

  // Article Detailed View
  if (selected) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <button
          type="button"
          onClick={() => setSelectedId("")}
          className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft size={16} /> Back to Knowledge Hub
        </button>

        <article className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                selected.verified ? "bg-good-100 text-good-500" : "bg-amber-100 text-amber-700"
              }`}
            >
              {selected.verified ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              {selected.verified ? "Verified Government Information" : "Needs Verification"}
            </span>
            <span className="text-xs font-medium text-ink-soft">{selected.category}</span>
          </div>

          <div>
            <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">{selected.title}</h1>
            <p className="mt-2 text-base text-ink-soft leading-relaxed">{selected.summary}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <section className="rounded-xl bg-canvas p-4 border border-line/60">
              <h2 className="font-display text-sm font-bold text-ink uppercase tracking-wider">Who Needs It?</h2>
              <p className="mt-1 text-sm text-ink-soft">{selected.whoNeedsIt}</p>
            </section>

            <section className="rounded-xl bg-canvas p-4 border border-line/60">
              <h2 className="font-display text-sm font-bold text-ink uppercase tracking-wider">Eligibility</h2>
              <p className="mt-1 text-sm text-ink-soft">{selected.eligibility}</p>
            </section>
          </div>

          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold text-ink">Required Documents</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {selected.documents.map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-xl border border-line bg-canvas/50 px-3.5 py-2 text-sm text-ink font-medium">
                  <FileCheck size={16} className="text-brand-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-ink">Step-by-Step Process</h2>
            <ol className="space-y-2">
              {selected.steps.map((item, idx) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5 text-sm text-ink">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <span className="mt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-xl bg-canvas p-5 border border-line/60 space-y-2 text-sm">
            <h2 className="font-display text-sm font-bold text-ink uppercase tracking-wider">Where &amp; How to Apply</h2>
            <p className="text-ink-soft">{selected.whereToApply}</p>
            <div className="grid gap-2 pt-2 sm:grid-cols-3 text-xs border-t border-line/60">
              <div>
                <strong className="text-ink">Online / Offline: </strong>
                <span className="text-ink-soft">{selected.mode}</span>
              </div>
              <div>
                <strong className="text-ink">Applicable Fees: </strong>
                <span className="text-ink-soft">{selected.fees}</span>
              </div>
              <div>
                <strong className="text-ink">Processing Time: </strong>
                <span className="text-ink-soft">{selected.processingTime}</span>
              </div>
            </div>
          </section>

          {selected.commonMistakes.length > 0 && (
            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-ink">Common Mistakes to Avoid</h2>
              <ul className="space-y-1.5">
                {selected.commonMistakes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-red-600 bg-red-50/60 rounded-xl p-3 border border-red-200">
                    <AlertCircle size={16} className="shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {selected.faqs.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold text-ink">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {selected.faqs.map((faq) => (
                  <details key={faq.question} className="group rounded-xl border border-line bg-canvas p-4 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-ink text-sm">
                      <span className="flex items-center gap-2">
                        <HelpCircle size={16} className="text-brand-500" />
                        {faq.question}
                      </span>
                    </summary>
                    <p className="mt-2 text-sm text-ink-soft pl-6">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <footer className="border-t border-line pt-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-soft">
              <span><strong>Source:</strong> Official Government Website</span>
              <span><strong>Last verified:</strong> {selected.lastVerified}</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {openOfficialUrl && (
                <button
                  type="button"
                  onClick={() => openOfficialUrl(selected.officialSource)}
                  className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-brand-600 transition-colors"
                >
                  Open official source <ExternalLink size={12} />
                </button>
              )}
              {selected.service && (
                <>
                  {addToRoadmap && (
                    <button
                      type="button"
                      onClick={() => addToRoadmap(selected.service)}
                      className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-4 py-2.5 text-xs font-semibold text-ink hover:bg-canvas transition-colors"
                    >
                      <PlusCircle size={14} /> Add to my roadmap
                    </button>
                  )}
                  {addToChecklist && (
                    <button
                      type="button"
                      onClick={() => addToChecklist(selected.service.documents, selected.title)}
                      className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-4 py-2.5 text-xs font-semibold text-ink hover:bg-canvas transition-colors"
                    >
                      <CheckCircle2 size={14} /> Add documents to checklist
                    </button>
                  )}
                  {addToTracker && (
                    <button
                      type="button"
                      onClick={() => addToTracker(selected.service)}
                      className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-4 py-2.5 text-xs font-semibold text-ink hover:bg-canvas transition-colors"
                    >
                      <Clock size={14} /> Add to application tracker
                    </button>
                  )}
                </>
              )}
            </div>
          </footer>
        </article>
      </div>
    );
  }

  // Articles List Grid
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl border border-line bg-gradient-to-r from-brand-500/10 via-teal-50 to-brand-100/40 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md">
            <BookOpen size={22} />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Government Knowledge Hub</h1>
            <p className="mt-1 text-sm text-ink-soft sm:text-base">
              Understand complex government procedures, eligibility, and required documents in plain language.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            type="text"
            placeholder="Search government information..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="focus-ring w-full rounded-xl border border-line bg-surface py-3 pl-9 pr-3 text-sm"
          />
        </div>

        {askAssistant && (
          <button
            type="button"
            onClick={() => askAssistant(`Explain this government procedure: ${query || "general guidance"}`)}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
          >
            <Bot size={16} /> Ask AI
          </button>
        )}
      </div>

      {/* Category Filter Horizontal Scroll */}
      <nav className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none" aria-label="Knowledge categories">
        <button
          type="button"
          onClick={() => setCategory("")}
          className={`focus-ring shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
            !category ? "bg-brand-500 text-white" : "border border-line bg-surface text-ink-soft hover:bg-canvas"
          }`}
        >
          All
        </button>
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setCategory(item)}
            className={`focus-ring shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              category === item ? "bg-brand-500 text-white" : "border border-line bg-surface text-ink-soft hover:bg-canvas"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Article Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <article
            key={article.id}
            className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-xs transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-brand-600">{article.category}</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    article.verified ? "bg-good-100 text-good-500" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {article.verified ? "Verified" : "Needs verification"}
                </span>
              </div>

              <h2 className="mt-3 font-display text-lg font-bold text-ink">{article.title}</h2>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed line-clamp-3">{article.summary}</p>
            </div>

            <div className="mt-5 border-t border-line/60 pt-4 flex items-center justify-between">
              <span className="text-xs text-ink-soft">Verified: {article.lastVerified}</span>
              <button
                type="button"
                onClick={() => openArticle(article)}
                className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-brand-50 px-3.5 py-2 text-xs font-semibold text-brand-600 hover:bg-brand-500 hover:text-white transition-colors"
              >
                Read guide
              </button>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-line bg-surface p-8 text-center text-sm text-ink-soft">
            No articles found matching "{query}".
          </div>
        )}
      </div>
    </div>
  );
}
