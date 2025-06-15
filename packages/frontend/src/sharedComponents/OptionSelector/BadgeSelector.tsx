import React from "react";
import { BADGE_MAP, BadgeSlug } from "@shared/domain/readModels/Badge.ts";
import { OptionSelectorWithTitle } from "@sharedComponents/OptionSelector/OptionSelectorWithTitle.tsx";

export const BadgeSelector: React.FC<{
  badge: BadgeSlug | undefined;
  onBadgeChange: (selectedBadge: BadgeSlug | undefined) => void;
  noValueSetName: string;
}> = ({ badge, onBadgeChange, noValueSetName }) => {
  return (
    <OptionSelectorWithTitle
      noValueSetName={noValueSetName}
      title="Badge"
      valueMap={BADGE_MAP}
      value={badge}
      onValueSelection={onBadgeChange}
    />
  );
};
