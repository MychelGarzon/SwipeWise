export interface Ad {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  terms: string[];
  isGoodDeal: boolean;
  breakdown: {
    initialCost: number;
    yearCost: number;
    hiddenFees: string[];
    verdict: string;
    tips: string[];
  };
  marketingTricks: {
    name: string;
    description: string;
  }[];
}