import { assertDefinedAndNotNull } from "@shared/util/assertions";

export type SharedConfig = {
  badges: {
    [key: string]: {
      slug: string;
      name: string;
      description: string;
    };
  };
};
export const BADGE_WHY2025_ORG = "badge.why2025.org";
export const BADGEHUB_P1M_NL = "badgehub.p1m.nl";

const sharedConfig: Record<string, SharedConfig> = {
  [BADGE_WHY2025_ORG]: {
    badges: {
      why2025: {
        slug: "why2025",
        name: "WHY2025",
        description: "A delightfully deranged Badge for the WHY2025 event",
      },
    },
  },
  [BADGEHUB_P1M_NL]: {
    badges: {
      why2025: {
        slug: "why2025",
        name: "WHY2025",
        description: "A delightfully deranged Badge for the WHY 2025 event",
      },
      troopers23: {
        slug: "troopers23",
        name: "troopers23",
        description: "A Badge for the Troopers 2023 event",
      },
      mch2022: {
        slug: "mch2022",
        name: "mch2022",
        description: "A Badge for the MCH 2022 event",
      },
    },
  },
};

let deploymentId: string | undefined = undefined;
export const setDeploymentId = (newDeploymentId: string) => {
  deploymentId = newDeploymentId;
};

export const getSharedConfig = () => {
  assertDefinedAndNotNull(
    deploymentId,
    "Deployment ID must be set before accessing shared config"
  );
  return sharedConfig[deploymentId];
};
