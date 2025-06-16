import React from "react";

const AppCreationActions: React.FC<{ isSlugValid: boolean }> = ({
  isSlugValid,
}) => (
  <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-slate-100 mb-4">Submit</h2>
    <div className="flex items-center justify-start">
      <button
        type="submit"
        className={`btn-primary px-8 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center space-x-2 ${
          !isSlugValid ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
        }`}
        data-testid="app-creation-submit-btn"
        disabled={!isSlugValid}
      >
        <svg
          className="icon h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
            clipRule="evenodd"
          />
        </svg>
        <span>Create Application</span>
      </button>
    </div>
    <p className="text-xs text-slate-500 mt-4">
      You can add code, media, and other details after creation.
    </p>
  </section>
);

export default AppCreationActions;
