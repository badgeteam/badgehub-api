import React from "react";
import { BadgeSlug } from "@shared/domain/readModels/Badge.ts";
import { OptionSelectorWithTitle } from "@sharedComponents/OptionSelector/OptionSelectorWithTitle.tsx";
import { getSharedConfig } from "@shared/config/sharedConfig.ts";

export const BadgeSelector: React.FC<{
  badge: BadgeSlug | undefined;
  onBadgeChange: (selectedBadge: BadgeSlug | undefined) => void;
  noValueSetName: string;
}> = ({ badge, onBadgeChange, noValueSetName }) => {
  const badges = getSharedConfig()?.badges;
  const valueMap = Object.fromEntries(
    Object.entries(badges || {}).map(([slug, badge]) => [slug, badge])
  );
  return (
    <OptionSelectorWithTitle
      noValueSetName={noValueSetName}
      title="Badge"
      valueMap={valueMap}
      value={badge}
      onValueSelection={onBadgeChange}
    />
  );
};
