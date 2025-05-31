import React from "react";
import type { AppCardProps } from "./types";

const AppCard: React.FC<AppCardProps> = ({
  title,
  description,
  tags,
  author,
  authorLink,
  rating,
  ratingCount,
  downloads,
}) => (
  <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden card-hover-effect flex flex-col">
    <div className="p-5 flex-grow">
      <h3 className="text-xl font-semibold text-emerald-400 mb-2 hover:text-emerald-300 transition-colors">
        <a href="#">{title}</a>
      </h3>
      <p className="text-sm text-slate-400 mb-3 leading-relaxed">
        {description}
      </p>
      <div className="mb-3">
        {tags.map((tag) => (
          <span
            key={tag.label}
            className={`${tag.isMcu ? "tag-mcu" : "tag"} text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full`}
          >
            {tag.label}
          </span>
        ))}
      </div>
      <p className="text-xs text-slate-500 font-roboto-mono">
        Author:{" "}
        <a
          href={authorLink || "#"}
          className="text-emerald-500 hover:underline"
        >
          {author}
        </a>
      </p>
    </div>
    <div className="px-5 py-3 bg-gray-750 border-t border-gray-700 flex justify-between items-center">
      <div className="flex items-center text-sm text-slate-400">
        <svg
          className="icon h-4 w-4 mr-1 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {rating.toFixed(1)} ({ratingCount})
      </div>
      <div className="flex items-center text-sm text-slate-400">
        <svg
          className="icon h-4 w-4 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        {downloads} Dls
      </div>
    </div>
  </div>
);

export default AppCard;
