import React from "react";
import {
  CATEGORY_MAP,
  CategorySlug,
} from "@shared/domain/readModels/project/Category.ts";
import { OptionSelectorWithTitle } from "@sharedComponents/OptionSelector/OptionSelectorWithTitle.tsx";

export const CategorySelector: React.FC<{
  noValueSetName: string;
  category: CategorySlug | undefined;
  onCategoryChange: (selectedCategory: CategorySlug | undefined) => void;
}> = ({ category, onCategoryChange, noValueSetName }) => {
  return (
    <OptionSelectorWithTitle
      noValueSetName={noValueSetName}
      title="Category"
      valueMap={CATEGORY_MAP}
      value={category}
      onValueSelection={onCategoryChange}
    />
  );
};
