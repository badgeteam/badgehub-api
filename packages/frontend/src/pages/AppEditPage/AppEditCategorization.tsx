import React from "react";
import { ProjectEditFormData } from "@pages/AppEditPage/ProjectEditFormData.ts";
import { BADGE_MAP } from "@shared/domain/readModels/Badge.ts";
import { CategorySelector } from "@sharedComponents/OptionSelector/CategorySelector.tsx";
import { BadgeSelector } from "@sharedComponents/OptionSelector/BadgeSelector.tsx";

const mcuOptions = Object.keys(BADGE_MAP);

const AppEditCategorization: React.FC<{
  form: ProjectEditFormData;
  onChange: (changes: Partial<ProjectEditFormData>) => void;
}> = ({ form, onChange }) => (
  <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-slate-100 mb-4">
      Categorization
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BadgeSelector
        noValueSetName="Please select"
        badge={form.badge}
        onBadgeChange={(newValue) => onChange({ badge: newValue })}
      />
      <CategorySelector
        noValueSetName="Please select"
        category={form.category}
        onCategoryChange={(newValue) => onChange({ category: newValue })}
      />
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          License
        </label>
        <input
          type="text"
          className="w-full form-input p-2"
          value={form.license}
          onChange={(e) => onChange({ license: e.target.value })}
        />
      </div>
    </div>
  </section>
);

export default AppEditCategorization;
