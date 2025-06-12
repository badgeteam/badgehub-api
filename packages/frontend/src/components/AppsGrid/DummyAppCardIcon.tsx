// Extracted AppCardIcon component
import React from "react";

export const DummyAppCardIcon: React.FC<{ appSlug: string }> = ({
  appSlug,
}) => {
  switch (appSlug.length % 4) {
    case 0:
      return (
        <svg
          className="w-6 h-6 text-sky-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.43-4.242 4.5 4.5 0 00-8.32 2.734 4.5 4.5 0 00-4.5 4.5z"
          />
        </svg>
      );
    case 1:
      return (
        <svg
          className="w-6 h-6 text-green-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12 7.5v4.5m0 3h.008v.008H12V15z"
          />
        </svg>
      );
    case 2:
      return (
        <svg
          className="w-6 h-6 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12 7.5v4.5m0 3h.008v.008H12V15z"
          />
        </svg>
      );
    case 3:
      return (
        <svg
          className="w-6 h-6 text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12 7.5v4.5m0 3h.008v.008H12V15z"
          />
        </svg>
      );
  }
};
