import { useState } from "react";
import { schemes } from "./seedData";
import { EligibilityStatus, NavigatorActions, Scheme, SchemeAnswers } from "./government";

type Props = NavigatorActions & { onViewScheme?: (scheme: Scheme) => void };
const labels: Record<EligibilityStatus, string> = { likely: "Likely eligible", possible: "May be eligible", unlikely: "Criteria may not be met" };

export function SchemeRecommender({ onViewScheme, openOfficialUrl, askAssistant }: Props) {
  const [answers, setAnswers] = useState<SchemeAnswers>({ ageGroup: "", occupation: "", state: "", incomeRange: "" });
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState("");
  const set = (field: keyof SchemeAnswers, value: string) => setAnswers({ ...answers, [field]: value });
  const results = schemes.filter((scheme) => `${scheme.name} ${scheme.description} ${scheme.category.join(" ")}`.toLowerCase().includes(query.toLowerCase()));

  return <section className="scheme-recommender-page"><header><h1>Find Government Schemes You May Be Eligible For</h1><p>Answer a few questions to find potentially relevant schemes and learn how to apply.</p></header>
    <div className="scheme-questionnaire"><label>Age group<select value={answers.ageGroup} onChange={(e) => set("ageGroup", e.target.value)}><option value="">Select</option><option>Under 18</option><option>18-59</option><option>60 and above</option></select></label>
      <label>Occupation<select value={answers.occupation} onChange={(e) => set("occupation", e.target.value)}><option value="">Select</option><option>Student</option><option>Employee</option><option>Self-employed</option><option>Farmer</option><option>Business owner</option></select></label>
      <label>State or UT<input value={answers.state} onChange={(e) => set("state", e.target.value)} /></label>
      <label>Income range<select value={answers.incomeRange} onChange={(e) => set("incomeRange", e.target.value)}><option value="">Prefer not to say</option><option>Below 2.5 lakh</option><option>2.5-5 lakh</option><option>Above 5 lakh</option></select></label>
      <button type="button" onClick={() => setSubmitted(true)}>Find schemes</button></div>
    {submitted && <div className="scheme-results"><div className="search-row"><input aria-label="Search government schemes" placeholder="Search government schemes..." value={query} onChange={(e) => setQuery(e.target.value)} /><button type="button" onClick={() => askAssistant?.(`Find government schemes: ${query}`)}>Ask AI</button></div>
      <p className="trust-notice">Potentially eligible based on the information provided. Final eligibility is determined by the relevant government authority.</p>
      {results.map((scheme) => <article className="scheme-card" key={scheme.id}><span className={`eligibility eligibility-${scheme.matches(answers)}`}>{labels[scheme.matches(answers)]}</span><h2>{scheme.name}</h2><p>{scheme.description}</p><p><strong>Benefits:</strong> {scheme.benefits.join(", ")}</p><p><strong>Last verified:</strong> {scheme.lastVerified}</p><button type="button" onClick={() => onViewScheme?.(scheme)}>View details</button><button type="button" onClick={() => openOfficialUrl?.(scheme.officialUrl)}>Apply on official portal</button></article>)}</div>}
  </section>;
}
