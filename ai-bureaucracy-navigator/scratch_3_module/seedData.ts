import { GovernmentService, KnowledgeArticle, LifeEvent, Scheme } from "./government";

const birthRegistration: GovernmentService = {
  id: "birth-registration",
  name: "Birth registration and certificate",
  status: "required",
  reason: "Establishes the child's legal identity and supports later services.",
  documents: ["Hospital birth record", "Parents' identity proof", "Address proof"],
  howToApply: "Register with the local Registrar of Births and Deaths within the applicable reporting period.",
  whereToApply: "Local municipal authority, panchayat, or authorised online civil registration portal.",
  officialUrl: "https://crsorgi.gov.in/",
  articleId: "birth-certificate",
};

const aadhaarService: GovernmentService = {
  id: "child-aadhaar",
  name: "Child Aadhaar enrolment",
  status: "recommended",
  reason: "May help access identity-linked services as the child grows.",
  documents: ["Birth certificate", "Parent or guardian Aadhaar"],
  howToApply: "Book or visit an Aadhaar enrolment centre with a parent or guardian.",
  whereToApply: "UIDAI authorised Aadhaar enrolment centre.",
  officialUrl: "https://uidai.gov.in/",
};

export const lifeEvents: LifeEvent[] = [
  {
    id: "new-baby",
    title: "New Baby",
    icon: "baby",
    description: "Set up the registrations and records your family may need after a birth.",
    questions: [
      { id: "birthPlace", label: "Where did the birth take place?", type: "select", options: ["Hospital", "Home", "Other"] },
      { id: "state", label: "State or UT", type: "text" },
    ],
    services: [birthRegistration, aadhaarService, {
      id: "vaccination-records", name: "Vaccination and health records", status: "recommended",
      reason: "Helps maintain a reliable record of the child's immunisations.", documents: ["Hospital discharge summary", "Birth record"],
      howToApply: "Ask the hospital or healthcare provider for the child health and immunisation record.",
      whereToApply: "Hospital, primary health centre, or local health provider.", officialUrl: "https://www.mohfw.gov.in/",
    }],
  },
  {
    id: "lost-documents", title: "Lost Important Documents", icon: "document",
    description: "Work through replacement and reporting steps for important documents.",
    questions: [
      { id: "documentType", label: "Which document was lost?", type: "select", options: ["PAN", "Aadhaar", "Passport", "Other"] },
      { id: "state", label: "State or UT", type: "text" },
    ],
    services: [{
      id: "pan-reprint", name: "PAN reprint or correction", status: "conditional",
      reason: "Use when your PAN card is lost, damaged, or needs an updated record.", documents: ["PAN number if available", "Identity proof", "Address proof"],
      howToApply: "Use the official PAN services provider to request a reprint or correction.",
      whereToApply: "Authorised online PAN service portal.", officialUrl: "https://www.incometax.gov.in/", articleId: "pan-card",
    }],
  },
  ...[
    ["marriage", "Marriage", "marriage", "Plan registrations and record updates after marriage.", "Marriage registration guidance"],
    ["property", "Buying a Property", "property", "Prepare for property registration and related records.", "Property registration guidance"],
    ["business", "Starting a Business", "business", "Find registrations and licences relevant to your business.", "Business registration guidance"],
    ["education", "College / Education", "education", "Explore education records, certificates, and support services.", "Education service guidance"],
    ["new-job", "Starting a New Job", "job", "Organise employment and tax-related actions for a new role.", "Employment record guidance"],
    ["retirement", "Retirement", "retirement", "Review pension, identity, and benefit-related services.", "Retirement service guidance"],
    ["death-family", "Death in Family", "family", "Work through records, certificates, and claim-related next steps.", "Death certificate and claim guidance"],
    ["vehicle", "Buying a Vehicle", "vehicle", "Understand registration, licence, insurance, and tax-related steps.", "Vehicle registration guidance"],
    ["moving-state", "Moving to Another State", "moving", "Identify records that may need updating after a move.", "Interstate address update guidance"],
    ["new-address", "Moving to a New Address", "address", "Update address-linked records where appropriate.", "Address update guidance"],
  ].map(([id, title, icon, description, serviceName]) => ({
    id, title, icon, description,
    questions: [{ id: "state", label: "State or UT", type: "text" as const }, { id: "situation", label: "Which best describes your situation?", type: "text" as const }],
    services: [{ id: `${id}-guidance`, name: serviceName, status: "conditional" as const,
      reason: "Requirements vary by state, local authority, and your individual situation.", documents: ["Identity proof", "Address proof", "Relevant supporting records"],
      howToApply: "Review the applicable official authority guidance before applying.", whereToApply: "Relevant government department or authorised service portal.", officialUrl: "https://www.india.gov.in/" }],
  })),
];

export const schemes: Scheme[] = [
  {
    id: "pm-kisan", name: "PM-KISAN", description: "Income support scheme for eligible landholding farmer families.",
    category: ["Farmer", "Social Welfare"], states: ["All India"],
    eligibility: "Eligibility and exclusions are determined by the scheme guidelines and local verification.",
    benefits: ["Income support, subject to scheme conditions"], documents: ["Aadhaar", "Land records", "Bank account details"],
    applicationMethod: "Register through the official portal or designated local authorities.", officialUrl: "https://pmkisan.gov.in/", lastVerified: "2026-09-04",
    matches: ({ occupation }) => occupation === "Farmer" ? "likely" : "unlikely",
  },
  {
    id: "pm-mudra", name: "Pradhan Mantri MUDRA Yojana", description: "Credit support through eligible lending institutions for small business activity.",
    category: ["Business", "Employment"], states: ["All India"],
    eligibility: "Depends on the business activity, lender assessment, and current scheme terms.",
    benefits: ["Access to eligible business credit through participating lenders"], documents: ["Identity proof", "Address proof", "Business plan or activity details"],
    applicationMethod: "Apply through a participating bank, NBFC, or microfinance institution.", officialUrl: "https://www.mudra.org.in/", lastVerified: "2026-09-04",
    matches: ({ occupation }) => ["Self-employed", "Business owner"].includes(occupation) ? "likely" : "possible",
  },
  {
    id: "national-scholarship", name: "National Scholarship Portal", description: "A single portal for participating central and state scholarship schemes.",
    category: ["Student", "Education"], states: ["All India"],
    eligibility: "Varies by the selected scholarship, institution, category, income, and academic conditions.",
    benefits: ["Scholarship opportunities administered through participating schemes"], documents: ["Aadhaar or identity proof", "Academic records", "Income certificate when required"],
    applicationMethod: "Find and apply to the relevant scholarship on the official portal.", officialUrl: "https://scholarships.gov.in/", lastVerified: "2026-09-04",
    matches: ({ occupation }) => occupation === "Student" ? "likely" : "possible",
  },
];

export const articles: KnowledgeArticle[] = [
  {
    id: "pan-card", title: "PAN card: application and reprint", category: "Documents",
    summary: "PAN is a permanent account number used for tax-related and financial activities in India.",
    whoNeedsIt: "People who must obtain or use a PAN under the applicable Income Tax rules.", eligibility: "Eligibility depends on the requested PAN service and current official instructions.",
    documents: ["Identity proof", "Address proof", "Date of birth proof where applicable"],
    steps: ["Choose the relevant PAN service", "Complete the application", "Upload or submit supporting evidence", "Pay applicable charges", "Track the acknowledgement"],
    whereToApply: "Authorised PAN service provider or the Income Tax Department's official services.", mode: "Online and designated offline centres", fees: "Depends on service and delivery preference.", processingTime: "Check the official portal for current processing status.",
    commonMistakes: ["Entering details that do not match identity documents", "Using an unofficial portal"],
    faqs: [{ question: "Can I replace a lost PAN card?", answer: "Use an authorised PAN reprint or correction service." }],
    officialSource: "https://www.incometax.gov.in/", lastVerified: "2026-09-04", verified: true,
    service: { id: "pan-service", name: "PAN application or reprint", status: "conditional", reason: "Supports tax and financial activities where PAN is required.", documents: ["Identity proof", "Address proof"], howToApply: "Apply through an authorised PAN service.", whereToApply: "Official Income Tax or authorised provider portal.", officialUrl: "https://www.incometax.gov.in/" },
  },
  {
    id: "birth-certificate", title: "Birth certificate: registration and copy", category: "Certificates",
    summary: "A birth certificate is issued after a birth is registered with the competent local authority.",
    whoNeedsIt: "Parents or guardians registering a child's birth, and people seeking an official birth record.", eligibility: "The process and time limits are governed by the relevant local registration authority.",
    documents: ["Hospital birth record where available", "Parents' identity proof", "Address proof"],
    steps: ["Contact the local registration authority", "Submit the birth report and supporting documents", "Pay any applicable fee", "Collect or download the certificate when issued"],
    whereToApply: "Local Registrar of Births and Deaths, municipality, panchayat, or approved state portal.", mode: "Online availability varies by local authority", fees: "Varies by state, municipality, and timing of registration.", processingTime: "Varies by registration authority and record completeness.",
    commonMistakes: ["Waiting past applicable reporting timelines", "Misspelling names or dates in the registration"],
    faqs: [{ question: "Is a birth certificate always automatic?", answer: "Registration procedures differ by locality; confirm with the competent local authority." }],
    officialSource: "https://crsorgi.gov.in/", lastVerified: "2026-09-04", verified: true, service: birthRegistration,
  },
];
