import React from "react";
import { ProjectEditFormData } from "@pages/AppEditPage/ProjectEditFormData.ts";

const AppEditBasicInfo: React.FC<{
  form: ProjectEditFormData;
  onChange: (changes: Partial<ProjectEditFormData>) => void;
}> = ({ form, onChange }) => (
  <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-slate-100 mb-4">
      Basic Information
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          App Name
        </label>
        <input
          type="text"
          className="w-full form-input p-2"
          value={form.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Version
        </label>
        <input
          type="text"
          className="w-full form-input p-2"
          value={form.semantic_version}
          onChange={(e) => onChange({ semantic_version: e.target.value })}
        />
      </div>
    </div>
    <div className="mt-6">
      <label className="block text-sm font-medium text-slate-300 mb-1">
        Description
      </label>
      <textarea
        rows={6}
        className="w-full form-input p-2"
        value={form.description}
        onChange={(e) => onChange({ description: e.target.value })}
      />
    </div>
  </section>
);

export default AppEditBasicInfo;
