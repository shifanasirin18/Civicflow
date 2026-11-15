import { useNavigate, useSearchParams } from "react-router-dom";
import { KnowledgeHub } from "@/components/KnowledgeHub";
import { useAppData } from "@/context/AppDataContext";

export function KnowledgeHubPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialArticleId = params.get("article") ?? undefined;
  const { startApplication } = useAppData();

  return (
    <div className="mx-auto max-w-6xl">
      <KnowledgeHub
        initialArticleId={initialArticleId}
        addToRoadmap={(service) => startApplication(service.id)}
        addToTracker={(service) => startApplication(service.id)}
        openOfficialUrl={(url) => window.open(url, "_blank", "noopener,noreferrer")}
        askAssistant={(prompt) => navigate(`/app/assistant?q=${encodeURIComponent(prompt)}`)}
      />
    </div>
  );
}
