import { useNavigate } from "react-router-dom";
import { SchemeRecommender } from "@/components/SchemeRecommender";

export function SchemesPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-6xl">
      <SchemeRecommender
        openOfficialUrl={(url) => window.open(url, "_blank", "noopener,noreferrer")}
        askAssistant={(prompt) => navigate(`/app/assistant?q=${encodeURIComponent(prompt)}`)}
      />
    </div>
  );
}
