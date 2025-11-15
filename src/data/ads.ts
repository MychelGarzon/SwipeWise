import { Ad } from "../types/ad";

export const ads: Ad[] = [
  {
    id: 1,
    title: "Free iPhone 15 Pro! 📱",
    subtitle: "Get the latest iPhone absolutely FREE!",
    image: "smartphone deal",
    terms: [
      "24-month contract required",
      "€59/month unlimited plan mandatory",
      "€29 activation fee",
      "Early termination fee: €250",
    ],
    isGoodDeal: false,
    breakdown: {
      initialCost: 29,
      yearCost: 881,
      hiddenFees: [
        "€59/month × 12 = €708 (phone plan)",
        "€12/month × 12 = €144 (device protection)",
        "€29 activation fee",
      ],
      verdict:
        "That 'FREE' iPhone actually costs you €1,733 over 2 years! You could buy the phone outright for €1,199 and use a €20/month plan (DNA Rajaton Super, Elisa Huoleton), saving over €500.",
      tips: [
        "Always calculate total cost over contract period",
        "Compare with buying unlocked + budget plan from DNA/Elisa/Telia",
        "Watch for mandatory add-ons",
        "Finnish law requires transparent pricing - demand it!",
      ],
    },
    marketingTricks: [
      {
        name: "🎁 Zero-Price Effect",
        description:
          "The word 'FREE' triggers irrational excitement, making you ignore total costs. Your brain focuses on €0 phone price, not €1,733 total.",
      },
      {
        name: "🧮 Partitioned Pricing",
        description:
          "Breaking costs into small monthly payments (€59/month) hides the massive total. €1,416 sounds scarier than €59.",
      },
      {
        name: "⚓ Anchoring Bias",
        description:
          "They anchor you to the phone's €1,199 retail price, making the 'deal' seem like savings when you're actually overpaying.",
      },
      {
        name: "🔒 Lock-In Effect",
        description:
          "€250 early termination fee traps you. Behavioral economics calls this 'sunk cost fallacy' - you'll stay even if unhappy.",
      },
    ],
  },
  {
    id: 2,
    title: "Need Cash? Get €500 Now! 💰",
    subtitle: "Instant approval, no credit check!",
    image: "money cash",
    terms: [
      "Repayment in 30 days",
      "Effective APR: 47%",
      "Late fee: €35",
      "€20 processing fee",
      "€5 payment reminder fee",
    ],
    isGoodDeal: false,
    breakdown: {
      initialCost: 520,
      yearCost: 620,
      hiddenFees: [
        "€20 processing fee upfront",
        "€50 interest for 30 days (47% APR)",
        "Risk of €35 late fee",
        "€5 payment reminder fees add up",
        "Potential debt spiral",
      ],
      verdict:
        "You'd owe €570 in just 30 days on a €500 loan! Finnish law caps interest at 20% for consumer credits. These 'pikalaina' loans are legal but predatory. Better options exist through your bank or Kela.",
      tips: [
        "Check Kela's support services first (toimeentulotuki)",
        "Ask your bank for consumer credit (kulutusluotto)",
        "Finnish Consumer Protection Act limits fees - know your rights",
        "Avoid Ferratum, Vivus - high complaint rates with Kilpailu- ja kuluttajavirasto",
      ],
    },
    marketingTricks: [
      {
        name: "⏰ Present Bias",
        description:
          "'Get €500 NOW' exploits your brain's preference for immediate rewards over future costs. You feel the pain of needing money today, but €570 in 30 days feels distant.",
      },
      {
        name: "🎭 Framing Effect",
        description:
          "'No credit check' frames this as helpful, hiding that it's predatory. They're not checking credit because they charge rates so high they profit even from defaults.",
      },
      {
        name: "🔢 Shrouding Fees",
        description:
          "APR of 47% is buried in fine print. Processing fees, late fees, reminder fees nickel-and-dime you. Total cost is intentionally unclear.",
      },
      {
        name: "🚪 Slippery Slope",
        description:
          "Designed for repeat borrowing. Once you're in, missed payments and 'rollover loans' create a debt trap that's hard to escape.",
      },
    ],
  },
  {
    id: 3,
    title: "High-Interest Savings: 3.5% ✨",
    subtitle: "Grow your money risk-free",
    image: "savings piggybank",
    terms: [
      "Talletussuoja up to €100,000",
      "No monthly fees",
      "No minimum balance",
      "Easy mobile transfers",
      "Rate reviewed quarterly",
    ],
    isGoodDeal: true,
    breakdown: {
      initialCost: 0,
      yearCost: -35,
      hiddenFees: [],
      verdict:
        "Great choice! With €1,000 saved, you'd earn €35 in interest over a year. Finnish deposit guarantee scheme (talletussuoja) protects up to €100,000. Banks like Nordea, OP, and S-Pankki offer competitive rates.",
      tips: [
        "Keep 3-6 months expenses in emergency fund",
        "Compare rates on Finanssivalvonta's website",
        "EU deposit guarantee protects your savings",
        "Set up automatic säästösopimus (savings agreement)",
        "Consider ASP-tili if saving for first home",
      ],
    },
    marketingTricks: [
      {
        name: "✅ Transparent Pricing",
        description:
          "GOOD example: No hidden fees, clear terms. This is how ethical marketing works - straightforward benefits without manipulation.",
      },
      {
        name: "🛡️ Loss Aversion (Positive)",
        description:
          "Uses your fear of losing money productively. 'Talletussuoja' (deposit protection) reassures you, helping overcome inaction bias toward saving.",
      },
      {
        name: "🎯 Mental Accounting",
        description:
          "Helps you create separate 'savings bucket' in your mind, making it easier to resist spending. This trick actually benefits you!",
      },
    ],
  },
  {
    id: 4,
    title: "Buy Now Pay Later 🛍️",
    subtitle: "Split any purchase into 3 easy payments!",
    image: "shopping bags",
    terms: [
      "3 payments every 30 days",
      "Late fee: €5-€15 per missed payment",
      "Missed payments reported to credit registry",
      "33% of purchase due today",
    ],
    isGoodDeal: false,
    breakdown: {
      initialCost: 200,
      yearCost: 850,
      hiddenFees: [
        "€600 in initial purchases",
        "Average 1-2 missed payments = €20 in late fees",
        "Overspending: Average user spends 40% more",
        "Multiple Klarna/Collector plans = harder to track",
        "Negative mark on luottotiedot affects housing, loans",
      ],
      verdict:
        "BNPL (like Klarna, Collector) seems harmless but makes overspending too easy. Finnish consumer debt is rising fastest in 18-25 age group. Multiple BNPLs create 'debt fog' where you lose track of what you owe.",
      tips: [
        "If you can't afford it now, wait and save",
        "BNPL affects your luottotiedot (credit report)",
        "Check your credit report free at Suomen Asiakastieto",
        "Stick to one BNPL maximum",
        "Negative luottotiedot can block apartment rentals in Finland",
      ],
    },
    marketingTricks: [
      {
        name: "💳 Payment Decoupling",
        description:
          "Splitting into 'easy payments' psychologically separates the pain of paying from pleasure of buying. Your brain doesn't register the full cost.",
      },
      {
        name: "🧠 Cognitive Load",
        description:
          "Multiple BNPL accounts create 'debt fog' - you can't track what you owe. This confusion is intentional, leading to overspending.",
      },
      {
        name: "🎮 Gamification",
        description:
          "Apps make borrowing feel like a game with slick UX. Smooth checkout = less friction = impulsive purchases you'd normally reconsider.",
      },
      {
        name: "😌 Normalcy Bias",
        description:
          "'Everyone uses Klarna!' Social proof makes debt feel normal and safe. But 40% of BNPL users overspend - it's normalized financial harm.",
      },
    ],
  },
  {
    id: 5,
    title: "Student Discount: 50% Off! 🎓",
    subtitle: "Verified students save on software & services",
    image: "student education",
    terms: [
      "Student ID required",
      "Includes music, software, and streaming",
      "Cancel anytime",
      "Savings: €5-10/month per service",
    ],
    isGoodDeal: true,
    breakdown: {
      initialCost: 0,
      yearCost: -120,
      hiddenFees: [],
      verdict:
        "Smart move! Student discounts can save you €100-200/year on services you already use. Spotify, Apple Music, Adobe, Microsoft, and many Finnish retailers offer legitimate student pricing with FRANK or opiskelijakortti.",
      tips: [
        "Get FRANK card (free student discount card)",
        "Use it at K-Citymarket, Prisma, R-kioski for 5-15% off",
        "Matkahuolto and VR offer student discounts",
        "Check Opiskelijat.fi for complete list",
        "Many Finnish SaaS companies honor EU student status",
      ],
    },
    marketingTricks: [
      {
        name: "🎓 Identity Marketing",
        description:
          "Targets your student identity, making you feel special. But unlike predatory tactics, this genuinely offers value to a group that needs it.",
      },
      {
        name: "✅ Transparency Win",
        description:
          "Clear terms, easy cancellation, verified eligibility. This is ethical marketing - using psychology (belonging) while providing real value.",
      },
      {
        name: "🔄 Habitual Anchoring",
        description:
          "Gets you using services young. While they hope you'll stay after graduation, the current savings are real and disclosed.",
      },
    ],
  },
  {
    id: 6,
    title: "Crypto Profits 10X! 🚀",
    subtitle: "Join the investment revolution NOW!",
    image: "cryptocurrency bitcoin",
    terms: [
      "Limited spots available",
      "Minimum investment €200",
      "High returns guaranteed*",
      "Exclusive platform access",
      "*Past performance shown",
    ],
    isGoodDeal: false,
    breakdown: {
      initialCost: 200,
      yearCost: 200,
      hiddenFees: [
        "Unclear withdrawal terms or fees",
        "No risk disclosures required by EU law",
        "Platform ownership/location not disclosed",
        "'Guaranteed returns' are illegal to promise in Finland",
        "Likely unregistered - violates Finnish Virtual Currency Act",
      ],
      verdict:
        "MAJOR RED FLAGS! Legitimate crypto platforms in Finland must register with Finanssivalvonta. This ad promises 'guaranteed returns' (illegal under Finnish law), provides zero details about risks, fees, or how it works. No transparent company info = likely scam. You could lose everything.",
      tips: [
        "NO investment can legally guarantee returns in Finland/EU",
        "MiCA regulation requires crypto firms to disclose risks clearly",
        "If withdrawal terms aren't crystal clear, it's a trap",
        "Report suspected crypto scams to Kyberturvallisuuskeskus",
        "Stick to regulated platforms: Coinbase, Kraken (both registered in EU)",
      ],
    },
    marketingTricks: [
      {
        name: "⏳ Scarcity Manipulation",
        description:
          "'Limited spots available' creates false urgency. FOMO (Fear of Missing Out) shuts down rational thinking, pushing you to act before researching.",
      },
      {
        name: "🚀 Hype Language",
        description:
          "'10X profits!' 'Revolution!' uses excitement words to trigger greed. Legitimate investments don't need hype - scams rely on emotion over logic.",
      },
      {
        name: "⭐ Exclusivity Trap",
        description:
          "'Exclusive platform access' makes you feel special/chosen. Classic scam tactic: you're not special, you're a target. Real platforms are open to all.",
      },
      {
        name: "📊 Survivorship Bias",
        description:
          "'Past performance' only shows winners, hiding the 90% who lost money. Asterisk (*) is there to avoid legal trouble while still deceiving you.",
      },
    ],
  },
];