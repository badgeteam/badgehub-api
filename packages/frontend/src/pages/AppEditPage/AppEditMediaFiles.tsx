import React from "react";
import { ProjectEditFormData } from "@pages/AppEditPage/ProjectEditFormData.ts";

const AppEditMediaFiles: React.FC<{
  form: ProjectEditFormData;
  onChange: (changes: Partial<ProjectEditFormData>) => void;
}> = ({ form, onChange }) => (
  <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-slate-100 mb-4">
      Media & Files
    </h2>
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        Screenshots & Media
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {(form.media || []).map((url: string, idx: number) => (
          <div className="relative group" key={idx}>
            <img
              src={url}
              alt={`Media ${idx + 1}`}
              className="rounded-md w-full h-auto object-cover aspect-video"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => {
                const newMedia = [...form.media];
                newMedia.splice(idx, 1);
                onChange({ media: newMedia });
              }}
              aria-label="Remove media"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        multiple
        className="form-input w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
        onChange={(e) => {
          // TODO: handle upload, for now just simulate
        }}
      />
    </div>
    <div className="mt-6">
      <label className="block text-sm font-medium text-slate-300 mb-1">
        Main Code File (e.g., main.ino)
      </label>
      <textarea
        rows={15}
        className="w-full form-input p-2 font-roboto-mono text-sm"
        value={form.code}
        onChange={(e) => onChange({ code: e.target.value })}
      />
    </div>
    <div className="mt-6">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        Project File Bundle (.zip)
      </label>
      <p className="text-xs text-slate-500 mb-2">
        Current file:{" "}
        <span className="font-roboto-mono text-emerald-400">
          {form.bundle || "None"}
        </span>
      </p>
      <input
        type="file"
        className="form-input w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
        onChange={(e) => {
          // TODO: handle upload
        }}
      />
      <p className="text-xs text-slate-500 mt-1">
        Upload a new zip file to replace the existing one.
      </p>
    </div>
  </section>
);

export default AppEditMediaFiles;
