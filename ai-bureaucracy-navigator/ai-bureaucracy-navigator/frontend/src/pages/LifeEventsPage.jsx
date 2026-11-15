import { useNavigate } from "react-router-dom";
import { LifeEventWizard } from "@/components/LifeEventWizard";
import { useAppData } from "@/context/AppDataContext";

export function LifeEventsPage() {
  const navigate = useNavigate();
  const { startApplication } = useAppData();

  return (
    <div className="mx-auto max-w-6xl">
      <LifeEventWizard
        addToRoadmap={(service) => startApplication(service.id)}
        addToTracker={(service) => startApplication(service.id)}
        openOfficialUrl={(url) => window.open(url, "_blank", "noopener,noreferrer")}
        askAssistant={(prompt) => navigate(`/app/assistant?q=${encodeURIComponent(prompt)}`)}
        onOpenKnowledge={(articleId) => navigate(`/app/knowledge?article=${articleId}`)}
      />
    </div>
  );
}
