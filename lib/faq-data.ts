// FAQ data for SEO structured data - Updated for 2026
// This file is imported by both server and client components
// Sources: CMS.gov, Medicare.gov, Healthcare.gov, KFF.org

export interface FAQItem {
  question: string;
  answer: string;
  source?: {
    name: string;
    url: string;
  };
}

export const healthInsuranceFaqs: FAQItem[] = [
  {
    question: "How much is health insurance per month in 2026?",
    answer:
      "In 2026, the average cost of a Silver health insurance plan is $687/month before subsidies. However, costs vary significantly by age: around $425/month for children, $687 for adults, and up to $1,448 for seniors. With ACA subsidies (if you qualify), the average cost drops to around $50/month for the lowest-cost plans. Important: Enhanced subsidies expired at the end of 2025, so many people will pay more in 2026 unless Congress acts to restore them.",
    source: {
      name: "Kaiser Family Foundation Health Insurance Marketplace Calculator",
      url: "https://www.kff.org/interactive/subsidy-calculator/",
    },
  },
  {
    question: "What are the ACA subsidy income limits for 2026?",
    answer:
      "For 2026, the 'subsidy cliff' has returned after enhanced subsidies expired. You must earn between 100% and 400% of the Federal Poverty Level (FPL) to qualify for premium tax credits. The 2026 income limits are: $15,650-$62,600 for individuals, $21,150-$84,600 for couples, and $32,150-$128,600 for a family of four. If your income exceeds 400% FPL by even $1, you won't qualify for any subsidies and must repay any credits received.",
    source: {
      name: "Healthcare.gov - Federal Poverty Level Guidelines",
      url: "https://www.healthcare.gov/glossary/federal-poverty-level-fpl/",
    },
  },
  {
    question: "When is open enrollment for health insurance 2026?",
    answer:
      "Open enrollment for 2026 ACA marketplace plans ran from November 1, 2025 to January 15, 2026 in most states. To get coverage starting January 1, 2026, you needed to enroll by December 15, 2025. If you enrolled between December 16 and January 15, coverage started February 1, 2026. Some states with their own exchanges had different deadlines. Important: Starting fall 2026, open enrollment will end December 15 in most states.",
    source: {
      name: "CMS.gov - Marketplace Open Enrollment",
      url: "https://www.cms.gov/marketplace",
    },
  },
  {
    question: "What is a deductible in health insurance?",
    answer:
      "A deductible is the amount you pay out-of-pocket for healthcare services before your insurance starts paying. For example, with a $3,000 deductible, you pay the first $3,000 of medical bills, then insurance covers a percentage (typically 70-80%) of costs above that. In 2026, average deductibles for Silver plans range from $3,000-$5,000 for individuals. Lower deductibles mean higher monthly premiums, and vice versa.",
    source: {
      name: "Healthcare.gov - Deductible Glossary",
      url: "https://www.healthcare.gov/glossary/deductible/",
    },
  },
  {
    question: "What does PPO mean in health insurance?",
    answer:
      "PPO (Preferred Provider Organization) is a health plan type offering more flexibility in choosing doctors. You can see specialists without referrals and use out-of-network providers (at higher cost). In 2026, PPO plans average about $680/month vs $562/month for HMOs - a $118 monthly difference. PPOs are best if you want freedom to see any doctor; HMOs cost less but require you to stay in-network and get referrals for specialists.",
    source: {
      name: "Healthcare.gov - Health Plan Types",
      url: "https://www.healthcare.gov/choose-a-plan/plan-types/",
    },
  },
  {
    question: "Can I get health insurance outside of open enrollment?",
    answer:
      "Yes, through a Special Enrollment Period (SEP) if you have a qualifying life event. Common qualifying events include: losing job-based coverage, getting married or divorced, having a baby, moving to a new ZIP code with different plan options, or turning 26 (aging off parent's plan). You typically have 60 days from the event to enroll. Note: The SEP for people earning under 150% FPL is paused through the end of 2026.",
    source: {
      name: "Healthcare.gov - Special Enrollment Period",
      url: "https://www.healthcare.gov/glossary/special-enrollment-period/",
    },
  },
];

export const medicareFaqs: FAQItem[] = [
  {
    question: "What is Medicare and how does it work in 2026?",
    answer:
      "Medicare is federal health insurance for people 65+, younger people with certain disabilities, and those with End-Stage Renal Disease. It has four parts: Part A (hospital insurance - usually premium-free), Part B (medical insurance - $202.90/month in 2026), Part C (Medicare Advantage - private plans combining A, B, and usually D), and Part D (prescription drug coverage). In 2026, there's also a new $2,100 annual cap on Part D out-of-pocket drug costs.",
    source: {
      name: "Medicare.gov - What is Medicare?",
      url: "https://www.medicare.gov/what-medicare-covers",
    },
  },
  {
    question: "How much does Medicare Part B cost in 2026?",
    answer:
      "The standard Medicare Part B premium for 2026 is $202.90/month - an increase of $17.90 from $185 in 2025. The annual deductible is $283 (up from $257). Higher-income beneficiaries pay more through IRMAA (Income-Related Monthly Adjustment Amount), ranging from $284.10 to $689.90/month based on income. Part B covers 80% of approved outpatient services after you meet the deductible.",
    source: {
      name: "CMS.gov - 2026 Medicare Parts A & B Premiums and Deductibles",
      url: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-and-deductibles",
    },
  },
  {
    question: "What are the Medicare Part D changes for 2026?",
    answer:
      "Major Part D improvements for 2026 include: (1) The out-of-pocket cap increased to $2,100 (from $2,000 in 2025) - after which you pay $0 for covered drugs the rest of the year. (2) Maximum deductible is $615. (3) The 'donut hole' coverage gap no longer exists. (4) The Medicare Prescription Payment Plan auto-renews, letting you spread drug costs monthly. (5) Ten drugs now have Medicare-negotiated prices, saving beneficiaries up to 79% on medications like Januvia, Eliquis, and Jardiance.",
    source: {
      name: "Medicare.gov - Part D Drug Coverage",
      url: "https://www.medicare.gov/drug-coverage-part-d",
    },
  },
  {
    question: "Does Medicare cover dental in 2026?",
    answer:
      "Original Medicare (Parts A and B) does NOT cover routine dental care like cleanings, fillings, or dentures. However, many Medicare Advantage plans include dental, vision, and hearing benefits at no extra premium. If you want dental coverage with Original Medicare, you need a separate dental insurance plan. In 2026, Medicare Advantage plans must also match or improve upon Original Medicare cost-sharing for behavioral health services.",
    source: {
      name: "Medicare.gov - Dental Services",
      url: "https://www.medicare.gov/coverage/dental-services",
    },
  },
  {
    question: "What is Medicare Advantage and what changed in 2026?",
    answer:
      "Medicare Advantage (Part C) plans are private insurance alternatives to Original Medicare that combine Parts A, B, and usually D into one plan, often with extra benefits like dental and vision. Key 2026 changes: (1) Maximum out-of-pocket for in-network services dropped to $9,250 (from $9,350). (2) New special enrollment period if your plan's provider directory was wrong. (3) Required parity with Original Medicare for behavioral health costs. (4) Prescription Payment Plan auto-renewal. Most MA plans set limits well below the federal cap.",
    source: {
      name: "Medicare.gov - Medicare Advantage Plans",
      url: "https://www.medicare.gov/health-drug-plans/medicare-advantage-plans",
    },
  },
  {
    question: "What are the 10 Medicare negotiated drug prices for 2026?",
    answer:
      "Starting January 1, 2026, ten drugs have Medicare-negotiated prices under the Inflation Reduction Act: Eliquis (blood clots), Jardiance (diabetes/heart), Xarelto (blood clots), Januvia (diabetes), Farxiga (diabetes/kidney), Entresto (heart failure), Enbrel (autoimmune), Imbruvica (cancer), Stelara (autoimmune), and NovoLog/Fiasp (insulin). Savings average 50%+ - for example, Januvia dropped 79% from $527 to $113 for a 30-day supply. About 9 million Medicare beneficiaries use these drugs.",
    source: {
      name: "CMS.gov - Medicare Drug Price Negotiation Program",
      url: "https://www.cms.gov/inflation-reduction-act-and-medicare/medicare-drug-price-negotiation",
    },
  },
  {
    question: "How do I sign up for Medicare in 2026?",
    answer:
      "You can sign up during your Initial Enrollment Period (IEP), which begins 3 months before you turn 65 and ends 3 months after your birthday month. Enroll online at ssa.gov, call Social Security at 1-800-772-1213, or visit your local Social Security office. If you're already receiving Social Security benefits, you'll be automatically enrolled in Parts A and B. Medicare Advantage and Part D plans have their own Annual Enrollment Period from October 15 to December 7.",
    source: {
      name: "Medicare.gov - Sign Up for Medicare",
      url: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up",
    },
  },
];
