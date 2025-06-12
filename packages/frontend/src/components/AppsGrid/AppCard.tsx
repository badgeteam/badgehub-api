import React from "react";
import { Link } from "react-router-dom";
import type { AppCardProps } from "../types.ts";

const AppCard: React.FC<AppCardProps> = ({
  name,
  description,
  category,
  published_at,
  revision,
  badges,
  slug,
}) => {
  return (
    <div
      data-testid="AppCard"
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden card-hover-effect flex flex-col"
    >
      <div className="p-5 flex-grow">
        <h3 className="text-xl font-semibold text-emerald-400 mb-2 hover:text-emerald-300 transition-colors">
          <Link to={`/page/app/${slug}`}>{name}</Link>
        </h3>
        <p className="text-sm text-slate-400 mb-3 leading-relaxed">
          {description}
        </p>
        <div className="mb-3">
          <span className="tag text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
            {category}
          </span>
          {badges &&
            badges.map((badge) => (
              <span
                key={badge}
                className="tag-mcu text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
              >
                {badge}
              </span>
            ))}
        </div>
        <p className="text-xs text-slate-500 font-roboto-mono">
          Revision: {revision ?? "-"}
        </p>
        <p className="text-xs text-slate-500 font-roboto-mono">
          Published:{" "}
          {published_at ? new Date(published_at).toLocaleDateString() : "-"}
        </p>
      </div>
    </div>
  );
};

export default AppCard;
