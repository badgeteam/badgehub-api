import React from "react";
import type { AppCardProps } from "../types.ts";
import { MLink } from "@components/MLink.tsx";
import { BADGEHUB_API_BASE_URL, BADGEHUB_FRONTEND_BASE_URL } from "@config.ts";

const AppCard: React.FC<AppCardProps> = ({
  name,
  description,
  category,
  published_at,
  revision,
  badges,
  slug,
  icon,
}) => {
  const iconSrc = icon
    ? `${BADGEHUB_API_BASE_URL}/api/v3/projects/${slug}/rev${revision}/files/${encodeURIComponent(icon)}`
    : `${BADGEHUB_FRONTEND_BASE_URL}/assets/no-icon-uploaded.png`;
  return (
    <div
      data-testid="AppCard"
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden card-hover-effect flex flex-col h-60"
    >
      <div className="p-5 flex flex-col flex-grow">
        {/* Header with icon and title */}
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center mr-4 flex-shrink-0 overflow-hidden">
            <img
              src={iconSrc}
              alt={name || "App icon"}
              className="w-8 h-8 object-contain"
              loading="lazy"
            />
          </div>
          <MLink to={`/page/app/${slug}`}>
            <h3 className="text-xl font-semibold text-emerald-400 hover:text-emerald-300 transition-colors line-clamp-2">
              {name}
            </h3>
          </MLink>
        </div>

        {/* Description with line clamp */}
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Tags section pushed to bottom */}
        <div className="mt-auto mb-3">
          {category && (
            <span className="tag text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
              {category}
            </span>
          )}
          {badges.map((badge) => (
            <span
              key={badge}
              className="tag-mcu text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Footer with stats */}
      <div className="px-5 py-3 bg-gray-700 border-t border-gray-700 flex justify-between items-center">
        <p className="text-sm text-slate-400">Revision: {revision ?? "-"}</p>
        <p className="text-sm text-slate-400">
          Published:{" "}
          {published_at ? new Date(published_at).toLocaleDateString() : "-"}
        </p>
      </div>
    </div>
  );
};

export default AppCard;
