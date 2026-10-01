import { useMemo, useState } from "react";
import { articles } from "./seedData";
import { KnowledgeArticle, NavigatorActions } from "./government";

type Props = NavigatorActions & { initialArticleId?: string; onArticleChange?: (article: KnowledgeArticle) => void };
const categories = ["Documents", "Government Services", "Business", "Property", "Education", "Tax & Finance", "Family & Life Events", "Transport", "Government Schemes", "Certificates", "Employment"];

export function KnowledgeHub({ initialArticleId, onArticleChange, addToRoadmap, addToChecklist, addToTracker, openOfficialUrl, askAssistant }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [selectedId, setSelectedId] = useState(initialArticleId ?? "");
  const filtered = useMemo(() => articles.filter((article) => (!category || article.category === category) && `${article.title} ${article.summary} ${article.category}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const selected = articles.find((article) => article.id === selectedId);
  const openArticle = (article: KnowledgeArticle) => { setSelectedId(article.id); onArticleChange?.(article); };

  if (selected) return <article className="knowledge-article"><button type="button" className="back-link" onClick={() => setSelectedId("")}>Back to Knowledge Hub</button>
    <p className={selected.verified ? "trust-badge verified" : "trust-badge unverified"}>{selected.verified ? "Verified Government Information" : "Needs Verification"}</p>
    <h1>{selected.title}</h1><p className="article-summary">{selected.summary}</p>
    <section><h2>Who needs it?</h2><p>{selected.whoNeedsIt}</p></section><section><h2>Eligibility</h2><p>{selected.eligibility}</p></section>
    <section><h2>Required documents</h2><ul>{selected.documents.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section><h2>Step-by-step process</h2><ol>{selected.steps.map((item) => <li key={item}>{item}</li>)}</ol></section>
    <section><h2>Where to apply</h2><p>{selected.whereToApply}</p><p><strong>Online / offline:</strong> {selected.mode}</p><p><strong>Applicable fees:</strong> {selected.fees}</p><p><strong>Expected processing time:</strong> {selected.processingTime}</p></section>
    <section><h2>Common mistakes</h2><ul>{selected.commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section><h2>FAQs</h2>{selected.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
    <footer><p><strong>Source:</strong> Official Government Website</p><p><strong>Last verified:</strong> {selected.lastVerified}</p><button type="button" onClick={() => openOfficialUrl?.(selected.officialSource)}>Open official source</button>
      {selected.service && <><button type="button" onClick={() => addToRoadmap?.(selected.service!)}>Add to my roadmap</button><button type="button" onClick={() => addToChecklist?.(selected.service!.documents, selected.title)}>Add documents to checklist</button><button type="button" onClick={() => addToTracker?.(selected.service!)}>Add to application tracker</button></>}
    </footer></article>;

  return <section className="knowledge-hub-page"><header><h1>Government Knowledge Hub</h1><p>Understand government procedures in simple language.</p></header>
    <div className="knowledge-search"><input placeholder="Search government information..." value={query} onChange={(e) => setQuery(e.target.value)} /><button type="button" onClick={() => askAssistant?.(`Explain this government procedure: ${query}`)}>Ask AI</button></div>
    <nav className="knowledge-categories" aria-label="Knowledge categories"><button type="button" className={!category ? "is-active" : ""} onClick={() => setCategory("")}>All</button>{categories.map((item) => <button type="button" className={category === item ? "is-active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</nav>
    <div className="article-grid">{filtered.map((article) => <article className="article-card" key={article.id}><p className={article.verified ? "trust-badge verified" : "trust-badge unverified"}>{article.verified ? "Verified" : "Needs verification"}</p><p className="article-category">{article.category}</p><h2>{article.title}</h2><p>{article.summary}</p><p>Last verified: {article.lastVerified}</p><button type="button" onClick={() => openArticle(article)}>Read guide</button></article>)}</div>
  </section>;
}
