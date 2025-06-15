import React from "react";
import { Link } from "react-router-dom";

const AppEditActions: React.FC = () => (
  <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-slate-100 mb-4">Actions</h2>
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="btn-primary px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          Save Changes
        </button>
        <Link
          to=".."
          className="btn-secondary px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out"
        >
          Cancel
        </Link>
      </div>
      <div>
        <button
          type="button"
          className="btn-danger px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out flex items-center"
          // TODO: Add delete logic
        >
          <svg className="icon h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          Delete Application
        </button>
      </div>
    </div>
    <p className="text-xs text-slate-500 mt-4 text-right">
      Deleting an application is permanent and cannot be undone.
    </p>
  </section>
);

export default AppEditActions;
