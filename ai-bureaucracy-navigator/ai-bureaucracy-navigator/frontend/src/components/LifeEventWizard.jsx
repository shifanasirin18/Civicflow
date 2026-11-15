import { useState } from "react";
import {
  Baby,
  FileText,
  Heart,
  Home,
  Briefcase,
  GraduationCap,
  Building2,
  Sun,
  Users,
  Car,
  MapPin,
  Compass,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  ExternalLink,
  PlusCircle,
  Clock,
  Sparkles,
  BookmarkCheck,
} from "lucide-react";
import { lifeEvents } from "@/data/seedData";


const statusConfig = {
  required: { label: "Required", tone: "bg-red-50 text-red-700 border-red-200" },
  recommended: { label: "Recommended", tone: "bg-amber-50 text-amber-700 border-amber-200" },
  conditional: { label: "Applicable depending on situation", tone: "bg-blue-50 text-blue-700 border-blue-200" },
};

function getIcon(name) {
  switch (name) {
    case "baby": return Baby;
    case "document": return FileText;
    case "marriage": return Heart;
    case "property": return Home;
    case "business": return Briefcase;
    case "education": return GraduationCap;
    case "job": return Building2;
    case "retirement": return Sun;
    case "family": return Users;
    case "vehicle": return Car;
    case "moving": return MapPin;
    default: return Compass;
  }
}

export function LifeEventWizard({
  onOpenKnowledge,
  onSaveJourney,
  addToRoadmap,
  addToChecklist,
  addToTracker,
  openOfficialUrl,
}) {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [complete, setComplete] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const begin = (event) => {
    setSelected(event);
    setStep(1);
    setAnswers({});
    setComplete([]);
    setSavedSuccess(false);
  };

  const toggle = (id) =>
    setComplete((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));

  // Step 0: Grid selection
  if (!selected) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-line bg-gradient-to-r from-brand-500/10 via-brand-50 to-teal-100/40 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-md">
              <Sparkles size={20} />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Life Events Navigator</h1>
              <p className="mt-1 text-sm text-ink-soft sm:text-base">
                Get a practical, step-by-step government services journey tailored to major life changes.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lifeEvents.map((event) => {
            const Icon = getIcon(event.icon);
            return (
              <div
                key={event.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-xs transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
              >
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <Icon size={24} />
                  </div>
                  <h2 className="font-display text-lg font-bold text-ink group-hover:text-brand-600">{event.title}</h2>
                  <p className="mt-1 text-sm text-ink-soft leading-relaxed">{event.description}</p>
                </div>

                <div className="mt-5 border-t border-line/60 pt-4">
                  <button
                    type="button"
                    onClick={() => begin(event)}
                    className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-500 hover:text-white"
                  >
                    Start Journey <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Steps 1 & 2: Interactive Questionnaire
  if (step < 3) {
    const question = step === 1 ? selected.questions[0] : selected.questions[1];
    const Icon = getIcon(selected.icon);
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft size={16} /> Back to life events
        </button>

        <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <Icon size={20} />
              </div>
              <span className="font-display text-lg font-bold text-ink">{selected.title}</span>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
              Step {step} of 2
            </span>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-ink">
              {question.label}
              <div className="mt-2">
                {question.type === "select" ? (
                  <select
                    value={answers[question.id] ?? ""}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                    className="focus-ring w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm font-normal text-ink"
                  >
                    <option value="">Select an option</option>
                    {question.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={answers[question.id] ?? ""}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                    placeholder="Enter details..."
                    className="focus-ring w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm font-normal text-ink"
                  />
                )}
              </div>
            </label>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              disabled={!answers[question.id]}
              onClick={() => setStep(step + 1)}
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
            >
              {step === 2 ? "Generate Journey" : "Continue"} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Roadmap view
  const percent = selected.services.length ? Math.round((complete.length / selected.services.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft size={16} /> Edit answers
        </button>
        {onSaveJourney && (
          <button
            type="button"
            onClick={() => {
              onSaveJourney(selected, selected.services);
              setSavedSuccess(true);
            }}
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
          >
            <BookmarkCheck size={16} /> {savedSuccess ? "Journey Saved!" : "Save journey"}
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-6 border-b border-line pb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Personalized Roadmap</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">{selected.title} Journey</h1>
          
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-medium text-ink-soft">
              Progress: <strong className="text-ink">{complete.length}</strong> of <strong>{selected.services.length}</strong> tasks completed ({percent}%)
            </span>
            <div className="h-2.5 w-full max-w-xs overflow-hidden rounded-full bg-canvas">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-teal-400 transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        <ol className="relative space-y-6 border-l-2 border-brand-100 pl-6 sm:pl-8">
          {selected.services.map((service) => {
            const isDone = complete.includes(service.id);
            const badge = statusConfig[service.status];

            return (
              <li key={service.id} className="relative group">
                <button
                  type="button"
                  onClick={() => toggle(service.id)}
                  className="absolute -left-[31px] sm:-left-[39px] top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-surface text-brand-500 hover:scale-110 transition-transform"
                >
                  {isDone ? (
                    <CheckCircle2 size={24} className="text-good-500 fill-good-100" />
                  ) : (
                    <Circle size={24} className="text-brand-300" />
                  )}
                </button>

                <div className={`rounded-2xl border p-5 transition-all ${isDone ? "border-good-500/30 bg-good-100/20" : "border-line bg-surface shadow-xs"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`inline-block rounded-full border px-3 py-0.5 text-xs font-semibold ${badge.tone}`}>
                      {badge.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggle(service.id)}
                      className="text-xs font-medium text-ink-soft hover:text-ink underline"
                    >
                      {isDone ? "Mark incomplete" : "Mark complete"}
                    </button>
                  </div>

                  <h2 className="mt-2 font-display text-lg font-bold text-ink">{service.name}</h2>
                  <p className="mt-1 text-sm text-ink-soft">{service.reason}</p>

                  <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2 rounded-xl bg-canvas p-3 border border-line/50">
                    <div>
                      <span className="font-semibold text-ink">Required Documents:</span>
                      <p className="mt-0.5 text-ink-soft">{service.documents.join(", ")}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-ink">Where to Apply:</span>
                      <p className="mt-0.5 text-ink-soft">{service.whereToApply}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-line/60">
                    {service.articleId && (
                      <button
                        type="button"
                        onClick={() => onOpenKnowledge?.(service.articleId)}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100"
                      >
                        <FileText size={14} /> How do I get this?
                      </button>
                    )}
                    {addToRoadmap && (
                      <button
                        type="button"
                        onClick={() => addToRoadmap(service)}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas"
                      >
                        <PlusCircle size={14} /> Add to roadmap
                      </button>
                    )}
                    {addToChecklist && (
                      <button
                        type="button"
                        onClick={() => addToChecklist(service.documents, service.name)}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas"
                      >
                        <CheckCircle2 size={14} /> Add documents
                      </button>
                    )}
                    {addToTracker && (
                      <button
                        type="button"
                        onClick={() => addToTracker(service)}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:bg-canvas"
                      >
                        <Clock size={14} /> Track application
                      </button>
                    )}
                    {openOfficialUrl && (
                      <button
                        type="button"
                        onClick={() => openOfficialUrl(service.officialUrl)}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
                      >
                        Official Service <ExternalLink size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
