/**
 * CharityCareCheck.com — Configuration Data
 * All static data objects are centralized here for easy maintenance.
 * Update FPL figures annually (HHS releases new guidelines each January).
 * Last updated: 2026. State notes re-verified against official sources Nov. 24, 2026.
 */

// ─── FEDERAL POVERTY LEVEL DATA (2026) ───────────────────────────────────────
// Source: U.S. Dept. of Health & Human Services, aspe.hhs.gov/poverty-guidelines
// Alaska and Hawaii use higher thresholds per federal guidelines.
const FPL_2026 = {
  base:   [15960, 21640, 27320, 33000, 38680, 44360, 50040, 55720],
  alaska: [19950, 27050, 34150, 41250, 48350, 55450, 62550, 69650],
  hawaii: [18360, 24890, 31420, 37950, 44480, 51010, 57540, 64070]
};
// Each additional person beyond 8: +$5,680 (base), +$7,100 (Alaska), +$6,530 (Hawaii)

// ─── STATE-SPECIFIC CHARITY CARE NOTES ───────────────────────────────────────
// Covers states with laws that go beyond baseline federal 501(r) requirements.
// Source: state statutes and state agency pages; re-check each January.
const STATE_NOTES = {
  "California": "California's Hospital Fair Pricing Act (Health & Safety Code §127400 et seq.) applies to all California hospitals. Since Jan. 1, 2022 (AB 1020), uninsured patients and patients with high medical costs can qualify for charity care or discounted payment at incomes up to 400% of the federal poverty level (previously 350%). Since Jan. 1, 2025 (AB 2297), hospitals can't use asset tests, set application deadlines, or report hospital debt to credit reporting agencies.",
  "New York": "New York's Hospital Financial Assistance Law requires most hospitals to waive all charges for households below 200% FPL, and to cap what patients pay at 200-300% FPL (10% of the Medicaid amount for uninsured patients) and 301-400% FPL (20%). Hospitals can't send your bill to a collector while your application is under review, or until at least six months after the first bill, and can't ask about assets such as a house or car.",
  "Illinois": "The Illinois Hospital Uninsured Patient Discount Act covers uninsured patients. At urban hospitals, family income up to 200% FPL gets a 100% discount, and income up to 600% FPL gets a discount, on medically necessary services over $150 per admission or encounter. Rural and critical access hospitals use lower limits (100% discount up to 125% FPL, discounts up to 300% FPL). Payments are capped at 20% of family income in a 12-month period.",
  "Massachusetts": "Massachusetts' Health Safety Net can pay for hospital services for uninsured and underinsured residents with family income up to 150% FPL, and partially (after a deductible) above 150% up to 300% FPL. Ask the hospital whether you qualify for the Health Safety Net, or call (877) 910-2100 for details.",
  "Texas": "Texas has no statewide income cutoff for charity care. Under Health & Safety Code Chapter 311, nonprofit hospitals must each year meet one of three community-benefit standards that include charity and indigent care, but each hospital sets its own eligibility rules. County hospital districts often have broader programs. Ask specifically about \"financial assistance\" rather than just \"charity care.\"",
  "Florida": "Florida does not require nonprofit hospitals to run a charity care program, but Fla. Stat. 395.301 requires hospitals to post their financial assistance and charity care policies on their website, and to give you an itemized bill within 7 days of your request after discharge. Check eligibility for Florida KidCare for children in your household.",
  "Colorado": "Colorado's Hospital Discounted Care program (HB 21-1198) limits what patients at or below 250% FPL can be billed at general acute and critical access hospitals, at rates set by the state. Payment plans can't exceed 4% of gross monthly income for hospital bills (2% for each separately billing provider) or 36 payments.",
  "Washington": "Washington's charity care law (RCW 70.170, WAC 246-453) requires free care up to 200% FPL at most hospitals. For services since July 1, 2022, larger \"Tier 1\" hospitals must discount care up to 400% FPL and \"Tier 2\" hospitals up to 300% FPL. Charity care applies to past bills even if they're old or in collections.",
  "Oregon": "Oregon requires nonprofit hospitals to provide financial assistance: 100% at up to 200% FPL, 75% at 201-300%, 50% at 301-350%, and 25% at 351-400% FPL (applied to your share after insurance). Since July 1, 2024 hospitals must automatically prescreen uninsured, Medicaid-enrolled, and high-balance patients, and since Jan. 1, 2025 patients can appeal denials.",
  "Minnesota": "Minnesota hospitals must try to screen uninsured patients for charity care within 30 days of service. Until your eligibility is decided, or while an application is pending, the hospital can't refer the debt to collections, start a payment plan, or offer you a loan for the bill. Each hospital sets its own income limits.",
  "New Jersey": "New Jersey's Charity Care program provides free hospital care for eligible residents with income up to 200% FPL, and a sliding scale from 200% to 300% FPL (patients pay 20% to 80% of the charge). Assets are limited to $7,500 for an individual or $15,000 for a family. Physician, anesthesia, and radiology fees are billed separately and may not be reduced.",
  "Connecticut": "Connecticut requires nonprofit hospitals to offer free and/or discounted care, but each hospital sets its own rules. Uninsured patients under 250% FPL who aren't eligible for public insurance can't be billed more than the cost of providing services. Hospitals and their collectors can't report unpaid medical bills to credit bureaus.",
  "Maryland": "Maryland hospitals must provide free medically necessary care at or below 200% FPL, and reduced-cost care (75% off at 201-250% FPL, 60% off at 251-300%). Patients with medical debt over 25% of family income can get discounts up to 500% FPL. You have 240 days from the first bill to apply, and billing and collections pause while your application is reviewed.",
  "default": 'Federal IRS 501(r) regulations require all nonprofit hospitals to have a Financial Assistance Policy (FAP). Ask specifically for their "Financial Assistance Policy" or "Charity Care Application" — hospitals are required to provide this documentation upon request.'
};

// ─── STATE-LAW THRESHOLDS USED BY THE CALCULATOR ─────────────────────────────
// Only numbers confirmed against state statutes / agency pages (Nov. 2026). A state is
// listed ONLY if its law sets a number the calculator can use.
//   freeUpTo      % FPL at or below which state law requires free care (null = state law has no fixed free band)
//   discountUpTo  % FPL up to which state law requires a discount / capped charges
//   appliesTo     'all' = every hospital, 'nonprofit' = nonprofit hospitals only
//   uninsuredOnly true = the rule only covers uninsured patients
// Everything else falls back to "typical" bands (free at or below 200% FPL, discounts up to 400% FPL),
// which the calculator labels as typical, not guaranteed.
const STATE_THRESHOLDS = {
  'California':    { freeUpTo: null, discountUpTo: 400, appliesTo: 'all',       basis: 'the Hospital Fair Pricing Act' },
  'New York':      { freeUpTo: 200,  discountUpTo: 400, appliesTo: 'all',       basis: "New York's Hospital Financial Assistance Law" },
  'Washington':    { freeUpTo: 200,  discountUpTo: 300, appliesTo: 'all',       basis: 'RCW 70.170 (larger hospitals must discount up to 400% FPL)' },
  'Oregon':        { freeUpTo: 200,  discountUpTo: 400, appliesTo: 'nonprofit', basis: "Oregon's hospital financial assistance law" },
  'New Jersey':    { freeUpTo: 200,  discountUpTo: 300, appliesTo: 'all',       basis: "New Jersey's Charity Care program" },
  'Maryland':      { freeUpTo: 200,  discountUpTo: 300, appliesTo: 'all',       basis: 'Md. Health-General §19-214.1' },
  'Illinois':      { freeUpTo: 200,  discountUpTo: 600, appliesTo: 'all',       basis: 'the Hospital Uninsured Patient Discount Act', uninsuredOnly: true },
  'Massachusetts': { freeUpTo: 150,  discountUpTo: 300, appliesTo: 'all',       basis: 'the Health Safety Net' },
  'Colorado':      { freeUpTo: null, discountUpTo: 250, appliesTo: 'all',       basis: 'the Hospital Discounted Care program (HB 21-1198)' }
};

// ─── HOSPITAL TYPE INFO MESSAGES ─────────────────────────────────────────────
const HOSPITAL_TYPE_MESSAGES = {
  nonprofit: '✅ <strong>Best case scenario.</strong> Nonprofit hospitals with 501(c)(3) status are federally required by IRS 501(r) rules to maintain a Financial Assistance Policy. They must maintain a Financial Assistance Policy and apply it consistently to qualifying patients.',
  government: '✅ <strong>Often good options.</strong> Public/government hospitals (county, state) frequently run their own indigent-care programs and may be subject to state or county rules, and to federal rules if they hold 501(c)(3) status. Ask for the county or state assistance program.',
  forprofit: '⚠️ <strong>Fewer legal protections.</strong> For-profit hospitals have no federal charity care obligation. However, many still offer financial assistance — always ask. California, Colorado, and several other states require them to provide charity care regardless.',
  unknown: '💡 <strong>Easy to find out.</strong> Search "[hospital name] 501c3" or "[hospital name] nonprofit" on Google. Or call billing and ask: "Is this hospital a nonprofit or tax-exempt facility?"'
};

// ─── HOSPITAL RIGHTS TABLE DATA ───────────────────────────────────────────────
const HOSPITAL_RIGHTS = {
  nonprofit: [
    { label: 'Required to have FAP',        val: 'Yes — federal law',          hi: true  },
    { label: 'Must post FAP publicly',       val: 'Yes — IRS 501(r)',           hi: true  },
    { label: 'Application window',          val: 'At least 240 days to apply', hi: true  },
    { label: 'Can report to credit bureaus', val: 'Not before 120 days + 30-day notice', hi: false },
    { label: 'Must write off if eligible',   val: 'Yes',                       hi: true  },
  ],
  government: [
    { label: 'Charity care obligation',      val: 'Yes — state + federal',     hi: true  },
    { label: 'Sliding scale discounts',      val: 'Varies by county/state', hi: false },
    { label: 'Application process',          val: 'Ask for "County Assistance"',hi: false },
    { label: 'Credit reporting protection',  val: 'Depends on state law',      hi: false },
  ],
  forprofit: [
    { label: 'Federal FAP obligation',       val: 'No',                        hi: false },
    { label: 'State law may require it',     val: 'CA, IL, NY, WA, others',   hi: false },
    { label: 'Voluntary programs exist',     val: 'Ask specifically',          hi: false },
    { label: 'Negotiation possible',         val: 'Always try',                hi: true  },
    { label: 'Uninsured discount',           val: 'Ask about self-pay discounts', hi: true  },
  ],
  unknown: [
    { label: 'First step',                   val: 'Find out hospital type',    hi: false },
    { label: 'Ask billing',                  val: '"Are you a 501(c)(3)?"',    hi: true  },
    { label: 'Search online',               val: '"[name] nonprofit status"', hi: false },
    { label: 'Request FAP',                  val: 'Nonprofits must provide it free', hi: true  },
  ]
};

// ─── SOURCES & CITATIONS ──────────────────────────────────────────────────────
// Used to render the E-E-A-T sources section on the page.
const SOURCES = [
  {
    label: 'IRS Section 501(r) — Financial Assistance Requirements',
    url: 'https://www.irs.gov/charities-non-profits/requirements-for-501c3-hospitals-under-the-affordable-care-act-section-501r',
    desc: 'Official IRS rules governing nonprofit hospital charity care obligations, FAP requirements, and the 120-day and 240-day collection and application timelines.'
  },
  {
    label: 'HHS 2026 Federal Poverty Guidelines',
    url: 'https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines',
    desc: 'Official U.S. Department of Health & Human Services FPL thresholds used to calculate eligibility tiers in this tool.'
  },
  {
    label: 'CFPB — Medical Debt & Collections Guide',
    url: 'https://www.consumerfinance.gov/consumer-tools/medical-debt/',
    desc: 'Consumer Financial Protection Bureau guidance on medical debt, collection rules, and patient rights under the FDCPA.'
  },
  {
    label: 'CMS — Hospital Price Transparency',
    url: 'https://www.cms.gov/hospital-price-transparency',
    desc: 'Centers for Medicare & Medicaid Services rules requiring hospitals to publish standard charges and financial assistance policies.'
  },
  {
    label: 'National Health Law Program — State Charity Care Laws',
    url: 'https://healthlaw.org/',
    desc: 'Research and advocacy organization tracking state-by-state charity care legislation and patient protection laws.'
  },
  {
    label: 'KFF — Hospital Charity Care & Financial Assistance',
    url: 'https://www.kff.org/report-section/hospital-charity-care-how-hospitals-account-for-financial-assistance/',
    desc: 'KFF (Kaiser Family Foundation) analysis of how nonprofit hospitals report and deliver charity care nationally.'
  }
];
