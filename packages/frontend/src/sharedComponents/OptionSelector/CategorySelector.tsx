import React from "react";
import { OptionSelectorWithTitle } from "@sharedComponents/OptionSelector/OptionSelectorWithTitle.tsx";
import {
  CategoryName,
  getCategoryNames,
} from "@shared/domain/readModels/project/Category.ts";

export const CategorySelector: React.FC<{
  noValueSetName: string;
  category: CategoryName | undefined;
  onCategoryChange: (selectedCategory: CategoryName | undefined) => void;
}> = ({ category, onCategoryChange, noValueSetName }) => {
  const valueMap: Record<string, string> = Object.fromEntries(
    getCategoryNames().map((c) => [c, c])
  );
  return (
    <OptionSelectorWithTitle
      noValueSetName={noValueSetName}
      title="Category"
      valueMap={valueMap}
      value={category}
      onValueSelection={onCategoryChange}
    />
  );
};
