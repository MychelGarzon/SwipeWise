import { Ad } from "../types/ad";
import { UserProfile } from "../types/profile";

const GEMINI_API_KEY =
  "AIzaSyAsZNkUMzKoDgXW3EnblaDc1TZwNmZkGQk";
const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function generatePersonalizedAdsWithAI(
  profile: UserProfile,
): Promise<Ad[]> {
  try {
    const prompt = `
      You are an AI that creates personalized financial education scenarios for Finnish young people.
      
      USER PROFILE:
      - Age Group: ${profile.ageGroup || "Not specified"}
      - Income Level: ${profile.income || "Not specified"}
      - Occupation: ${profile.occupation || "Not specified"}
      - Hobbies/Interests: ${profile.hobbies.length > 0 ? profile.hobbies.join(", ") : "Not specified"}
      
      TASK:
      Generate 6 realistic financial offer scenarios that would be relevant to this user.
      Each scenario should be a realistic financial advertisement they might encounter.
      
      REQUIREMENTS:
      - Mix of GOOD and BAD deals (mostly bad deals - 6 bad, 2 good)
      - Relevant to their age, occupation, and interests
      - Based on Finnish financial context (Finnish banks: Nordea, OP, S-Pankki, Danske Bank)
      - Include realistic APR rates, fees, and terms common in Finland
      - Reference Finnish institutions: Kela, Finanssivalvonta, Suomi.fi, TE-palvelut
      - Each ad should have 4 fine print items
      - Educational breakdowns showing real financial impact over one year
      - Smarter alternatives using Finnish services
      - ALL TEXT MUST BE IN ENGLISH (even though context is Finnish)
      
      PERSONALIZATION GUIDELINES:
      - Students: Focus on student loans, part-time jobs, cheap subscriptions, study materials
      - Employed: Focus on credit cards, car financing, housing, investments
      - Unemployed: Focus on quick loans, job scams, get-rich-quick schemes
      - Gaming hobby: Gaming consoles, subscriptions, in-game purchases, gaming chairs
      - Fashion/Shopping hobby: Shopping credit, clothing subscriptions, buy-now-pay-later
      - Technology hobby: Smartphones, laptops, gadgets, tech subscriptions
      - Travel hobby: Travel cards, airline rewards, vacation packages, currency exchange
      - Sports/Fitness hobby: Gym memberships, equipment financing, supplements
      - Music hobby: Instrument financing, concert tickets, streaming subscriptions
      
      Return ONLY valid JSON with this EXACT structure (no markdown, no code fences):
      
      [
        {
          "id": 1,
          "title": "Catchy marketing title with specific amounts",
          "subtitle": "Attractive one-liner that sounds too good to be true",
          "image": "smartphone deal | money cash | savings piggybank | shopping bags | student education | credit card | gift prize | premium subscription",
          "terms": [
            "Hidden cost or limitation 1",
            "Hidden cost or limitation 2",
            "Hidden cost or limitation 3",
            "Hidden cost or limitation 4"
          ],
          "isGoodDeal": false,
          "breakdown": {
            "initialCost": 0,
            "yearCost": 1200,
            "hiddenFees": [
              "Detailed hidden cost explanation 1",
              "Detailed hidden cost explanation 2",
              "Detailed hidden cost explanation 3",
              "Detailed hidden cost explanation 4"
            ],
            "verdict": "REJECT - This is a bad deal because... (2-3 sentences with specific Finnish alternatives like 'Check OP Bank instead' or 'Compare on Hintaopas.fi')",
            "tips": [
              "Specific actionable tip 1 (e.g., 'Compare this offer on Hintaopas.fi or Kilpailuta.fi')",
              "Specific actionable tip 2 (e.g., 'Check Nordea, OP, or S-Pankki which typically offers better terms')",
              "Specific actionable tip 3 (e.g., 'Visit Finanssivalvonta.fi to verify provider licensing')",
              "Specific actionable tip 4 (e.g., 'Consider [specific alternative action or provider]')"
            ]
          }
        }
      ]
      
      Generate all 8 ads now. Make them diverse, realistic, and educational!
      The id should be sequential numbers 1-8.
      The initialCost is immediate cost (like setup fee), yearCost is total cost over one year.
      Make sure to include realistic Finnish context and specific alternatives!
    `;

    const body = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        response_mime_type: "application/json",
      },
    };

    const res = await fetch(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      console.error("Gemini API error:", await res.text());
      throw new Error("Failed to generate ads with AI");
    }

    const data = await res.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No response from Gemini");
    }

    const ads = JSON.parse(text) as Ad[];

    // Validate we got 8 ads
    if (ads.length < 8) {
      console.warn(
        "AI generated less than 8 ads, padding with extras",
      );
      while (ads.length < 8) {
        ads.push({ ...ads[0], id: ads.length + 1 });
      }
    }

    return ads.slice(0, 8);
  } catch (error) {
    console.error("Error generating ads with AI:", error);
    throw error;
  }
}