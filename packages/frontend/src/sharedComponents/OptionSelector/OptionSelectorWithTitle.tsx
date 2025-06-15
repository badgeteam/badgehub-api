import React from "react";
import { BadgeMap } from "@shared/domain/readModels/Badge.ts";
import { CATEGORY_MAP } from "@shared/domain/readModels/project/Category.ts";

const NO_FILTER_OPTION_VALUE = "All";
type CategoryMap = typeof CATEGORY_MAP;
type SortByOption = string | undefined;
export const OptionSelectorWithTitle: React.FC<
  {
    title: string;
    noValueSetName: string;
  } & (
    | {
        valueMap: BadgeMap;
        value: keyof BadgeMap | undefined;
        onValueSelection: (newValue: keyof BadgeMap | undefined) => void;
      }
    | {
        valueMap: CategoryMap;
        value: keyof CategoryMap | undefined;
        onValueSelection: (newValue: keyof CategoryMap | undefined) => void;
      }
    | {
        valueMap: undefined;
        value: SortByOption | undefined;
        onValueSelection: (newValue: SortByOption | undefined) => void;
      }
  )
> = ({ title, noValueSetName, valueMap, value, onValueSelection }) => {
  const selectionId = `${title.toLowerCase()}-dropdown`;
  return (
    <div className={valueMap ? "" : "todoElement"}>
      <label
        htmlFor={selectionId}
        className="block text-sm font-medium text-slate-300 mb-1"
      >
        {title}
      </label>
      <select
        id={selectionId}
        name={selectionId}
        data-testid={selectionId}
        className="w-full border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2"
        value={value === undefined ? NO_FILTER_OPTION_VALUE : String(value)}
        onChange={(e) =>
          onValueSelection(
            e.target.value === NO_FILTER_OPTION_VALUE
              ? undefined
              : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (e.target.value as any)
          )
        }
      >
        <option value={NO_FILTER_OPTION_VALUE}>{noValueSetName}</option>
        {(Object.keys(valueMap ?? {}) as Array<keyof typeof valueMap>).map(
          (option) => (
            <option key={option} value={option}>
              {valueMap?.[option]}
            </option>
          )
        )}
      </select>
    </div>
  );
};
