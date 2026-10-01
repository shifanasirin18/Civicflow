import { useState } from "react";
import { lifeEvents } from "./seedData";
import { GovernmentService, LifeEvent, NavigatorActions } from "./government";

type Props = NavigatorActions & {
  onOpenKnowledge?: (articleId: string) => void;
  onSaveJourney?: (event: LifeEvent, services: GovernmentService[]) => void;
};

const statusLabel: Record<string, string> = {
  required: "Required",
  recommended: "Recommended",
  conditional: "Applicable depending on situation",
};

export function LifeEventWizard({
  onOpenKnowledge,
  onSaveJourney,
  addToRoadmap,
  addToChecklist,
  addToTracker,
  openOfficialUrl,
}: Props) {
  const [selected, setSelected] = useState<LifeEvent | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState<string[]>([]);

  const begin = (event: LifeEvent) => {
    setSelected(event);
    setStep(1);
    setAnswers({});
    setComplete([]);
  };

  const toggle = (id: string) =>
    setComplete((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id]
    );

  if (!selected) {
    return (
      <section className="life-events-page">
        <header>
          <h1>Life Events</h1>
          <p>Get a practical government-services journey for a major life change.</p>
        </header>
        <div className="life-event-grid">
          {lifeEvents.map((event) => (
            <article className="life-event-card" key={event.id}>
              <span aria-hidden="true" className="life-event-icon">
                {event.icon}
              </span>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <button type="button" onClick={() => begin(event)}>
                Start Journey
              </button>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const totalQuestions = selected.questions.length || 2;

  if (step <= totalQuestions && step > 0) {
    const question = selected.questions[step - 1] ?? selected.questions[0];

    if (!question) {
      setStep(totalQuestions + 1);
      return null;
    }

    return (
      <section className="life-event-wizard">
        <button type="button" className="back-link" onClick={() => setSelected(null)}>
          Back to life events
        </button>
        <p className="step-indicator">
          Step {step} of {totalQuestions}
        </p>
        <h1>{selected.title}</h1>
        <label>
          {question.label}
          {question.type === "select" ? (
            <select
              value={answers[question.id] ?? ""}
              onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
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
              value={answers[question.id] ?? ""}
              onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
            />
          )}
        </label>
        <button
          type="button"
          disabled={!answers[question.id]}
          onClick={() => setStep(step + 1)}
        >
          {step === totalQuestions ? "Generate Journey" : "Continue"}
        </button>
      </section>
    );
  }

  const percent = selected.services.length
    ? Math.round((complete.length / selected.services.length) * 100)
    : 0;

  return (
    <section className="life-event-roadmap">
      <button type="button" className="back-link" onClick={() => setStep(1)}>
        Edit answers
      </button>
      <header>
        <p className="eyebrow">Personalized roadmap</p>
        <h1>{selected.title} Journey</h1>
        <p>
          {complete.length} / {selected.services.length} tasks completed
        </p>
        <progress value={percent} max="100">
          {percent}%
        </progress>
      </header>
      <ol className="roadmap-timeline">
        {selected.services.map((service) => (
          <li key={service.id} className={complete.includes(service.id) ? "is-complete" : ""}>
            <div>
              <span className={`status-badge status-${service.status}`}>
                {statusLabel[service.status] ?? service.status}
              </span>
              <h2>{service.name}</h2>
              <p>{service.reason}</p>
              <p>
                <strong>Documents:</strong> {service.documents.join(", ")}
              </p>
              <p>
                <strong>Where:</strong> {service.whereToApply}
              </p>
            </div>
            <div className="action-row">
              <button type="button" onClick={() => toggle(service.id)}>
                {complete.includes(service.id) ? "Mark incomplete" : "Mark complete"}
              </button>
              {service.articleId && (
                <button type="button" onClick={() => onOpenKnowledge?.(service.articleId!)}>
                  How do I get this?
                </button>
              )}
              <button type="button" onClick={() => addToRoadmap?.(service)}>
                Add to roadmap
              </button>
              <button
                type="button"
                onClick={() => addToChecklist?.(service.documents, service.name)}
              >
                Add documents
              </button>
              <button type="button" onClick={() => addToTracker?.(service)}>
                Track application
              </button>
              <button type="button" onClick={() => openOfficialUrl?.(service.officialUrl)}>
                Official service
              </button>
            </div>
          </li>
        ))}
      </ol>
      <button type="button" onClick={() => onSaveJourney?.(selected, selected.services)}>
        Save journey
      </button>
    </section>
  );
}

