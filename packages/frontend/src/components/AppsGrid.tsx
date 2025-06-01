import React from "react";
import AppCard from "./AppCard";
import type { AppCardProps } from "./types";

interface AppsGridProps {
  apps: AppCardProps[];
}

const AppsGrid: React.FC<AppsGridProps> = ({ apps }) => (
  <section id="apps-grid">
    <h2 className="text-2xl font-semibold text-slate-100 mb-6">
      Featured Applications
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {apps.map((app) => (
        <AppCard key={app.slug} {...app} />
      ))}
    </div>
  </section>
);

export default AppsGrid;
