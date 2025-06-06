import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { tsRestClient as defaultTsRestClient } from "../api/tsRestClient";
import Spinner from "./Spinner";
import { Project } from "@shared/domain/readModels/project/Project.ts";

const AppDetail: React.FC<{ tsRestClient?: typeof defaultTsRestClient }> = ({
  tsRestClient = defaultTsRestClient,
}) => {
  const { appId } = useParams<{ appId: string }>();
  const [app, setApp] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!appId) return;
    setLoading(true);
    tsRestClient
      .getProject({ params: { slug: appId } })
      .then((res) => {
        if (res.status === 200) {
          const body = res.body;
          setApp(body);
          setError(null);
        } else {
          setError("App not found");
        }
      })
      .catch(() => setError("Error loading app"))
      .finally(() => setLoading(false));
  }, [appId, tsRestClient]);

  if (loading) return <Spinner />;
  if (error) return <div data-testid="app-detail-error">{error}</div>;
  if (!app) return null;

  return (
    <div data-testid="app-detail-page" className="max-w-2xl mx-auto p-6">
      <Link to="/" className="text-emerald-400">
        &larr; Back to list
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-2">{app.name}</h1>
      <p className="text-slate-400 mb-4">{app.description}</p>
      <div className="mb-2">
        <span className="tag text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
          {app.category}
        </span>
        {app.badges &&
          app.badges.map((badge: string) => (
            <span
              key={badge}
              className="tag-mcu text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
            >
              {badge}
            </span>
          ))}
      </div>
      <p className="text-xs text-slate-500 font-roboto-mono mb-1">
        Revision: {app.revision ?? "-"}
      </p>
      <p className="text-xs text-slate-500 font-roboto-mono mb-1">
        Published:{" "}
        {app.published_at
          ? new Date(app.published_at).toLocaleDateString()
          : "-"}
      </p>
      {/* Add more app details here as needed */}
    </div>
  );
};

export default AppDetail;
