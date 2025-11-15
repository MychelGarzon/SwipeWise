export interface UserProfile {
  ageGroup: string;
  income: string;
  occupation: string;
  hobbies: string[];
}

export const AGE_GROUPS = [
  "13-17",
  "18-24",
  "25-34",
  "35-44",
  "45+"
];

export const INCOME_LEVELS = [
  "Student/No income",
  "Under €20,000",
  "€20,000 - €40,000",
  "€40,000 - €60,000",
  "Over €60,000"
];

export const OCCUPATIONS = [
  "Student",
  "IT Professional",
  "Healthcare",
  "Retail",
  "Service Industry",
  "Finance",
  "Education",
  "Unemployed",
  "Other"
];

export const HOBBIES = [
  "Gaming",
  "Sports & Fitness",
  "Music",
  "Travel",
  "Fashion",
  "Technology",
  "Food & Cooking",
  "Reading",
  "Art & Design",
  "Movies & TV",
  "Social Media",
  "Shopping"
];
