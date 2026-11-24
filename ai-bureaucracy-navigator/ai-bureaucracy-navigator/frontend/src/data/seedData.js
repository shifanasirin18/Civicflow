const birthRegistration = {
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

const aadhaarService = {
  id: "child-aadhaar",
  name: "Child Aadhaar enrolment",
  status: "recommended",
  reason: "May help access identity-linked services as the child grows.",
  documents: ["Birth certificate", "Parent or guardian Aadhaar"],
  howToApply: "Book or visit an Aadhaar enrolment centre with a parent or guardian.",
  whereToApply: "UIDAI authorised Aadhaar enrolment centre.",
  officialUrl: "https://uidai.gov.in/",
};

export const lifeEvents = [
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
    questions: [{ id: "state", label: "State or UT", type: "text"  }, { id: "situation", label: "Which best describes your situation?", type: "text"  }],
    services: [{ id: `${id}-guidance`, name: serviceName, status: "conditional" ,
      reason: "Requirements vary by state, local authority, and your individual situation.", documents: ["Identity proof", "Address proof", "Relevant supporting records"],
      howToApply: "Review the applicable official authority guidance before applying.", whereToApply: "Relevant government department or authorised service portal.", officialUrl: "https://www.india.gov.in/" }],
  })),
];

export const schemes = [
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

export const guideSections = [
  {
    id: "sec-01",
    number: "01",
    title: "01 IDENTITY & PERSONAL DOCUMENTS",
    name: "Identity & Personal Documents",
    color: "blue",
    badgeBg: "bg-[#1d6fa5]",
    borderBg: "border-[#1d6fa5]/30",
  },
  {
    id: "sec-02",
    number: "02",
    title: "02 TAMIL NADU CITIZEN SERVICES",
    name: "Tamil Nadu Citizen Services",
    color: "teal",
    badgeBg: "bg-[#0d806a]",
    borderBg: "border-[#0d806a]/30",
  },
  {
    id: "sec-03",
    number: "03",
    title: "03 BUSINESS & EMPLOYMENT",
    name: "Business & Employment",
    color: "green",
    badgeBg: "bg-[#1b7e3b]",
    borderBg: "border-[#1b7e3b]/30",
  },
  {
    id: "sec-04",
    number: "04",
    title: "04 DIGITAL SERVICES & CITIZEN AWARENESS",
    name: "Digital Services & Citizen Awareness",
    color: "orange",
    badgeBg: "bg-[#c86a10]",
    borderBg: "border-[#c86a10]/30",
  },
  {
    id: "sec-05",
    number: "05",
    title: "05 GOVERNMENT UPDATES & SCHEMES",
    name: "Government Updates & Schemes",
    color: "navy",
    badgeBg: "bg-[#11233d]",
    borderBg: "border-[#11233d]/30",
  },
];

export const articles = [
  // ── 01 IDENTITY & PERSONAL DOCUMENTS ────────────────────────────────────────
  {
    id: "aadhaar-apply-update",
    sectionNumber: "01",
    sectionTitle: "01 IDENTITY & PERSONAL DOCUMENTS",
    itemNumber: 1,
    title: "Aadhaar: Apply and Update Details",
    summary: "New enrolment, address/mobile updates, biometrics, and downloads.",
    category: "Identity & Personal Documents",
    officialPortals: ["https://uidai.gov.in/", "https://myaadhaar.uidai.gov.in/"],
    officialSource: "https://myaadhaar.uidai.gov.in/",
    whoNeedsIt: "Any resident of India needing a new 12-digit Aadhaar number or demographic/biometric updates (address, mobile number, name, DOB).",
    eligibility: "All Indian residents (including infants and children). Resident foreign nationals with valid stay.",
    documents: ["Proof of Identity (PoI)", "Proof of Address (PoA)", "Proof of Date of Birth (DoB)", "Proof of Relationship (PoR) for minors"],
    steps: [
      "Visit myaadhaar.uidai.gov.in or locate an authorised Aadhaar Seva Kendra.",
      "Submit an online demographic update (for address change) or book an offline appointment.",
      "Submit valid identity/address proofs and undergo biometric capture (photo, fingerprints, iris).",
      "Receive the Enrolment/Update Request Number (URN) to track progress.",
      "Download your digitally signed e-Aadhaar from myAadhaar once approved."
    ],
    whereToApply: "Aadhaar Seva Kendra, designated banks/post offices, or online via myAadhaar portal.",
    mode: "Online (Demographic updates & e-Aadhaar) & Offline (Biometrics, mobile number & enrolment)",
    fees: "New Enrolment: Free. Demographic update: ₹50. Biometrics update: ₹100. Mandatory child biometrics (ages 5 & 15): Free.",
    processingTime: "Typically 7 to 15 working days.",
    commonMistakes: [
      "Uploading unsupported or uncertified address proof documents",
      "Not maintaining an active registered mobile number to receive OTPs",
      "Spelling discrepancies between identity and address documents"
    ],
    faqs: [
      { question: "Can I update my mobile number online?", answer: "No, mobile number updates require biometric authentication in person at an authorized Aadhaar centre." },
      { question: "Is e-Aadhaar valid everywhere?", answer: "Yes, under the Aadhaar Act, downloaded e-Aadhaar has the same legal validity as the printed physical letter." }
    ],
    lastVerified: "2026-11-17",
    verified: true,
    service: {
      id: "aadhaar-update",
      name: "Aadhaar Services & Updates",
      status: "recommended",
      reason: "Essential national digital identity for banking, government benefits, and verification.",
      documents: ["Proof of Identity", "Proof of Address"],
      howToApply: "Apply online at myaadhaar.uidai.gov.in or visit your nearest Aadhaar Kendra.",
      whereToApply: "UIDAI MyAadhaar Portal & Seva Kendras",
      officialUrl: "https://myaadhaar.uidai.gov.in/"
    }
  },
  {
    id: "pan-card",
    sectionNumber: "01",
    sectionTitle: "01 IDENTITY & PERSONAL DOCUMENTS",
    itemNumber: 2,
    title: "PAN Card: Apply, Download and Correct",
    summary: "New PAN, e-PAN, corrections, and Aadhaar-related requirements.",
    category: "Identity & Personal Documents",
    officialPortals: ["https://www.incometax.gov.in/", "https://www.onlineservices.nsdl.com/"],
    officialSource: "https://www.incometax.gov.in/",
    whoNeedsIt: "Any individual, company, or entity conducting taxable financial transactions, filing ITR, or opening a bank account in India.",
    eligibility: "Any Indian citizen, NRI, or legal business entity eligible under the Income Tax Act.",
    documents: ["Aadhaar Card (for instant paperless e-PAN)", "Proof of Identity", "Proof of Address", "Proof of Date of Birth"],
    steps: [
      "Select application type: Form 49A (New Indian citizen) or CSF (Changes/Correction).",
      "For instant PAN: Use the Income Tax e-filing portal (Instant e-PAN via Aadhaar e-KYC).",
      "For physical card: Complete application on Protean (NSDL) or UTIITSL portal.",
      "Upload identity/address proof, photograph, signature, and pay the fee.",
      "Track dispatch using your 15-digit acknowledgement number or download digital e-PAN."
    ],
    whereToApply: "Protean (NSDL), UTIITSL, or Income Tax e-Filing Portal.",
    mode: "Online (Paperless Aadhaar e-Sign) and Offline facilitation centres.",
    fees: "Instant e-PAN: Free. Physical card dispatched in India: ₹107. Overseas dispatch: ₹1,017.",
    processingTime: "Instant e-PAN: 10 minutes. Physical card: 7 to 14 days.",
    commonMistakes: [
      "Entering names that do not match Aadhaar records",
      "Failing to link PAN with Aadhaar",
      "Submitting low-resolution photograph or signature"
    ],
    faqs: [
      { question: "How can I download my e-PAN?", answer: "Visit the Protean/UTIITSL or Income Tax e-filing portal and enter your PAN along with your Aadhaar/Acknowledgement number." }
    ],
    lastVerified: "2026-11-17",
    verified: true,
    service: {
      id: "pan-service",
      name: "PAN Application and Corrections",
      status: "conditional",
      reason: "Mandatory for tax filing, corporate registration, and high-value financial transactions.",
      documents: ["Aadhaar Card", "Proof of Identity", "Proof of Address"],
      howToApply: "Apply via Income Tax e-Filing or Protean NSDL portal.",
      whereToApply: "Income Tax Department / Protean NSDL",
      officialUrl: "https://www.incometax.gov.in/"
    }
  },
  {
    id: "apply-passport-india",
    sectionNumber: "01",
    sectionTitle: "01 IDENTITY & PERSONAL DOCUMENTS",
    itemNumber: 3,
    title: "Apply for a Passport in India",
    summary: "Fresh passport, renewals, documents, appointments and tracking.",
    category: "Identity & Personal Documents",
    officialPortals: ["https://www.passportindia.gov.in/"],
    officialSource: "https://www.passportindia.gov.in/",
    whoNeedsIt: "Indian citizens wishing to travel abroad for tourism, education, work, or residency, or those renewing an expiring passport.",
    eligibility: "Indian citizen by birth, descent, or naturalisation.",
    documents: ["Proof of Address (Aadhaar, Utility bill, Bank passbook)", "Proof of Date of Birth (Birth certificate, School leaving certificate)", "Non-ECR proof (Class 10+ certificate or graduate degree)"],
    steps: [
      "Register on Passport Seva Online Portal (passportindia.gov.in) and complete Form 1.",
      "Pay application fees online and schedule an appointment at the nearest PSK or POPSK.",
      "Visit PSK on the appointed date with original documents for verification, biometrics, and photo.",
      "Undergo police verification visit at your local residential address.",
      "Track status online; the passport is printed and delivered via Speed Post."
    ],
    whereToApply: "Passport Seva Kendra (PSK) / Post Office Passport Seva Kendra (POPSK) via Passport Seva Online Portal.",
    mode: "Online registration & payment + mandatory in-person PSK biometric appointment.",
    fees: "Normal (36 pages): ₹1,500. Tatkaal: ₹3,500. Jumbo (60 pages): ₹2,000.",
    processingTime: "Normal: 15 to 30 working days. Tatkaal: 1 to 3 working days.",
    commonMistakes: [
      "Discrepancies between present and permanent addresses",
      "Forgetting to carry original documents to the PSK appointment",
      "Not submitting Class 10+ proof for Non-ECR status"
    ],
    faqs: [
      { question: "What is Non-ECR status?", answer: "Emigration Check Not Required (Non-ECR) allows travel abroad without emigration clearance; anyone passing 10th standard or higher is eligible." }
    ],
    lastVerified: "2026-11-17",
    verified: true,
    service: {
      id: "passport-service",
      name: "Passport Application & Renewal",
      status: "recommended",
      reason: "Mandatory international travel identity document.",
      documents: ["Proof of Address", "Proof of DOB", "Class 10 Certificate"],
      howToApply: "Register on Passport Seva portal and book PSK slot.",
      whereToApply: "Passport Seva Kendra",
      officialUrl: "https://www.passportindia.gov.in/"
    }
  },
  {
    id: "digilocker-store-docs",
    sectionNumber: "01",
    sectionTitle: "01 IDENTITY & PERSONAL DOCUMENTS",
    itemNumber: 4,
    title: "DigiLocker: Store Government Documents",
    summary: "Account setup, fetching issued documents, sharing and verification.",
    category: "Identity & Personal Documents",
    officialPortals: ["https://www.digilocker.gov.in/"],
    officialSource: "https://www.digilocker.gov.in/",
    whoNeedsIt: "Any Indian citizen seeking cloud storage for legally recognized electronic versions of Aadhaar, Driving License, RC, Marksheets, and certificates.",
    eligibility: "All Indian citizens holding an Aadhaar card linked with an active mobile phone.",
    documents: ["Aadhaar number and OTP verification"],
    steps: [
      "Visit digilocker.gov.in or install the DigiLocker app on Android/iOS.",
      "Click 'Sign Up', enter full name as per Aadhaar, date of birth, mobile number, and set a 6-digit PIN.",
      "Verify registration via OTP sent to your Aadhaar-registered mobile number.",
      "Navigate to 'Search Documents', choose the issuing department (MoRTH, CBSE, UIDAI, State Boards).",
      "Enter document ID / roll number to instantly fetch and store authentic electronic documents."
    ],
    whereToApply: "Official DigiLocker web portal or official mobile app.",
    mode: "100% Online & Mobile.",
    fees: "Completely Free (Digital India initiative).",
    processingTime: "Instant (Real-time digital issuance).",
    commonMistakes: [
      "Using a mobile number not linked with Aadhaar",
      "Entering document registration numbers with typos",
      "Uploading manual photos instead of fetching officially issued digital documents"
    ],
    faqs: [
      { question: "Are DigiLocker documents accepted by traffic police?", answer: "Yes, under Rule 9A of the IT Rules and MoRTH advisory, digital Driving Licenses and RCs in DigiLocker are legally equivalent to physical originals." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },

  // ── 02 TAMIL NADU CITIZEN SERVICES ─────────────────────────────────────────
  {
    id: "tn-community-income-nativity",
    sectionNumber: "02",
    sectionTitle: "02 TAMIL NADU CITIZEN SERVICES",
    itemNumber: 1,
    title: "Community, Income and Nativity Certificates",
    summary: "Eligibility, documents, e-Sevai application and tracking.",
    category: "Tamil Nadu Citizen Services",
    officialPortals: ["https://www.tnesevai.tn.gov.in/", "https://edistricts.tn.gov.in/revenue/status.html"],
    officialSource: "https://www.tnesevai.tn.gov.in/",
    whoNeedsIt: "Tamil Nadu residents applying for educational reservations, scholarships, government welfare schemes, college admissions, and employment quotas.",
    eligibility: "Permanent residents of Tamil Nadu; Community certificate based on parental caste records; Income certificate based on annual household income.",
    documents: ["Aadhaar card", "Ration card / Smart card", "Parents' community/income certificate", "Salary slip / VAO enquiry report", "Applicant photograph"],
    steps: [
      "Log in to the TN e-Sevai portal (tnesevai.tn.gov.in) with Citizen login or visit nearest Arasu e-Sevai centre.",
      "Register or provide your 13-digit Citizen Access Number (CAN).",
      "Select required certificate under Revenue Department (Community / Income / Nativity).",
      "Fill applicant and family details, upload scanned documents and applicant photo.",
      "Pay the statutory fee (₹60) online and submit.",
      "Application is reviewed by VAO -> RI -> Zonal Deputy Tahsildar.",
      "Download the digitally signed certificate with QR verification once approved."
    ],
    whereToApply: "TN e-Sevai Portal (online) or Arasu e-Sevai Centre (offline).",
    mode: "Online (e-Sevai citizen portal) and CSC / Arasu e-Sevai centres.",
    fees: "₹60 application processing fee per certificate.",
    processingTime: "7 to 15 working days.",
    commonMistakes: [
      "Incomplete CAN profile details",
      "Missing parent or sibling community transfer certificates",
      "Outdated income proofs or salary certificates"
    ],
    faqs: [
      { question: "What is CAN number in Tamil Nadu?", answer: "CAN (Citizen Access Number) is a unique 13-digit profile identification number mandatory for applying to all e-District services in TN." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },
  {
    id: "tn-legal-heir-cert",
    sectionNumber: "02",
    sectionTitle: "02 TAMIL NADU CITIZEN SERVICES",
    itemNumber: 2,
    title: "Legal Heir Certificate in Tamil Nadu",
    summary: "Eligibility, supporting documents and application process.",
    category: "Tamil Nadu Citizen Services",
    officialPortals: ["https://www.tnesevai.tn.gov.in/", "https://edistricts.tn.gov.in/revenue_lead/status.html"],
    officialSource: "https://www.tnesevai.tn.gov.in/",
    whoNeedsIt: "Surviving family members of a deceased person in Tamil Nadu to claim pensions, insurance, bank accounts, or transfer property ownership.",
    eligibility: "Direct legal heirs of the deceased (spouse, children, parents).",
    documents: ["Death certificate of the deceased", "Aadhaar / ID proof of all legal heirs", "Relationship proof (Ration card / Birth certificates / Marriage certificate)", "Legal heir declaration affidavit"],
    steps: [
      "Obtain original Death Certificate from the local registrar/municipality.",
      "Register CAN number on TN e-Sevai portal.",
      "Select 'Application for Legal Heir Certificate' under Revenue Department.",
      "Enter details of the deceased and all surviving direct legal heirs.",
      "Upload identity proofs, self-declaration affidavit, and pay the ₹60 fee.",
      "Inquiry conducted by Village Administrative Officer (VAO) and Revenue Inspector (RI).",
      "Zonal Deputy Tahsildar issues digital certificate with QR code for verification."
    ],
    whereToApply: "TN e-Sevai Portal or local Arasu e-Sevai Kendra.",
    mode: "Online application with field verification by Revenue department.",
    fees: "₹60 per application.",
    processingTime: "15 to 30 working days.",
    commonMistakes: [
      "Omitting an eligible legal heir (e.g. married daughters or deceased parents)",
      "Missing relationship proofs",
      "Unnotarized self-declarations"
    ],
    faqs: [
      { question: "Are married daughters considered legal heirs?", answer: "Yes, under Hindu Succession Act and Tamil Nadu revenue rules, married daughters have equal rights as legal heirs." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },
  {
    id: "tn-patta-chitta-fmb",
    sectionNumber: "02",
    sectionTitle: "02 TAMIL NADU CITIZEN SERVICES",
    itemNumber: 3,
    title: "Check Patta, Chitta and FMB Online",
    summary: "Access land records, service details and ownership information.",
    category: "Tamil Nadu Citizen Services",
    officialPortals: ["https://eservices.tn.gov.in/", "https://anywhere.tn.gov.in/"],
    officialSource: "https://eservices.tn.gov.in/",
    whoNeedsIt: "Land and property owners, buyers, and legal claimants in Tamil Nadu looking to verify land title, survey number, sub-division, and boundaries.",
    eligibility: "Publicly accessible to any citizen seeking verified land record details in Tamil Nadu.",
    documents: ["District, Taluk, Village name, and Survey Number / Sub-division Number OR Patta Number"],
    steps: [
      "Visit the Tamil Nadu Land Records portal (eservices.tn.gov.in).",
      "Click 'View Patta & FMB / Chitta / TSLR Extract'.",
      "Select District, Area Type (Rural/Urban), Taluk, and Village.",
      "Choose to view by 'Patta Number' or 'Survey / Sub-division Number'.",
      "Enter captcha and click Submit to view and download digitally verified Patta-Chitta copy.",
      "To inspect land shape, select 'View FMB Sketch' and enter survey details."
    ],
    whereToApply: "Anywhere online via TN e-Services Land Portal.",
    mode: "100% Online & Instant.",
    fees: "Free for online viewing and downloading digitally signed copies.",
    processingTime: "Instant (immediate PDF generated).",
    commonMistakes: [
      "Selecting incorrect revenue village",
      "Confusing Patta number with deed registration number",
      "Typing incorrect sub-division code"
    ],
    faqs: [
      { question: "What is FMB sketch in TN?", answer: "Field Measurement Book (FMB) sketch displays the exact geometrical boundary measurements and shape of the land survey unit." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },
  {
    id: "tn-first-graduate-cert",
    sectionNumber: "02",
    sectionTitle: "02 TAMIL NADU CITIZEN SERVICES",
    itemNumber: 4,
    title: "First Graduate Certificate",
    summary: "Eligibility, family education details and supporting documents.",
    category: "Tamil Nadu Citizen Services",
    officialPortals: ["https://www.tnesevai.tn.gov.in/"],
    officialSource: "https://www.tnesevai.tn.gov.in/",
    whoNeedsIt: "Students in Tamil Nadu entering higher education whose siblings or parents have not graduated from a degree college, to claim tuition fee concessions.",
    eligibility: "Student pursuing undergraduate professional/degree course where no other member in the immediate family (parents, siblings) is a graduate.",
    documents: ["Applicant's 10th and 12th marksheets", "Transfer Certificate (TC)", "Parents' and siblings' educational certificates (or TC proving non-graduation)", "Self-declaration affidavit", "Ration card / Smart card", "Aadhaar"],
    steps: [
      "Register on TN e-Sevai portal using student/parent CAN.",
      "Select 'First Graduate Certificate' under Revenue Department.",
      "Fill student, parents', and siblings' educational qualification records.",
      "Upload supporting TCs/non-graduate affidavits signed by parents and candidate.",
      "Pay application fee (₹60) and track application online.",
      "Inspection and sign-off by Revenue Inspector and Deputy Tahsildar.",
      "Download the certificate and submit to counseling authority / collegiate education."
    ],
    whereToApply: "TN e-Sevai Portal or Taluk Office Arasu e-Sevai.",
    mode: "Online application & Revenue Dept verification.",
    fees: "₹60 online processing charge.",
    processingTime: "10 to 15 working days.",
    commonMistakes: [
      "Failure to include sibling education details",
      "Siblings already enrolled in or completed degree courses",
      "Missing school TC of parents"
    ],
    faqs: [
      { question: "Is fee concession available if elder sibling dropped out of degree?", answer: "If the elder sibling did not complete the degree and no degree was awarded, eligibility may be evaluated subject to revenue verification." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },

  // ── 03 BUSINESS & EMPLOYMENT ────────────────────────────────────────────────
  {
    id: "start-small-business-india",
    sectionNumber: "03",
    sectionTitle: "03 BUSINESS & EMPLOYMENT",
    itemNumber: 1,
    title: "Start a Small Business in India",
    summary: "Udyam, GST, FSSAI and other registrations based on business type.",
    category: "Business & Employment",
    officialPortals: ["https://udyamregistration.gov.in/", "https://www.gst.gov.in/", "https://foscos.fssai.gov.in/"],
    officialSource: "https://udyamregistration.gov.in/",
    whoNeedsIt: "Entrepreneurs, sole proprietors, startups, and small business operators seeking formal registration, tax compliance, and government MSME benefits.",
    eligibility: "Any legal business entity operating in India.",
    documents: ["Aadhaar card of entrepreneur", "PAN card (personal or entity)", "Business address proof", "Bank account details", "Partnership deed / Incorporation certificate (if applicable)"],
    steps: [
      "Register Udyam: Visit udyamregistration.gov.in, enter Aadhaar and PAN for free instant MSME certificate.",
      "Register GST: Apply on gst.gov.in if turnover exceeds ₹40L (goods) / ₹20L (services) or conducting interstate sales.",
      "Apply for local trade license and Shop & Establishment Act registration with local municipality.",
      "Open Current Account with a bank using Udyam, GST, and PAN.",
      "Apply for industry-specific licenses (FSSAI for food, Pollution Control for manufacturing)."
    ],
    whereToApply: "Udyam Registration Portal, GST Common Portal, State Single Window Portals.",
    mode: "100% Online.",
    fees: "Udyam: 100% Free. GST: Free government registration. Local trade licenses vary by state.",
    processingTime: "Udyam: Instant to 2 days. GST: 3 to 7 working days.",
    commonMistakes: [
      "Paying private intermediary websites for Udyam (which is free)",
      "Wrong business classification code (NIC Code)",
      "Mismatch between PAN and Aadhaar names"
    ],
    faqs: [
      { question: "Is Udyam registration compulsory for small businesses?", answer: "It is strongly recommended as it unlocks collateral-free bank loans (CGTMSE), priority sector lending, and subsidy schemes." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },
  {
    id: "fssai-small-food-business",
    sectionNumber: "03",
    sectionTitle: "03 BUSINESS & EMPLOYMENT",
    itemNumber: 2,
    title: "FSSAI Registration for Small Food Businesses",
    summary: "Registration vs license, eligibility, documents and application steps.",
    category: "Business & Employment",
    officialPortals: ["https://foscos.fssai.gov.in/"],
    officialSource: "https://foscos.fssai.gov.in/",
    whoNeedsIt: "Any Food Business Operator (FBO) including cloud kitchens, street vendors, home bakers, restaurants, canteens, and food manufacturers.",
    eligibility: "Registration for petty food manufacturers with turnover up to ₹12 Lakh/year; State License for turnover ₹12L to ₹20 Crore; Central License for above ₹20 Crore or import/export.",
    documents: ["Passport photo", "Government ID proof (Aadhaar / Voter ID)", "Proof of business premises (rent agreement / electricity bill)", "Food safety management declaration", "Food category list"],
    steps: [
      "Visit the FoSCoS portal (foscos.fssai.gov.in).",
      "Click 'Apply for New License/Registration'.",
      "Select business location (State/UT) and choose appropriate Kind of Business (KOB).",
      "Fill Form A (Basic Registration) or Form B (License) with food product details.",
      "Upload premises proof and applicant photo, pay applicable fee online.",
      "Receive 14-digit application reference number; monitor inspection or approval.",
      "Download 14-digit FSSAI Registration Certificate with QR code."
    ],
    whereToApply: "Food Safety Compliance System (FoSCoS) portal.",
    mode: "Online via FoSCoS.",
    fees: "Basic Registration: ₹100 per year. State License: ₹2,000 to ₹5,000 per year.",
    processingTime: "Basic Registration: 7 to 15 days. License: 30 to 60 days.",
    commonMistakes: [
      "Applying for basic registration when turnover exceeds ₹12 Lakh",
      "Inadequate kitchen hygiene documentation",
      "Displaying wrong food category codes"
    ],
    faqs: [
      { question: "Can home bakers get FSSAI registration?", answer: "Yes, home-based food businesses can easily obtain Basic FSSAI Registration under Petty Food Business Operator category." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },
  {
    id: "gov-jobs-apply-online",
    sectionNumber: "03",
    sectionTitle: "03 BUSINESS & EMPLOYMENT",
    itemNumber: 3,
    title: "Find Government Jobs and Apply Online",
    summary: "Recruitment notifications, eligibility, applications and exam information.",
    category: "Business & Employment",
    officialPortals: ["https://upsconline.nic.in/", "https://ssc.gov.in/", "https://www.tnpsc.gov.in/", "https://ibps.in/"],
    officialSource: "https://upsconline.nic.in/",
    whoNeedsIt: "Aspirants seeking public sector employment in Central Government, State Government, Banking, Railways, and Defense.",
    eligibility: "Citizenship, age limits, educational qualifications, and category reservation criteria defined in specific recruitment advertisements.",
    documents: ["Educational marksheets (10th, 12th, Degree)", "Category / Community certificate", "Aadhaar / photo ID", "Scanned photo & signature (standard pixel & size specs)"],
    steps: [
      "Register on designated official recruiting commissions (UPSC, SSC One-Time Registration OTR, TNPSC OTR, IBPS).",
      "Create and verify One Time Registration (OTR) profile with personal, educational, and reservation details.",
      "Review active notifications and check cutoff dates, vacancies, and eligibility criteria.",
      "Submit online application for the specific exam, choose preferred test centers, and pay application fee.",
      "Download submitted application PDF and monitor portal for Hall Ticket / Admit Card releases."
    ],
    whereToApply: "Official Commission Portals: upsconline.nic.in, ssc.gov.in, tnpsc.gov.in, ibps.in.",
    mode: "Online registration and exam scheduling.",
    fees: "₹50 to ₹200 for general candidates; often exempted for SC/ST/PWD/Female candidates per commission guidelines.",
    processingTime: "Exam schedules span several months across Prelims, Mains, and Interviews.",
    commonMistakes: [
      "Missing OTR deadlines",
      "Uploading blurry or outdated photos",
      "Filling wrong educational percentage or reservation sub-caste"
    ],
    faqs: [
      { question: "What is OTR in government job exams?", answer: "One Time Registration (OTR) allows candidates to save educational credentials once and reuse them across multiple exams without re-entering data." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },

  // ── 04 DIGITAL SERVICES & CITIZEN AWARENESS ────────────────────────────────
  {
    id: "report-online-financial-fraud",
    sectionNumber: "04",
    sectionTitle: "04 DIGITAL SERVICES & CITIZEN AWARENESS",
    itemNumber: 1,
    title: "Report Online Financial Fraud in India",
    summary: "Immediate reporting, the 1930 helpline and cybercrime complaints.",
    category: "Digital Services & Citizen Awareness",
    officialPortals: ["https://cybercrime.gov.in/"],
    officialSource: "https://cybercrime.gov.in/",
    whoNeedsIt: "Victims of cyber scams, UPI frauds, unauthorized bank transfers, SIM cloning, phishing, or identity theft.",
    eligibility: "Any person residing in India or affected by cybercrime offenses.",
    documents: ["Bank account statements", "Transaction IDs / UTR numbers", "SMS alerts", "Scammer phone numbers/links", "Screenshots of chat and payment receipts"],
    steps: [
      "ACT IMMEDIATELY: Dial toll-free cyber fraud helpline 1930 (within Golden Hour - first 2 hours).",
      "Provide your name, mobile number, bank account details, and transaction reference IDs to freeze funds in transit.",
      "Visit the National Cyber Crime Reporting Portal (cybercrime.gov.in).",
      "Click 'Report Financial Fraud' or 'Report Other Cyber Crimes'.",
      "File formal e-complaint with detailed timeline, evidence screenshots, and suspect account details.",
      "Receive acknowledgement number for police investigation and bank follow-up."
    ],
    whereToApply: "National Cyber Crime Portal (cybercrime.gov.in) and Toll-Free Helpline 1930.",
    mode: "Online & Immediate Phone Helpline (24x7).",
    fees: "100% Free.",
    processingTime: "Immediate ticket generation; account lien placed through Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS).",
    commonMistakes: [
      "Delaying reporting beyond initial hours",
      "Not saving transaction reference numbers",
      "Deleting scammer chat or SMS logs"
    ],
    faqs: [
      { question: "What is the 1930 helpline?", answer: "1930 is the national cyber financial helpline run by the Indian Cyber Crime Coordination Centre (I4C) under the Ministry of Home Affairs to freeze defrauded amounts in real time." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },
  {
    id: "umang-gov-services",
    sectionNumber: "04",
    sectionTitle: "04 DIGITAL SERVICES & CITIZEN AWARENESS",
    itemNumber: 2,
    title: "UMANG: Access Government Services",
    summary: "Registration, service discovery and using services through UMANG.",
    category: "Digital Services & Citizen Awareness",
    officialPortals: ["https://web.umang.gov.in/"],
    officialSource: "https://web.umang.gov.in/",
    whoNeedsIt: "Citizens who want a unified single-window platform on mobile or web to access Central and State government services (EPFO, PAN, Gas booking, NPS, Ayushman, utility bills).",
    eligibility: "All Indian citizens with an active mobile number.",
    documents: ["Mobile number for OTP verification", "Aadhaar (optional for advanced linked services)"],
    steps: [
      "Visit web.umang.gov.in or install the UMANG mobile app.",
      "Register using mobile number and set an MPIN.",
      "Link Aadhaar (optional) for automatic profile discovery and service pre-filling.",
      "Search services by department (e.g. EPFO passbook, Jeevan Pramaan, PM-KISAN, Electricity).",
      "Access and complete services seamlessly from a single dashboard."
    ],
    whereToApply: "UMANG Web Portal and Mobile App.",
    mode: "Online (Web and Mobile App in 13+ Indian languages).",
    fees: "Free government platform.",
    processingTime: "Instant access to integrated departmental APIs.",
    commonMistakes: [
      "Forgetting MPIN",
      "Not updating profile mobile number when changing SIM"
    ],
    faqs: [
      { question: "Can I check my EPF balance on UMANG?", answer: "Yes, UMANG offers direct integration with EPFO to view passbooks, raise claims, and track claim status." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },
  {
    id: "aadhaar-app-digital-identity",
    sectionNumber: "04",
    sectionTitle: "04 DIGITAL SERVICES & CITIZEN AWARENESS",
    itemNumber: 3,
    title: "Aadhaar App and Digital Identity Services",
    summary: "Digital Aadhaar services, verification and identity security.",
    category: "Digital Services & Citizen Awareness",
    officialPortals: ["https://uidai.gov.in/"],
    officialSource: "https://uidai.gov.in/",
    whoNeedsIt: "Aadhaar holders wanting to lock/unlock biometrics, generate Virtual ID (VID), download e-Aadhaar, and verify identity securely.",
    eligibility: "All enrolled Aadhaar holders with linked mobile phone.",
    documents: ["12-digit Aadhaar number or 16-digit Virtual ID"],
    steps: [
      "Install the official mAadhaar App from Google Play Store or Apple App Store.",
      "Create a profile using Aadhaar number and OTP received on registered mobile.",
      "Enable 'Biometric Lock' feature to prevent unauthorized fingerprint or iris authentication.",
      "Generate a 16-digit Virtual ID (VID) to share in lieu of your actual Aadhaar number.",
      "Use QR-code based offline verification for secure sharing with service providers."
    ],
    whereToApply: "Official mAadhaar App and UIDAI Portal (uidai.gov.in).",
    mode: "Mobile app & web.",
    fees: "Free.",
    processingTime: "Real-time security controls.",
    commonMistakes: [
      "Leaving biometrics permanently unlocked in high-risk environments",
      "Sharing physical photocopies without masking the first 8 digits (Masked Aadhaar)"
    ],
    faqs: [
      { question: "What is Masked Aadhaar?", answer: "Masked Aadhaar hides the first 8 digits of your Aadhaar number (showing only XXXX-XXXX-1234), protecting personal identity while remaining legally valid." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },

  // ── 05 GOVERNMENT UPDATES & SCHEMES ────────────────────────────────────────
  {
    id: "tn-integrated-land-records-2026",
    sectionNumber: "05",
    sectionTitle: "05 GOVERNMENT UPDATES & SCHEMES",
    itemNumber: 1,
    title: "Tamil Nadu Integrated Land Record Services (2026)",
    summary: "Integrated land services and Patta Transfer History services.",
    category: "Government Updates & Schemes",
    officialPortals: ["https://eservices.tn.gov.in/", "https://edistricts.tn.gov.in/"],
    officialSource: "https://eservices.tn.gov.in/",
    whoNeedsIt: "Property buyers, sellers, and landowners in Tamil Nadu needing end-to-end digital transfer of Patta, verification of title chain, and mutation tracking.",
    eligibility: "Registered title holders, buyers with registered sale deeds in Tamil Nadu.",
    documents: ["Registered Sale Deed / Title Deed", "Encumbrance Certificate (EC)", "Previous Patta number", "Survey Number and Sub-division", "Aadhaar proof"],
    steps: [
      "Complete property sale deed registration at the Sub-Registrar Office (SRO).",
      "Modern SRO portals automatically trigger automatic e-Patta transfer requests for simple, non-subdivision transfers.",
      "For cases requiring sub-division: Apply on TN e-Services for Sub-division Patta Transfer.",
      "Pay statutory measurement and mutation fee online.",
      "Track Patta transfer lifecycle: Surveyor -> VAO -> RI -> Tahsildar approval.",
      "Verify new updated Patta online with QR code authentication."
    ],
    whereToApply: "TN e-Services Land Portal & Registration Department.",
    mode: "Integrated Online Portal.",
    fees: "Online transfer fee: ₹60; Sub-division fee: varies by rural/urban survey norms (₹400-₹800).",
    processingTime: "Non-subdivision transfer: 7-15 days; With subdivision: 30 days.",
    commonMistakes: [
      "Not verifying previous Patta ownership transfer history",
      "Mismatch between deed survey number and revenue village sketch"
    ],
    faqs: [
      { question: "Is Patta automatically transferred upon sale registration in TN?", answer: "In full-field (non-subdivision) transfers, automated mutation is initiated via Sub-Registrar Office to Revenue Department data integration." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },
  {
    id: "gov-schemes-citizen-guide",
    sectionNumber: "05",
    sectionTitle: "05 GOVERNMENT UPDATES & SCHEMES",
    itemNumber: 2,
    title: "Government Schemes Every Citizen Should Know",
    summary: "Schemes for students, farmers, women, senior citizens and entrepreneurs.",
    category: "Government Updates & Schemes",
    officialPortals: ["https://www.myscheme.gov.in/", "https://schemes.gov.in/"],
    officialSource: "https://www.myscheme.gov.in/",
    whoNeedsIt: "Citizens seeking central and state welfare benefits across education, agriculture, healthcare, housing, and social security.",
    eligibility: "Criteria based on citizenship, age, gender, annual household income, caste category, and rural/urban classification.",
    documents: ["Aadhaar", "Bank Account (Aadhaar-seeded for DBT)", "Income Certificate", "Community Certificate", "Ration Card"],
    steps: [
      "Visit the central government discovery platform: myScheme (myscheme.gov.in).",
      "Answer 5 simple demographic questions: Gender, Age, State/UT, Residence (Rural/Urban), and Social Category.",
      "System automatically filters and displays all central and state schemes you are eligible for.",
      "Click on specific schemes (e.g. PM-KISAN, Ayushman Bharat, PM Awas Yojana, Sukanya Samriddhi, PMEGP).",
      "Review clear application steps, required documents, and click direct official application link."
    ],
    whereToApply: "myScheme platform (myscheme.gov.in) & direct scheme implementing department portals.",
    mode: "Online discovery and single-window links.",
    fees: "Free discovery platform.",
    processingTime: "Immediate eligibility discovery.",
    commonMistakes: [
      "Applying through fraudulent third-party portals charging search fees",
      "Unlinked bank accounts preventing Direct Benefit Transfer (DBT)"
    ],
    faqs: [
      { question: "What is myScheme?", answer: "myScheme is a National Platform developed by NeGD and MeitY to find government scheme eligibility based on citizen profile attributes." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },
  {
    id: "gov-announcements-policies",
    sectionNumber: "05",
    sectionTitle: "05 GOVERNMENT UPDATES & SCHEMES",
    itemNumber: 3,
    title: "Government Announcements and New Policies",
    summary: "New schemes, government decisions, citizen benefits and policy news.",
    category: "Government Updates & Schemes",
    officialPortals: ["https://pib.gov.in/", "https://www.india.gov.in/"],
    officialSource: "https://pib.gov.in/",
    whoNeedsIt: "Citizens, students, professionals, and business owners looking for verified, authentic government notifications, Gazette releases, and policy updates.",
    eligibility: "Open and freely accessible to all citizens.",
    documents: ["No documents required to view announcements"],
    steps: [
      "Visit the Press Information Bureau (PIB) portal (pib.gov.in) or National Portal of India (india.gov.in).",
      "Filter by Ministry (e.g., Finance, Education, Health, Agriculture, MSME).",
      "Check PIB Fact Check to verify the authenticity of viral social media claims regarding government schemes or money grants.",
      "Access official Gazette notifications and Cabinet press releases directly from the source."
    ],
    whereToApply: "PIB Portal (pib.gov.in), India.gov.in, and Official Gazette (egazette.gov.in).",
    mode: "100% Online public information access.",
    fees: "Free.",
    processingTime: "Updated daily in real time.",
    commonMistakes: [
      "Relying on unverified social media forwards or YouTube thumbnails without checking PIB Fact Check or the official ministry website"
    ],
    faqs: [
      { question: "How can I verify if a viral government scheme announcement is true?", answer: "Check PIB Fact Check (@PIBFactCheck on Twitter / pib.gov.in/factcheck) to confirm official status before sharing personal info." }
    ],
    lastVerified: "2026-11-17",
    verified: true
  },

  // Legacy article for backward compatibility
  {
    id: "birth-certificate",
    sectionNumber: "02",
    sectionTitle: "02 TAMIL NADU CITIZEN SERVICES",
    itemNumber: 5,
    title: "Birth Certificate: Registration and Copy",
    summary: "A birth certificate is issued after a birth is registered with the competent local authority.",
    category: "Certificates",
    officialPortals: ["https://crsorgi.gov.in/"],
    officialSource: "https://crsorgi.gov.in/",
    whoNeedsIt: "Parents or guardians registering a child's birth, and people seeking an official birth record.",
    eligibility: "The process and time limits are governed by the relevant local registration authority.",
    documents: ["Hospital birth record where available", "Parents' identity proof", "Address proof"],
    steps: [
      "Contact the local registration authority.",
      "Submit the birth report and supporting documents.",
      "Pay any applicable fee.",
      "Collect or download the certificate when issued."
    ],
    whereToApply: "Local Registrar of Births and Deaths, municipality, panchayat, or approved state portal.",
    mode: "Online availability varies by local authority",
    fees: "Varies by state, municipality, and timing of registration.",
    processingTime: "Varies by registration authority and record completeness.",
    commonMistakes: [
      "Waiting past applicable reporting timelines",
      "Misspelling names or dates in the registration"
    ],
    faqs: [
      { question: "Is a birth certificate always automatic?", answer: "Registration procedures differ by locality; confirm with the competent local authority." }
    ],
    lastVerified: "2026-09-04",
    verified: true,
    service: birthRegistration,
  },
];
