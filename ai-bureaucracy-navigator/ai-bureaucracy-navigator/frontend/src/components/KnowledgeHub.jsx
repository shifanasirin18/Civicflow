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
  Layers,
  LayoutGrid,
  Globe,
  ArrowRight,
} from "lucide-react";
import { articles, guideSections } from "@/data/seedData";

const categories = [
  "Identity & Personal Documents",
  "Tamil Nadu Citizen Services",
  "Business & Employment",
  "Digital Services & Citizen Awareness",
  "Government Updates & Schemes",
  "Certificates",
  "Documents",
];

const sectionStyles = {
  "01": {
    banner: "bg-[#1d6fa5] text-white",
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    border: "border-blue-100 hover:border-blue-300",
    linkText: "text-[#1d6fa5] hover:text-blue-800",
  },
  "02": {
    banner: "bg-[#0d806a] text-white",
    badge: "border-teal-200 bg-teal-50 text-teal-700",
    border: "border-teal-100 hover:border-teal-300",
    linkText: "text-[#0d806a] hover:text-teal-800",
  },
  "03": {
    banner: "bg-[#1b7e3b] text-white",
    badge: "border-green-200 bg-green-50 text-green-700",
    border: "border-green-100 hover:border-green-300",
    linkText: "text-[#1b7e3b] hover:text-green-800",
  },
  "04": {
    banner: "bg-[#c86a10] text-white",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    border: "border-amber-100 hover:border-amber-300",
    linkText: "text-[#c86a10] hover:text-amber-800",
  },
  "05": {
    banner: "bg-[#11233d] text-white",
    badge: "border-slate-300 bg-slate-100 text-slate-800",
    border: "border-slate-200 hover:border-slate-400",
    linkText: "text-[#11233d] hover:text-slate-900",
  },
};

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
  const [viewMode, setViewMode] = useState("sections"); // "sections" or "grid"
  const [selectedId, setSelectedId] = useState(initialArticleId ?? "");

  const handleOpenUrl = (url) => {
    if (openOfficialUrl) {
      openOfficialUrl(url);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const filtered = useMemo(
    () =>
      articles.filter(
        (article) =>
          (!category || article.category === category) &&
          `${article.title} ${article.summary} ${article.category} ${article.sectionTitle ?? ""}`
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

  // Grouped by section for the Infographic / Citizen Guides view
  const groupedSections = useMemo(() => {
    return guideSections.map((sec) => {
      const sectionArticles = filtered.filter(
        (art) => art.sectionNumber === sec.number || art.category === sec.name
      );
      return {
        ...sec,
        articles: sectionArticles,
      };
    }).filter((sec) => sec.articles.length > 0);
  }, [filtered]);

  // ── Article Detailed View ───────────────────────────────────────────────────
  if (selected) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <button
          type="button"
          onClick={() => setSelectedId("")}
          className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft size={16} /> Back to 17 Citizen Guides
        </button>

        <article className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                selected.verified ? "bg-good-100 text-good-500" : "bg-amber-100 text-amber-700"
              }`}
            >
              {selected.verified ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              {selected.verified ? "Verified Government Guide" : "Needs Verification"}
            </span>
            <div className="flex items-center gap-2">
              {selected.sectionNumber && (
                <span className="rounded-md bg-canvas px-2.5 py-1 text-xs font-bold text-ink-soft border border-line">
                  Section {selected.sectionNumber}
                </span>
              )}
              <span className="text-xs font-semibold text-brand-600">{selected.category}</span>
            </div>
          </div>

          <div>
            <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">{selected.title}</h1>
            <p className="mt-2 text-base text-ink-soft leading-relaxed">{selected.summary}</p>
          </div>

          {/* Official Portals Banner */}
          {selected.officialPortals && selected.officialPortals.length > 0 && (
            <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-800 flex items-center gap-1.5">
                <Globe size={14} /> Official Government Portal(s)
              </h2>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {selected.officialPortals.map((url) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => handleOpenUrl(url)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-3 py-1.5 text-xs font-semibold text-brand-700 border border-brand-200 hover:bg-brand-500 hover:text-white transition-colors shadow-xs"
                  >
                    <span>{url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                    <ExternalLink size={12} />
                  </button>
                ))}
              </div>
            </div>
          )}

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
              {selected.documents?.map((item) => (
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
              {selected.steps?.map((item, idx) => (
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

          {selected.commonMistakes?.length > 0 && (
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

          {selected.faqs?.length > 0 && (
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
              <span><strong>Source:</strong> Verified Government Portals</span>
              <span><strong>Last verified:</strong> {selected.lastVerified}</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {selected.officialPortals && selected.officialPortals.length > 0 ? (
                selected.officialPortals.map((url) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => handleOpenUrl(url)}
                    className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-brand-600 transition-colors shadow-xs"
                  >
                    Open {url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "")} <ExternalLink size={12} />
                  </button>
                ))
              ) : selected.officialSource ? (
                <button
                  type="button"
                  onClick={() => handleOpenUrl(selected.officialSource)}
                  className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-brand-600 transition-colors shadow-xs"
                >
                  Open official source <ExternalLink size={12} />
                </button>
              ) : null}

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

  // ── Main Knowledge Hub View ─────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* CivicFlow Brand Header — Matching the Infographic Banner */}
      <div className="rounded-2xl bg-[#0c2340] p-6 text-white shadow-md sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm">
                <BookOpen size={22} />
              </span>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">CivicFlow</h1>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-300">
                  KNOWLEDGE HUB &nbsp;|&nbsp; 17 CITIZEN GUIDES
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Practical guides with official government portal links
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="mt-4 flex items-center gap-1 rounded-xl bg-white/10 p-1 sm:mt-0 self-start sm:self-center">
            <button
              type="button"
              onClick={() => setViewMode("sections")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewMode === "sections"
                  ? "bg-white text-[#0c2340] shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Layers size={14} /> 17 Guides
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-white text-[#0c2340] shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <LayoutGrid size={14} /> Grid Cards
            </button>
          </div>
        </div>
      </div>

      {/* Search & AI Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            type="text"
            placeholder="Search 17 citizen guides or government information..."
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

      {/* Category Pills */}
      <nav className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none" aria-label="Knowledge categories">
        <button
          type="button"
          onClick={() => setCategory("")}
          className={`focus-ring shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
            !category ? "bg-brand-500 text-white" : "border border-line bg-surface text-ink-soft hover:bg-canvas"
          }`}
        >
          All (17 Guides)
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

      {/* ── SECTIONS / 17 CITIZEN GUIDES VIEW (Matches the Infographic) ─────────── */}
      {viewMode === "sections" ? (
        <div className="space-y-8">
          {groupedSections.map((section) => {
            const style = sectionStyles[section.number] || sectionStyles["01"];
            return (
              <section key={section.id} className="space-y-3">
                {/* Colored Section Header Banner */}
                <div className={`rounded-xl px-4 py-3 font-display text-sm font-bold tracking-wider shadow-xs ${style.banner}`}>
                  {section.title}
                </div>

                {/* Section Guide Cards */}
                <div className="space-y-3">
                  {section.articles.map((article, idx) => (
                    <div
                      key={article.id}
                      className={`group rounded-2xl border bg-surface p-4 sm:p-5 shadow-xs transition-all hover:shadow-md ${style.border}`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-3.5">
                          {/* Number Circle Badge */}
                          <div
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-bold text-xs shadow-xs ${style.badge}`}
                          >
                            {article.itemNumber || idx + 1}
                          </div>

                          <div className="space-y-1">
                            <h2
                              onClick={() => openArticle(article)}
                              className="font-display text-base font-bold text-ink cursor-pointer hover:text-brand-600 transition-colors"
                            >
                              {article.title}
                            </h2>
                            <p className="text-sm text-ink-soft leading-relaxed">
                              {article.summary}
                            </p>

                            {/* Official Portal(s) Block */}
                            {article.officialPortals && article.officialPortals.length > 0 && (
                              <div className="pt-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                                  OFFICIAL PORTAL(S):
                                </span>
                                <div className="mt-1 flex flex-wrap gap-2">
                                  {article.officialPortals.map((url) => (
                                    <button
                                      key={url}
                                      type="button"
                                      onClick={() => handleOpenUrl(url)}
                                      className={`inline-flex items-center gap-1 text-xs font-medium hover:underline ${style.linkText}`}
                                    >
                                      <span>{url}</span>
                                      <ExternalLink size={11} className="inline opacity-70" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Read Full Guide Action Button */}
                        <button
                          type="button"
                          onClick={() => openArticle(article)}
                          className="focus-ring self-end sm:self-center shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-line bg-canvas px-3.5 py-1.5 text-xs font-semibold text-ink hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all"
                        >
                          <span>Full guide</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {groupedSections.length === 0 && (
            <div className="rounded-2xl border border-line bg-surface p-8 text-center text-sm text-ink-soft">
              No citizen guides found matching "{query}".
            </div>
          )}
        </div>
      ) : (
        /* ── GRID CARDS VIEW ─────────────────────────────────────────────────── */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => {
            const style = sectionStyles[article.sectionNumber] || sectionStyles["01"];
            return (
              <article
                key={article.id}
                className={`flex flex-col justify-between rounded-2xl border bg-surface p-6 shadow-xs transition-all hover:-translate-y-1 hover:shadow-md ${style.border}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-brand-600">
                      {article.sectionNumber ? `Section ${article.sectionNumber}` : article.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        article.verified ? "bg-good-100 text-good-500" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {article.verified ? "Verified" : "Check details"}
                    </span>
                  </div>

                  <h2 className="mt-3 font-display text-lg font-bold text-ink">{article.title}</h2>
                  <p className="mt-1.5 text-sm text-ink-soft leading-relaxed line-clamp-3">{article.summary}</p>

                  {article.officialPortals && article.officialPortals.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-line/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                        Official Portal:
                      </span>
                      <p className="mt-0.5 text-xs text-brand-600 font-medium truncate">
                        {article.officialPortals[0]}
                      </p>
                    </div>
                  )}
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
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-2xl border border-line bg-surface p-8 text-center text-sm text-ink-soft">
              No articles found matching "{query}".
            </div>
          )}
        </div>
      )}

      {/* Footer Disclaimer — Matching the Infographic Bottom Note */}
      <div className="pt-4 pb-2 text-center">
        <p className="text-xs text-ink-soft italic">
          Verify current eligibility, fees and procedures on the official portal before applying.
        </p>
      </div>
    </div>
  );
}
