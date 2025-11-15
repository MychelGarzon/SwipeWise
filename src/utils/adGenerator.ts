import { Ad } from "../types/ad";
import { UserProfile } from "../types/profile";

// Ad templates that will be customized based on profile
const adTemplates = {
  student: [
    {
      id: 1,
      category: "Education Loan",
      title: "Student Loan - 0% Interest First Year!",
      subtitle: "Get €5,000 instantly for your studies. No fees for 12 months!",
      image: "student education",
      terms: [
        "Interest jumps to 15.9% APR after first year",
        "€50 monthly fee starts month 13",
        "Must repay within 3 years or face penalties",
        "Missed payment = €100 fee + 19% penalty APR"
      ],
      isGoodDeal: false,
      breakdown: {
        initialCost: 0,
        yearCost: 0,
        hiddenFees: [
          "After year one, 15.9% APR adds €795/year in interest",
          "€50 monthly fees = €600/year starting year 2",
          "Total cost over 3 years: €2,385 extra",
          "Missing one payment triggers €100 fee + 19% penalty rate"
        ],
        verdict: "REJECT - This loan appears cheap initially but becomes extremely expensive after the first year. Government-backed student loans through Kela offer 0.5-2% interest rates - vastly better than 15.9% APR.",
        tips: [
          "Apply for Kela Student Loan Guarantee for much lower rates (0.5-2%)",
          "Compare student loan options at Hintaopas.fi",
          "Check if you qualify for study grants instead at Kela.fi/students",
          "Avoid private high-interest student loans - use bank loans with Kela guarantee"
        ]
      }
    }
  ],
  
  general: []
};

export function generatePersonalizedAds(profile: UserProfile): Ad[] {
  // For now, just return the default ads from data/ads.ts
  // In the future, this would actually customize based on profile
  return [];
}
