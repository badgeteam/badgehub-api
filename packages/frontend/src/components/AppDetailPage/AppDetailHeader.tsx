import React from "react";

const AppDetailHeader: React.FC<{ project: any }> = ({ project }) => (
  <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2">
          {project.name}
        </h1>
        <p className="text-slate-400 mb-1">
          By{" "}
          <a href="#" className="text-emerald-400 hover:underline">
            {project.author?.displayName ||
              project.author?.username ||
              "Unknown"}
          </a>
        </p>
        <p className="text-xs text-slate-500">
          Published:{" "}
          {project.createdAt
            ? new Date(project.createdAt).toLocaleDateString()
            : "—"}
          {" | "}
          Last Updated:{" "}
          {project.updatedAt
            ? new Date(project.updatedAt).toLocaleDateString()
            : "—"}
        </p>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0 flex flex-col space-y-2 items-stretch">
        <button className="btn-primary px-6 py-3 rounded-lg text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center">
          <svg
            className="icon h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Download App
        </button>
        {project.repositoryUrl && (
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-6 py-3 rounded-lg text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center"
          >
            <svg
              className="icon h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 01-1.898.069l-2-6a1 1 0 011.265-.633L12.316 3.05zM11.34 8.033L10 11.588l.95-2.853-3.821-1.274 2.21.737zM16 6a1 1 0 011 1v3.586l-1.707-1.707A.996.996 0 0014.586 8H14V6h2zm-5.414-2H12V2.586l1.707 1.707A.996.996 0 0014.414 5H16v-.586A1.414 1.414 0 0014.586 3H12V2a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1h8a1 1 0 001-1V9.414A1.414 1.414 0 0012.586 8H12V6.414A1.414 1.414 0 0010.586 5H8V4a1 1 0 011-1h1.586l.0001-.0001z"
                clipRule="evenodd"
              />
            </svg>
            View Source
          </a>
        )}
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-700">
      {project.devices?.map((dev: any) => (
        <span
          key={dev.slug}
          className="tag-mcu text-sm font-semibold mr-2 px-3 py-1 rounded-full"
        >
          {dev.name}
        </span>
      ))}
      {project.categories?.map((cat: any) => (
        <span
          key={cat.slug}
          className="tag text-sm font-semibold mr-2 px-3 py-1 rounded-full"
        >
          {cat.name}
        </span>
      ))}
      {project.tags?.map((tag: string) => (
        <span
          key={tag}
          className="tag text-sm font-semibold mr-2 px-3 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  </section>
);

export default AppDetailHeader;
