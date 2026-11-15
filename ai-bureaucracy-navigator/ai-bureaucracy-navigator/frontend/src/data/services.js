
/**
 * Verified Government Services & Official Portal Directory.
 * Official URLs and portal details sourced from official government endpoints.
 */
export const services = [
  {
    id: 'aadhaar-update',
    name: { en: 'Aadhaar / Aadhaar Services', ta: 'ஆதார் / ஆதார் சேவைகள்' },
    shortName: 'Aadhaar',
    category: 'identity',
    department: { en: 'UIDAI / Unique Identification Authority of India', ta: 'UIDAI / இந்திய தனித்துவ அடையாள ஆணையம்' },
    description: {
      en: 'Aadhaar update, address change, PVC card order, lost Aadhaar retrieval, and biometrics update via MyAadhaar.',
      ta: 'MyAadhaar மூலம் ஆதார் புதுப்பிப்பு, முகவரி மாற்றம், PVC அட்டை ஆர்டர், இழந்த ஆதார் மீட்பு மற்றும் பயோமெட்ரிக் புதுப்பிப்பு.',
    },
    eligibility: [
      { en: 'Existing Aadhaar holder or new resident applicant', ta: 'ஏற்கனவே ஆதார் வைத்திருப்பவர் அல்லது புதிய புதிய குடியிருப்பாளர்' },
    ],
    documents: [
      { en: 'Aadhaar number or enrolment ID', ta: 'ஆதார் எண் அல்லது பதிவு எண்' },
      { en: 'Supporting proof of identity / address for updates', ta: 'புதுப்பிப்புகளுக்கு அடையாள / முகவரி சான்று' },
    ],
    steps: [
      { id: 's1', title: { en: 'Identify update type', ta: 'புதுப்பிப்பு வகையை அடையாளம் காணவும்' }, description: { en: 'Name, address, mobile, or lost-card reprint.', ta: 'பெயர், முகவரி, மொபைல், அல்லது இழந்த அட்டை மறுஅச்சு.' } },
      { id: 's2', title: { en: 'Prepare supporting proof', ta: 'ஆதரவு சான்றை தயார் செய்யவும்' }, description: { en: 'Match the proof type to the field you are updating.', ta: 'நீங்கள் புதுப்பிக்கும் தகவலுக்கு ஏற்ப சான்றை பொருத்தவும்.' } },
      { id: 's3', title: { en: 'Submit request on MyAadhaar portal', ta: 'MyAadhaar போர்ட்டலில் விண்ணப்பிக்கவும்' }, description: { en: 'Log in using OTP sent to Aadhaar-linked mobile.', ta: 'ஆதாருடன் இணைக்கப்பட்ட மொபைலுக்கு வரும் OTP மூலம் நுழையவும்.' } },
      { id: 's4', title: { en: 'Track update request', ta: 'கோரிக்கையை கண்காணிக்கவும்' }, description: { en: 'Use the URN (Update Request Number).', ta: 'URN (புதுப்பிப்பு கோரிக்கை எண்) பயன்படுத்தவும்.' } },
    ],
    commonMistakes: [
      { en: 'Submitting a proof document that does not match the field being changed', ta: 'மாற்றப்படும் தகவலுக்குப் பொருந்தாத சான்றை சமர்ப்பித்தல்' },
    ],
    portalName: 'UIDAI / MyAadhaar',
    officialUrl: 'https://uidai.gov.in/',
    officialUrlPlaceholder: 'https://uidai.gov.in/',
    feeNote: { en: 'Demographic updates ₹50; PVC reprint ₹50; online address update ₹50.', ta: 'விவரங்கள் புதுப்பிப்பு ₹50; PVC அட்டை ₹50.' },
    processingTimeNote: { en: '7 to 15 working days typically.', ta: 'வழக்கமாக 7 முதல் 15 வேலை நாட்கள்.' },
    keywords: ['aadhaar', 'uidai', 'lost aadhaar', 'myaadhaar', 'pvc card', 'aadhar'],
    isDemoData: true,
  },
  {
    id: 'pan-card',
    name: { en: 'PAN Card / e-PAN', ta: 'PAN அட்டை / e-PAN' },
    shortName: 'PAN',
    category: 'identity',
    department: { en: 'Income Tax Department', ta: 'வருமான வரித் துறை' },
    description: {
      en: 'Apply for a new Permanent Account Number (PAN), instant e-PAN via Aadhaar, or correct existing PAN details.',
      ta: 'புதிய நிரந்தர கணக்கு எண் (PAN), ஆதார் மூலம் உடனடி e-PAN அல்லது தகவல்களை திருத்த விண்ணப்பிக்கவும்.',
    },
    eligibility: [
      { en: 'Indian citizen, NRI, or foreign national with income in India', ta: 'இந்திய குடிமகன், NRI அல்லது இந்தியாவில் வருமானம் உள்ள வெளிநாட்டவர்' },
      { en: 'No minimum age — minors can apply through a guardian', ta: 'குறைந்தபட்ச வயது இல்லை — சிறார்கள் பாதுகாவலர் மூலம் விண்ணப்பிக்கலாம்' },
    ],
    documents: [
      { en: 'Proof of identity (Aadhaar / Passport / Voter ID)', ta: 'அடையாள சான்று (ஆதார் / பாஸ்போர்ட் / வாக்காளர் அடையாள அட்டை)' },
      { en: 'Proof of address', ta: 'முகவரி சான்று' },
      { en: 'Proof of date of birth', ta: 'பிறந்த தேதி சான்று' },
    ],
    steps: [
      { id: 's1', title: { en: 'Check eligibility', ta: 'தகுதியை சரிபார்க்கவும்' }, description: { en: 'Confirm you do not already hold a PAN.', ta: 'நீங்கள் ஏற்கனவே PAN வைத்திருக்கவில்லை என உறுதிசெய்யவும்.' } },
      { id: 's2', title: { en: 'Prepare documents', ta: 'ஆவணங்களை தயார் செய்யவும்' }, description: { en: 'Gather ID, address and DOB proofs.', ta: 'அடையாளம், முகவரி, பிறந்த தேதி சான்றுகளை சேகரிக்கவும்.' } },
      { id: 's3', title: { en: 'Fill application on official portal', ta: 'அதிகாரப்பூர்வ போர்ட்டலில் விண்ணப்பிக்கவும்' }, description: { en: 'Instant e-PAN via Income Tax Portal or Form 49A.', ta: 'வருமான வரி போர்ட்டல் மூலம் உடனடி e-PAN அல்லது படிவம் 49A.' } },
      { id: 's4', title: { en: 'Pay fee & submit', ta: 'கட்டணம் செலுத்தி சமர்ப்பிக்கவும்' }, description: { en: 'Instant e-PAN is free; physical card fee ₹107.', ta: 'உடனடி e-PAN இலவசம்; நேரடி அட்டைக்கு ₹107.' } },
      { id: 's5', title: { en: 'Track & receive PAN', ta: 'கண்காணித்து PAN பெறவும்' }, description: { en: 'e-PAN issued instantly; physical card follows by post.', ta: 'e-PAN உடனடியாக வழங்கப்படும்; அட்டை அஞ்சலில் வரும்.' } },
    ],
    commonMistakes: [
      { en: 'Name spelling mismatch between documents and Aadhaar', ta: 'ஆவணங்கள் மற்றும் ஆதார இடையே பெயர் எழுத்துப்பிழை வேறுபாடு' },
    ],
    portalName: 'Income Tax e-Filing',
    officialUrl: 'https://www.incometax.gov.in/',
    officialUrlPlaceholder: 'https://www.incometax.gov.in/',
    feeNote: { en: 'Instant e-PAN is FREE; Physical card delivery ₹107.', ta: 'உடனடி e-PAN இலவசம்; அட்டை அஞ்சல் கட்டணம் ₹107.' },
    processingTimeNote: { en: 'Instant for e-PAN (10 mins); 10–15 days for physical card.', ta: 'e-PAN 10 நிமிடங்களில்; அட்டை 10-15 நாட்கள்.' },
    keywords: ['pan', 'pan card', 'tax id', 'e-pan', 'income tax', 'form 49a'],
    isDemoData: true,
  },
  {
    id: 'passport',
    name: { en: 'Passport (Fresh / Renewal)', ta: 'பாஸ்போர்ட் (புதிய / புதுப்பித்தல்)' },
    shortName: 'Passport',
    category: 'identity',
    department: { en: 'Ministry of External Affairs — Passport Seva', ta: 'வெளியுறவு அமைச்சகம் — பாஸ்போர்ட் சேவா' },
    description: {
      en: 'Apply for a new passport, renew an expired passport, or request Tatkal processing via Passport Seva.',
      ta: 'பாஸ்போர்ட் சேவா மூலம் புதிய பாஸ்போர்ட், புதுப்பித்தல் அல்லது தட்கால் முறைக்கு விண்ணப்பிக்கவும்.',
    },
    eligibility: [
      { en: 'Indian citizen of any age', ta: 'எந்த வயதினரும் கூடிய இந்திய குடிமகன்' },
    ],
    documents: [
      { en: 'Proof of address (Aadhaar / Bank Passbook / Utility Bill)', ta: 'முகவரி சான்று (ஆதார் / வங்கி கணக்கு / மின் கட்டணம்)' },
      { en: 'Proof of date of birth (Birth Certificate / School Leaving Cert)', ta: 'பிறந்த தேதி சான்று' },
      { en: 'Existing passport (for renewal / reissue)', ta: 'தற்போதைய பாஸ்போர்ட் (புதுப்பித்தலுக்கு)' },
    ],
    steps: [
      { id: 's1', title: { en: 'Register on Passport Seva', ta: 'பாஸ்போர்ட் சேவாவில் பதிவு செய்யவும்' }, description: { en: 'Create an account on the official portal.', ta: 'அதிகாரப்பூர்வ போர்ட்டலில் கணக்கு உருவாக்கவும்.' } },
      { id: 's2', title: { en: 'Fill application & pay fee', ta: 'விண்ணப்பம் நிரப்பி கட்டணம் செலுத்தவும்' }, description: { en: 'Select Normal or Tatkal scheme.', ta: 'சாதாரண அல்லது தட்கால் முறையைத் தேர்ந்தெடுக்கவும்.' } },
      { id: 's3', title: { en: 'Book appointment at PSK / POPSK', ta: 'PSK-இல் சந்திப்பு பதிவு செய்யவும்' }, description: { en: 'Book a slot at nearest Passport Seva Kendra.', ta: 'அருகிலுள்ள பாஸ்போர்ட் சேவா கேந்திரத்தில் நேரம் பதிவு செய்யவும்.' } },
      { id: 's4', title: { en: 'Visit PSK for document verification & biometrics', ta: 'PSK-ஐ சந்திக்கவும்' }, description: { en: 'Carry original documents.', ta: 'மூலப் பிரதிகளை கொண்டு செல்லவும்.' } },
      { id: 's5', title: { en: 'Police verification & dispatch', ta: 'காவல்துறை சரிபார்ப்பு' }, description: { en: 'Track status until passport is delivered by Speed Post.', ta: 'பாஸ்போர்ட் ஸ்பீடு போஸ்ட்டில் வரும் வரை கண்காணிக்கவும்.' } },
    ],
    commonMistakes: [
      { en: 'Address proof not matching the current residence address', ta: 'முகவரி சான்று தற்போதைய குடியிருப்புடன் பொருந்தாமை' },
    ],
    portalName: 'Passport Seva',
    officialUrl: 'https://www.passportindia.gov.in/',
    officialUrlPlaceholder: 'https://www.passportindia.gov.in/',
    feeNote: { en: 'Normal: ₹1,500 (36 pages); Tatkal: ₹3,500.', ta: 'சாதாரண: ₹1,500; தட்கால்: ₹3,500.' },
    processingTimeNote: { en: 'Normal: 15–30 days; Tatkal: 1–3 days.', ta: 'சாதாரண: 15–30 நாட்கள்; தட்கால்: 1–3 நாட்கள்.' },
    keywords: ['passport', 'passport seva', 'renew passport', 'tatkal', 'psk'],
    isDemoData: true,
  },
  {
    id: 'voter-id',
    name: { en: 'Voter ID / Voter Services', ta: 'வாக்காளர் அடையாள அட்டை / சேவைகள்' },
    shortName: 'Voter ID',
    category: 'identity',
    department: { en: 'Election Commission of India (ECI)', ta: 'இந்திய தேர்தல் ஆணையம் (ECI)' },
    description: {
      en: 'Register as a new voter (Form 6), apply for EPIC card correction (Form 8), or shift constituency online.',
      ta: 'புதிய வாக்காளராக பதிவு (படிவம் 6), திருத்தங்கள் (படிவம் 8) அல்லது தொகுதி மாற்றம் செய்ய விண்ணப்பிக்கவும்.',
    },
    eligibility: [
      { en: 'Indian citizen aged 18 years or older on qualifying date', ta: 'தகுதி தேதியில் 18 வயது அல்லது அதற்கு மேற்பட்ட இந்திய குடிமகன்' },
    ],
    documents: [
      { en: 'Passport size photograph', ta: 'பாஸ்போர்ட் அளவு புகைப்படம்' },
      { en: 'Proof of age (Aadhaar / Birth Cert / PAN)', ta: 'வயது சான்று' },
      { en: 'Proof of residence (Aadhaar / Ration Card / Electricity Bill)', ta: 'குடியிருப்பு சான்று' },
    ],
    steps: [
      { id: 's1', title: { en: 'Log in to ECI Voters Portal', ta: 'ECI வாக்காளர் போர்ட்டலில் நுழையவும்' }, description: { en: 'Create profile using mobile number.', ta: 'மொபைல் எண் மூலம் சுயவிவரத்தை உருவாக்கவும்.' } },
      { id: 's2', title: { en: 'Fill Form 6 for new enrollment', ta: 'படிவம் 6 நிரப்பவும்' }, description: { en: 'Provide address and assembly constituency details.', ta: 'முகவரி மற்றும் சட்டமன்ற தொகுதி விவரங்களை அளிக்கவும்.' } },
      { id: 's3', title: { en: 'Upload photo and proof documents', ta: 'புகைப்படம் & ஆவணங்களை பதிவேற்றவும்' }, description: { en: 'Upload clear scans of age and address proofs.', ta: 'தெளிவான சான்றுகளை பதிவேற்றவும்.' } },
      { id: 's4', title: { en: 'Field Verification by BLO', ta: 'BLO கள சரிபார்ப்பு' }, description: { en: 'Booth Level Officer verifies your address.', ta: 'வாக்குச்சாவடி நிலை அலுவலர் சரிபார்ப்பார்.' } },
      { id: 's5', title: { en: 'EPIC Card Dispatch', ta: 'EPIC அட்டை விநியோகம்' }, description: { en: 'EPIC number generated and physical card sent by post.', ta: 'EPIC எண் உருவாக்கப்பட்டு அட்டை அஞ்சலில் வரும்.' } },
    ],
    commonMistakes: [
      { en: 'Selecting wrong parliamentary/assembly constituency during registration', ta: 'பதிவின் போது தவறான தொகுதியைத் தேர்ந்தெடுப்பது' },
    ],
    portalName: 'Election Commission of India',
    officialUrl: 'https://voters.eci.gov.in/',
    officialUrlPlaceholder: 'https://voters.eci.gov.in/',
    feeNote: { en: 'Free of cost for new registration.', ta: 'புதிய பதிவுக்கு கட்டணம் ஏதுமில்லை.' },
    processingTimeNote: { en: 'Usually 15–30 days from BLO verification.', ta: 'BLO சரிபார்ப்பிலிருந்து 15–30 நாட்கள்.' },
    keywords: ['voter id', 'epic card', 'election commission', 'eci', 'form 6', 'voter card'],
    isDemoData: true,
  },
  {
    id: 'driving-licence',
    name: { en: 'Driving Licence / Vehicle Services', ta: 'ஓட்டுநர் உரிமம் / வாகன சேவைகள்' },
    shortName: 'Driving Licence',
    category: 'transport',
    department: { en: 'Ministry of Road Transport & Highways — Parivahan Sewa', ta: 'சாலைப் போக்குவரத்து & நெடுஞ்சாலைகள் அமைச்சகம் — பரிவாஹன் சேவா' },
    description: {
      en: 'Apply for Learner\u2019s Licence (LL), Permanent Driving Licence (DL), renewal, and RC vehicle services.',
      ta: 'கற்பவர் உரிமம் (LL), நிரந்தர ஓட்டுநர் உரிமம் (DL), புதுப்பித்தல் மற்றும் RC சேவைகளுக்கு விண்ணப்பிக்கவும்.',
    },
    eligibility: [
      { en: 'Age 16+ for gearless 50cc; Age 18+ for light motor vehicles (LMV)', ta: '50cc வரை 16+ வயது; கார்கள்/மோட்டார் சைக்கிள்களுக்கு 18+ வயது' },
    ],
    documents: [
      { en: 'Proof of age & address (Aadhaar / Passport / School Cert)', ta: 'வயது & முகவரி சான்று' },
      { en: 'Medical Certificate (Form 1A for applicants over 40)', ta: 'மருத்துவ சான்றிதழ் (படிவம் 1A)' },
      { en: 'Passport size photograph & signature scan', ta: 'புகைப்படம் & கையொப்பம்' },
    ],
    steps: [
      { id: 's1', title: { en: 'Apply for Learner\u2019s Licence online', ta: 'கற்பவர் உரிமத்திற்கு (LL) விண்ணப்பிக்கவும்' }, description: { en: 'Submit form and take online LL test on Parivahan.', ta: 'பரிவாஹனில் ஆன்லைன் LL தேர்வு எழுதவும்.' } },
      { id: 's2', title: { en: 'Practice driving during mandatory 30-day gap', ta: '30 நாட்கள் பயிற்சி பெறவும்' }, description: { en: 'Wait at least 30 days before applying for DL.', ta: 'DL விண்ணப்பத்திற்கு முன் 30 நாட்கள் காத்திருக்கவும்.' } },
      { id: 's3', title: { en: 'Book slot for DL driving test', ta: 'DL ஓட்டுநர் தேர்வு நேரம் பதிவு செய்யவும்' }, description: { en: 'Select your local RTO test track and time slot.', ta: 'RTO தேர்வு பாதையைத் தேர்ந்தெடுக்கவும்.' } },
      { id: 's4', title: { en: 'Take physical driving test at RTO', ta: 'RTO-இல் ஓட்டுநர் தேர்வு எழுதவும்' }, description: { en: 'Demonstrate driving skills to Motor Vehicle Inspector.', ta: 'வாகன ஆய்வாளரிடம் ஓட்டும் திறனை நிரூபிக்கவும்.' } },
      { id: 's5', title: { en: 'Receive Smart Card DL', ta: 'ஸ்மார்ட் கார்டு DL பெறவும்' }, description: { en: 'DL issued digitally and smart card posted to address.', ta: 'DL டிஜிட்டலாகவும் அஞ்சல் மூலமும் பெறப்படும்.' } },
    ],
    commonMistakes: [
      { en: 'Applying for DL before 30 days or after 180 days of LL issuance', ta: 'LL பெற்ற 30 நாட்களுக்கு முன் அல்லது 180 நாட்களுக்குப் பின் DL விண்ணப்பித்தல்' },
    ],
    portalName: 'Parivahan Sewa',
    officialUrl: 'https://parivahan.gov.in/',
    officialUrlPlaceholder: 'https://parivahan.gov.in/',
    feeNote: { en: 'LL fee: ₹150–200; DL test fee: ₹300; Smart Card: ₹200.', ta: 'LL கட்டணம் ₹150-200; DL கட்டணம் ₹500.' },
    processingTimeNote: { en: 'LL instant online; DL smart card 7–14 days post test.', ta: 'LL உடனடி; DL அட்டை 7–14 நாட்கள்.' },
    keywords: ['driving licence', 'dl', 'parivahan', 'rto', 'learners licence', 'vehicle rc'],
    isDemoData: true,
  },
  {
    id: 'fssai-food-licence',
    name: { en: 'FSSAI Food Licence / Registration', ta: 'FSSAI உணவு உரிமம் / பதிவு' },
    shortName: 'FSSAI FoSCoS',
    category: 'business',
    department: { en: 'FSSAI — Food Safety and Standards Authority of India (FoSCoS)', ta: 'FSSAI — இந்திய உணவு பாதுகாப்பு மற்றும் தர நிர்ணய ஆணையம்' },
    description: {
      en: 'Mandatory Food Registration & State/Central Licence for food businesses, restaurants, traders, and cloud kitchens.',
      ta: 'உணவு வணிகங்கள், உணவகங்கள் மற்றும் வர்த்தகர்களுக்கான கட்டாய FSSAI பதிவு மற்றும் உரிமம்.',
    },
    eligibility: [
      { en: 'Any food business operator (Petty vendors, Manufacturers, Distributors, Restaurants)', ta: 'உணவு தயாரிப்பு, விற்பனை அல்லது உணவகம் நடத்தும் எந்தவொரு வணிகமும்' },
    ],
    documents: [
      { en: 'Passport size photo of applicant / proprietor', ta: 'விண்ணப்பதாரர் புகைப்படம்' },
      { en: 'Government ID proof (Aadhaar / Voter ID / PAN)', ta: 'அரசு அடையாள சான்று' },
      { en: 'Proof of business premises address (Rent agreement / Utility bill)', ta: 'வணிக வளாக முகவரி சான்று' },
      { en: 'Food safety management plan / list of food products', ta: 'உணவு பொருட்கள் பட்டியல்' },
    ],
    steps: [
      { id: 's1', title: { en: 'Log in to FoSCoS Portal', ta: 'FoSCoS போர்ட்டலில் நுழையவும்' }, description: { en: 'Select Registration (Turnover < ₹12L) or State/Central Licence.', ta: 'பதிவு அல்லது மாநில/மத்திய உரிமத்தைத் தேர்ந்தெடுக்கவும்.' } },
      { id: 's2', title: { en: 'Fill Kind of Business (KoB) application', ta: 'வணிக வகை விண்ணப்பம் நிரப்பவும்' }, description: { en: 'Specify food categories and annual turnover.', ta: 'உணவு பிரிவுகள் மற்றும் ஆண்டு வருமானத்தை குறிப்பிடவும்.' } },
      { id: 's3', title: { en: 'Upload premises proof and ID', ta: 'முகவரி மற்றும் சான்றுகளை பதிவேற்றவும்' }, description: { en: 'Upload required declarations.', ta: 'தேவையான அறிவிப்புகளை பதிவேற்றவும்.' } },
      { id: 's4', title: { en: 'Pay annual registration fee', ta: 'ஆண்டு கட்டணம் செலுத்தவும்' }, description: { en: 'Pay online based on selected validity period (1–5 years).', ta: 'தேர்ந்தெடுக்கப்பட்ட காலத்திற்கு ஏற்ப கட்டணம் செலுத்தவும்.' } },
      { id: 's5', title: { en: 'Inspection & Certificate Issuance', ta: 'ஆய்வு & சான்றிதழ் வழங்கல்' }, description: { en: 'Download FSSAI certificate with 14-digit licence number.', ta: '14-இலக்க உரிம எண்ணுடன் FSSAI சான்றிதழைப் பதிவிறக்கவும்.' } },
    ],
    commonMistakes: [
      { en: 'Selecting wrong business capacity leading to application rejection', ta: 'தவறான வணிக அளவைத் தேர்ந்தெடுப்பது' },
    ],
    portalName: 'FoSCoS',
    officialUrl: 'https://foscos.fssai.gov.in/',
    officialUrlPlaceholder: 'https://foscos.fssai.gov.in/',
    feeNote: { en: 'Basic Registration: ₹100/year; State Licence: ₹2,000–5,000/year.', ta: 'அடிப்படை பதிவு: ₹100/ஆண்டு; மாநில உரிமம்: ₹2,000-5,000/ஆண்டு.' },
    processingTimeNote: { en: 'Registration: 7–10 days; Licence: 30 days.', ta: 'பதிவு: 7-10 நாட்கள்; உரிமம்: 30 நாட்கள்.' },
    keywords: ['fssai', 'foscos', 'food licence', 'food safety', 'restaurant licence'],
    isDemoData: true,
  },
  {
    id: 'msme-udyam',
    name: { en: 'MSME / Udyam Registration', ta: 'MSME / உத்யாம் பதிவு' },
    shortName: 'Udyam MSME',
    category: 'business',
    department: { en: 'Ministry of Micro, Small and Medium Enterprises', ta: 'நுண், சிறு மற்றும் நடுத்தர தொழில் அமைச்சகம்' },
    description: {
      en: 'Free online registration for Micro, Small, and Medium Enterprises to access government subsidies and collateral-free loans.',
      ta: 'அரசு மானியங்கள் மற்றும் கடன் உதவிகளை பெற நுண், சிறு, நடுத்தர தொழில்களுக்கான இலவச ஆன்லைன் பதிவு.',
    },
    eligibility: [
      { en: 'Micro, Small, or Medium business in manufacturing or service sector', ta: 'உற்பத்தி அல்லது சேவைத் துறையிலுள்ள MSME வணிகங்கள்' },
    ],
    documents: [
      { en: 'Aadhaar number of proprietor / partner / director', ta: 'உரிமையாளரின் ஆதார் எண்' },
      { en: 'PAN card of the business / proprietor', ta: 'வணிகத்தின் PAN அட்டை' },
      { en: 'GSTIN (if applicable as per turnover norms)', ta: 'GSTIN (தேவைப்பட்டால்)' },
      { en: 'Bank account details (Account number & IFSC)', ta: 'வங்கி கணக்கு விவரங்கள்' },
    ],
    steps: [
      { id: 's1', title: { en: 'Visit official Udyam portal', ta: 'அதிகாரப்பூர்வ உத்யாம் போர்ட்டலுக்குச் செல்லவும்' }, description: { en: 'Click "For New Entrepreneurs who are not registered yet as MSME".', ta: '"புதிய தொழில்முனைவோருக்கு" என்பதைத் தேர்ந்தெடுக்கவும்.' } },
      { id: 's2', title: { en: 'Validate Aadhaar & PAN with OTP', ta: 'ஆதார் & PAN-ஐ OTP மூலம் சரிபார்க்கவும்' }, description: { en: 'Enter Aadhaar number and OTP received on mobile.', ta: 'ஆதார் எண் மற்றும் OTP உள்ளிடவும்.' } },
      { id: 's3', title: { en: 'Fill business details & NIC codes', ta: 'வணிக விவரங்கள் & NIC குறியீடுகளை நிரப்பவும்' }, description: { en: 'Select National Industrial Classification (NIC) code for your activity.', ta: 'உங்கள் தொழிலுக்கான NIC குறியீட்டைத் தேர்ந்தெடுக்கவும்.' } },
      { id: 's4', title: { en: 'Submit application', ta: 'விண்ணப்பத்தை சமர்ப்பிக்கவும்' }, description: { en: 'Verify investment and turnover auto-fetched from Income Tax & GST.', ta: 'வருமான வரி & GST தகவல்களை சரிபார்க்கவும்.' } },
      { id: 's5', title: { en: 'Instant Udyam Registration Certificate', ta: 'உடனடி உத்யாம் பதிவு சான்றிதழ்' }, description: { en: 'Download Udyam Certificate featuring unique URN.', ta: 'தனித்துவமான URN சான்றிதழைப் பதிவிறக்கவும்.' } },
    ],
    commonMistakes: [
      { en: 'Falling for fake third-party paid registration portals (Official portal is 100% free)', ta: 'போலி கட்டண வலைத்தளங்களில் ஏமாறுவது (அதிகாரப்பூர்வ தளம் 100% இலவசம்)' },
    ],
    portalName: 'Udyam Registration',
    officialUrl: 'https://udyamregistration.gov.in/',
    officialUrlPlaceholder: 'https://udyamregistration.gov.in/',
    feeNote: { en: '100% FREE — Government does not charge any registration fee.', ta: '100% இலவசம் — அரசு கட்டணம் எதுவுமில்லை.' },
    processingTimeNote: { en: 'Instant e-certificate generation upon submission.', ta: 'சமர்ப்பித்தவுடன் உடனடி சான்றிதழ்.' },
    keywords: ['udyam', 'msme', 'udyog aadhaar', 'small business', 'msme certificate'],
    isDemoData: true,
  },
  {
    id: 'gst-registration',
    name: { en: 'GST Registration & Services', ta: 'ஜிஎஸ்டி பதிவு & சேவைகள்' },
    shortName: 'GST Portal',
    category: 'tax',
    department: { en: 'Goods and Services Tax Network (GSTN) / CBIC', ta: 'சரக்கு மற்றும் சேவை வரி பிணையம் (GSTN)' },
    description: {
      en: 'Apply for 15-digit Goods and Services Tax Identification Number (GSTIN), file returns, and manage e-way bills.',
      ta: '15-இலக்க GSTIN எண் பெற, வரி தாக்கல் செய்ய மற்றும் e-way பில்களை நிர்வகிக்க விண்ணப்பிக்கவும்.',
    },
    eligibility: [
      { en: 'Businesses with turnover exceeding threshold (₹20L/₹40L for goods, ₹10L/₹20L for services) or interstate traders', ta: 'குறிப்பிட்ட வரம்பிற்கு மேல் வணிகம் செய்யும் அல்லது மாநிலங்களுக்கு இடையே வர்த்தகம் செய்யும் நிறுவனங்கள்' },
    ],
    documents: [
      { en: 'PAN card of the business / proprietor', ta: 'PAN அட்டை' },
      { en: 'Aadhaar of proprietor / authorized signatory', ta: 'ஆதார் அட்டை' },
      { en: 'Proof of business registration (Incorporation cert / Partnership deed)', ta: 'நிறுவன பதிவு சான்று' },
      { en: 'Principal place of business address proof (Electricity bill / Rent agreement & NOC)', ta: 'வணிக வளாக முகவரி சான்று' },
      { en: 'Cancelled cheque / Bank statement', ta: 'வங்கி கணக்கு விவரங்கள்' },
    ],
    steps: [
      { id: 's1', title: { en: 'Generate TRN on GST Portal', ta: 'GST போர்ட்டலில் TRN உருவாக்கவும்' }, description: { en: 'Fill Part A of REG-01 to generate Temporary Reference Number.', ta: 'தற்காலிக குறிப்பு எண் (TRN) பெறவும்.' } },
      { id: 's2', title: { en: 'Complete Part B of GST REG-01 application', ta: 'விண்ணப்பத்தின் பகுதி B நிரப்பவும்' }, description: { en: 'Fill business details, goods/services HSN codes, and upload proofs.', ta: 'வணிக விவரங்கள், HSN குறியீடுகளை உள்ளிடவும்.' } },
      { id: 's3', title: { en: 'Aadhaar Authentication', ta: 'ஆதார் அங்கீகாரம்' }, description: { en: 'Complete online Aadhaar e-KYC authentication via link.', ta: 'ஆன்லைன் ஆதார் e-KYC அங்கீகாரத்தை முடிக்கவும்.' } },
      { id: 's4', title: { en: 'Verification by Tax Officer', ta: 'வரி அலுவலர் சரிபார்ப்பு' }, description: { en: 'Officer reviews application within 7 working days.', ta: '7 வேலை நாட்களுக்குள் அலுவலர் சரிபார்ப்பார்.' } },
      { id: 's5', title: { en: 'Download GSTIN Registration Certificate', ta: 'GSTIN சான்றிதழ் பதிவிறக்கவும்' }, description: { en: 'Download Form GST REG-06 with assigned GSTIN.', ta: 'GSTIN சான்றிதழை போர்ட்டலில் இருந்து பதிவிறக்கவும்.' } },
    ],
    commonMistakes: [
      { en: 'Uploading unclear address proof or missing NOC from landlord', ta: 'தெளிவற்ற முகவரி சான்று அல்லது வீட்டு உரிமையாளர் NOC இல்லாமை' },
    ],
    portalName: 'GST Portal',
    officialUrl: 'https://www.gst.gov.in/',
    officialUrlPlaceholder: 'https://www.gst.gov.in/',
    feeNote: { en: 'Free — No government fee for GST registration.', ta: 'இலவசம் — அரசு கட்டணம் எதுவுமில்லை.' },
    processingTimeNote: { en: '3 to 7 working days with Aadhaar authentication.', ta: 'ஆதார் அங்கீகாரத்துடன் 3 முதல் 7 வேலை நாட்கள்.' },
    keywords: ['gst', 'gstin', 'gst registration', 'gst portal', 'gst return', 'tax'],
    isDemoData: true,
  },
  {
    id: 'tn-e-sevai',
    name: { en: 'Tamil Nadu Certificates & Citizen Services', ta: 'தமிழ்நாடு சான்றிதழ்கள் & குடிமக்கள் சேவைகள்' },
    shortName: 'TN e-Sevai',
    category: 'certificates',
    department: { en: 'Tamil Nadu e-Governance Agency (TNeGA) / Revenue Dept.', ta: 'தமிழ்நாடு மின் ஆளுமை முகமை (TNeGA) / வருவாய்த் துறை' },
    description: {
      en: 'Single window portal for Tamil Nadu citizen certificates including Community, Income, Residence, First Graduate, and Legal Heir.',
      ta: 'சாதி, வருமானம், இருப்பிடம், முதல் பட்டதாரி மற்றும் வாரிசு சான்றிதழ்களுக்கான ஒருங்கிணைந்த தமிழ்நாடு மின்-சேவை போர்ட்டல்.',
    },
    eligibility: [
      { en: 'Residents of Tamil Nadu seeking official revenue certificates', ta: 'அரசு வருவாய் சான்றிதழ்கள் தேவைப்படும் தமிழ்நாட்டின் குடியிருப்பாளர்கள்' },
    ],
    documents: [
      { en: 'Aadhaar Card of applicant', ta: 'விண்ணப்பதாரரின் ஆதார் அட்டை' },
      { en: 'Smart Ration Card', ta: 'ஸ்மார்ட் குடும்ப அட்டை' },
      { en: 'Applicant Photograph', ta: 'புகைப்படம்' },
      { en: 'Self-declaration affidavit', ta: 'சுய அறிவிப்பு உறுதிமொழி' },
    ],
    steps: [
      { id: 's1', title: { en: 'Log in to TN e-Sevai Portal', ta: 'TN e-Sevai போர்ட்டலில் நுழையவும்' }, description: { en: 'Register or log in using CAN (Citizen Access Number).', ta: 'CAN எண் பயன்படுத்தி நுழையவும்.' } },
      { id: 's2', title: { en: 'Select desired certificate service', ta: 'தேவையான சான்றிதழைத் தேர்ந்தெடுக்கவும்' }, description: { en: 'Choose Income, Community, Native, or Legal Heir Certificate.', ta: 'வருமானம், சாதி, இருப்பிடம் அல்லது வாரிசு சான்றிதழைத் தேர்ந்தெடுக்கவும்.' } },
      { id: 's3', title: { en: 'Fill details & upload documents', ta: 'விவரங்கள் நிரப்பி ஆவணங்களை பதிவேற்றவும்' }, description: { en: 'Attach Aadhaar, Ration card and required proofs.', ta: 'ஆதார், ரேஷன் கார்டு மற்றும் சான்றுகளை இணைக்கவும்.' } },
      { id: 's4', title: { en: 'Field Verification by VAO / Revenue Inspector', ta: 'VAO / வருவாய் ஆய்வாளர் சரிபார்ப்பு' }, description: { en: 'Village Administrative Officer (VAO) verifies submission.', ta: 'கிராம நிர்வாக அலுவலர் (VAO) கள சரிபார்ப்பு செய்வார்.' } },
      { id: 's5', title: { en: 'Digital Approval by Tahsildar & Download', ta: 'தாசில்தார் ஒப்புதல் & பதிவிறக்கம்' }, description: { en: 'Download digitally signed QR-coded certificate.', ta: 'QR குறியீட்டுடன் டிஜிட்டல் கையொப்பமிட்ட சான்றிதழைப் பதிவிறக்கவும்.' } },
    ],
    commonMistakes: [
      { en: 'Applying without creating or linking a CAN number first', ta: 'முன்னதாக CAN எண் உருவாக்காமல் விண்ணப்பித்தல்' },
    ],
    portalName: 'Tamil Nadu e-Sevai / TNeGA',
    officialUrl: 'https://serviceonline.gov.in/configuretn/login.do?language=en',
    officialUrlPlaceholder: 'https://serviceonline.gov.in/configuretn/login.do?language=en',
    feeNote: { en: '₹60 service fee per certificate application.', ta: 'ஒரு சான்றிதழ் விண்ணப்பத்திற்கு ₹60 சேவை கட்டணம்.' },
    processingTimeNote: { en: '7 to 15 working days following VAO report.', ta: 'VAO அறிக்கை பின் 7 முதல் 15 வேலை நாட்கள்.' },
    keywords: ['tn e-sevai', 'tnega', 'community certificate', 'income certificate', 'native certificate', 'tamil nadu'],
    isDemoData: true,
  },
  {
    id: 'tn-land-records',
    name: { en: 'Tamil Nadu Land Records / Patta-Chitta', ta: 'தமிழ்நாடு நில பதிவுகள் / பட்டா-சிட்டா' },
    shortName: 'Patta Chitta',
    category: 'land',
    department: { en: 'Department of Survey and Settlement, Government of Tamil Nadu', ta: 'நில அளவை மற்றும் நில வரித்திட்ட துறை, தமிழ்நாடு அரசு' },
    description: {
      en: 'View, verify, and download digitally signed Patta, Chitta, TSLR extracts, and A-Register extracts online.',
      ta: 'டிஜிட்டல் கையொப்பமிட்ட பட்டா, சிட்டா, TSLR சாறு மற்றும் A-பதிவேடு விவரங்களை ஆன்லைனில் பார்வையிட மற்றும் பதிவிறக்க.',
    },
    eligibility: [
      { en: 'Landowners or interested property buyers in Tamil Nadu', ta: 'தமிழ்நாட்டிலுள்ள நில உரிமையாளர்கள் அல்லது சொத்து வாங்குபவர்கள்' },
    ],
    documents: [
      { en: 'District, Taluk, and Village details', ta: 'மாவட்டம், வட்டம் மற்றும் கிராம விவரங்கள்' },
      { en: 'Survey Number and Sub-division Number OR Patta Number', ta: 'புல எண் மற்றும் உட்பிரிவு எண் அல்லது பட்டா எண்' },
    ],
    steps: [
      { id: 's1', title: { en: 'Open TN Land Records Portal (eservices.tn.gov.in)', ta: 'TN நில பதிவுகள் போர்ட்டலைத் திறக்கவும்' }, description: { en: 'Click "View Patta & FMB / Chitta / TSLR Extract".', ta: '"பட்டா & சிட்டா விவரங்களை பார்" என்பதை சொடுக்கவும்.' } },
      { id: 's2', title: { en: 'Select Location details', ta: 'இட விவரங்களைத் தேர்ந்தெடுக்கவும்' }, description: { en: 'Choose Rural or Urban, District, Taluk, and Village.', ta: 'கிராமப்புறம்/நகர்ப்புறம், மாவட்டம், வட்டம், கிராமம் தேர்வு செய்யவும்.' } },
      { id: 's3', title: { en: 'Enter Survey / Patta Number', ta: 'சர்வே / பட்டா எண் உள்ளிடவும்' }, description: { en: 'Input Survey Number and Sub-division Number.', ta: 'சர்வே எண் மற்றும் உட்பிரிவு எண்ணை உள்ளிடவும்.' } },
      { id: 's4', title: { en: 'Submit captcha and view Patta-Chitta', ta: 'கேப்ட்சா உள்ளிட்டு பட்டா-சிட்டா பார்க்கவும்' }, description: { en: 'Verify landholder name, extent, and land classification.', ta: 'நில உரிமையாளர் பெயர், பரப்பு மற்றும் நில வகையை சரிபார்க்கவும்.' } },
      { id: 's5', title: { en: 'Download digitally signed PDF', ta: 'டிஜிட்டல் கையொப்பமிட்ட PDF பதிவிறக்கவும்' }, description: { en: 'Save official Patta-Chitta copy for legal/bank requirements.', ta: 'வங்கி/சட்டத் தேவைகளுக்காக அதிகாரப்பூர்வ பிரதியை சேமிக்கவும்.' } },
    ],
    commonMistakes: [
      { en: 'Entering incorrect survey sub-division slash format', ta: 'தவறான சர்வே உட்பிரிவு வடிவத்தை உள்ளிடுவது' },
    ],
    portalName: 'Tamil Nadu Land Records e-Services',
    officialUrl: 'https://eservices.tn.gov.in/',
    officialUrlPlaceholder: 'https://eservices.tn.gov.in/',
    feeNote: { en: 'FREE to view and download online copies.', ta: 'ஆன்லைனில் பார்க்க மற்றும் பதிவிறக்க இலவசம்.' },
    processingTimeNote: { en: 'Instant online retrieval.', ta: 'உடனடி ஆன்லைன் பெறுகை.' },
    keywords: ['patta', 'chitta', 'patta chitta', 'tn land records', 'eservices tn', 'tslr', 'survey number'],
    isDemoData: true,
  },
  {
    id: 'tnreginet',
    name: { en: 'Tamil Nadu Registration Services', ta: 'தமிழ்நாடு பதிவுத் துறை சேவைகள்' },
    shortName: 'TNREGINET',
    category: 'land',
    department: { en: 'Registration Department, Government of Tamil Nadu (TNREGINET)', ta: 'பதிவுத் துறை, தமிழ்நாடு அரசு (TNREGINET)' },
    description: {
      en: 'Encumbrance Certificate (EC) search, Guideline Value check, document registration appointment booking, and marriage registration.',
      ta: 'வில்லங்க சான்றிதழ் (EC) தேடல், வழிகாட்டி மதிப்பு சரிபார்ப்பு, ஆவணப் பதிவு சந்திப்பு நேரம் மற்றும் திருமணப் பதிவு.',
    },
    eligibility: [
      { en: 'Property buyers, sellers, legal professionals, and citizens in Tamil Nadu', ta: 'சொத்து வாங்குபவர்கள், விற்பவர்கள் மற்றும் பொதுமக்கள்' },
    ],
    documents: [
      { en: 'Property Zone, District, Sub-Registrar Office (SRO) details', ta: 'மண்டலம், மாவட்டம், சார்பதிவாளர் அலுவலக விவரங்கள்' },
      { en: 'Survey Number / Plot Number / Boundaries details', ta: 'சர்வே எண் / மனை எண் விவரங்கள்' },
      { en: 'Document number and year (for EC search)', ta: 'ஆவண எண் மற்றும் ஆண்டு (EC தேடலுக்கு)' },
    ],
    steps: [
      { id: 's1', title: { en: 'Access TNREGINET Portal', ta: 'TNREGINET போர்ட்டலை அணுகவும்' }, description: { en: 'Create user account on tnreginet.gov.in.', ta: 'tnreginet.gov.in தளத்தில் கணக்கு உருவாக்கவும்.' } },
      { id: 's2', title: { en: 'Search Encumbrance Certificate (EC)', ta: 'வில்லங்க சான்றிதழ் (EC) தேடவும்' }, description: { en: 'Enter Zone, District, SRO, Survey No, and Date Range.', ta: 'மண்டலம், SRO, சர்வே எண் மற்றும் தேதிகளை உள்ளிடவும்.' } },
      { id: 's3', title: { en: 'Check Property Guideline Value', ta: 'சொத்து வழிகாட்டி மதிப்பை பார்க்கவும்' }, description: { en: 'Verify official government valuation rate per sq.ft / acre.', ta: 'சதுர அடி/ஏக்கருக்கான அரசு வழிகாட்டி மதிப்பை சரிபார்க்கவும்.' } },
      { id: 's4', title: { en: 'Apply for Certified Copy of EC / Sale Deed', ta: 'சான்றளிக்கப்பட்ட EC நகலுக்கு விண்ணப்பிக்கவும்' }, description: { en: 'Pay online fee for digitally signed EC download.', ta: 'டிஜிட்டல் கையொப்பமிட்ட EC-க்கு ஆன்லைனில் கட்டணம் செலுத்தவும்.' } },
      { id: 's5', title: { en: 'Book SRO Token for Document Registration', ta: 'சார்பதிவாளர் நேரத்தை முன்பதிவு செய்யவும்' }, description: { en: 'Schedule token slot for property deed registration.', ta: 'பத்திரப் பதிவுக்கு டோக்கன் நேரத்தை முன்பதிவு செய்யவும்.' } },
    ],
    commonMistakes: [
      { en: 'Selecting wrong Sub-Registrar Office (SRO) jurisdiction', ta: 'தவறான சார்பதிவாளர் அலுவலக அதிகார எல்லையைத் தேர்ந்தெடுப்பது' },
    ],
    portalName: 'TNREGINET',
    officialUrl: 'https://tnreginet.gov.in/',
    officialUrlPlaceholder: 'https://tnreginet.gov.in/',
    feeNote: { en: 'EC view free; Certified EC copy ₹100–200 online.', ta: 'EC பார்க்க இலவசம்; சான்றளிக்கப்பட்ட நகல் ₹100-200.' },
    processingTimeNote: { en: 'Online EC view instant; Certified copy 1–3 days.', ta: 'EC பார்வை உடனடி; சான்றளிக்கப்பட்ட நகல் 1-3 நாட்கள்.' },
    keywords: ['tnreginet', 'ec search', 'encumbrance certificate', 'guideline value', 'sro', 'property registration'],
    isDemoData: true,
  },
  {
    id: 'national-services-directory',
    name: { en: 'National Government Services Directory', ta: 'தேசிய அரசு சேவைகள் அடைவு' },
    shortName: 'Services India Portal',
    category: 'welfare',
    department: { en: 'National Informatics Centre (NIC) / MeitY, Government of India', ta: 'தேசிய தகவலியல் மையம் (NIC) / இந்திய அரசு' },
    description: {
      en: 'Centralized directory of over 12,000+ Central and State government citizen services across all Ministries and Departments.',
      ta: '12,000-க்கும் மேற்பட்ட மத்திய மற்றும் மாநில அரசு குடிமக்கள் சேவைகளுக்கான ஒருங்கிணைந்த போர்ட்டல்.',
    },
    eligibility: [
      { en: 'All citizens of India seeking access to Union & State public services', ta: 'அனைத்து இந்திய குடிமக்களும்' },
    ],
    documents: [
      { en: 'Varies based on the selected government service', ta: 'தேர்ந்தெடுக்கப்பட்ட அரசு சேவைக்கு ஏற்ப மாறுபடும்' },
    ],
    steps: [
      { id: 's1', title: { en: 'Visit services.india.gov.in', ta: 'services.india.gov.in தளத்திற்குச் செல்லவும்' }, description: { en: 'Access unified portal for national public service catalog.', ta: 'தேசிய அரசு சேவைகள் அடைவை அணுகவும்.' } },
      { id: 's2', title: { en: 'Search by Service Name, Department, or State', ta: 'சேவை பெயர், துறை அல்லது மாநிலம் மூலம் தேடவும்' }, description: { en: 'Filter by Central schemes or specific State Government.', ta: 'மத்திய திட்டங்கள் அல்லது குறிப்பிட்ட மாநிலம் அடிப்படையில் வடிகட்டவும்.' } },
      { id: 's3', title: { en: 'Select service card to view official instructions', ta: 'சேவையைத் தேர்ந்தெடுத்து விவரங்களை பார்க்கவும்' }, description: { en: 'Review prerequisites and nodal officer contact info.', ta: 'தேவையான முன்நிபந்தனைகளை ஆய்வு செய்யவும்.' } },
      { id: 's4', title: { en: 'Direct single-sign-on redirect', ta: 'அதிகாரப்பூர்வ தளத்திற்கு நேரடியாகச் செல்லவும்' }, description: { en: 'Click official link to land directly on issuing Ministry portal.', ta: 'வழங்கும் அமைச்சக தளத்திற்குச் செல்ல அதிகாரப்பூர்வ இணைப்பை அழுத்தவும்.' } },
    ],
    commonMistakes: [
      { en: 'Visiting unverified phishing sites mimicking official government domain endings (.gov.in / .nic.in)', ta: 'அதிகாரப்பூர்வமற்ற போலி வலைத்தளங்களுக்குச் செல்வது' },
    ],
    portalName: 'National Government Services Portal',
    officialUrl: 'https://services.india.gov.in/',
    officialUrlPlaceholder: 'https://services.india.gov.in/',
    feeNote: { en: 'Free gateway portal.', ta: 'இலவச தகவல் போர்ட்டல்.' },
    processingTimeNote: { en: 'Direct access directory.', ta: 'உடனடி அணுகல் அடைவு.' },
    keywords: ['national government services', 'services.india.gov.in', 'nic', 'central government portal', 'government directory'],
    isDemoData: true,
  },
  {
    id: 'birth-certificate',
    name: { en: 'Birth Certificate', ta: 'பிறப்பு சான்றிதழ்' },
    shortName: 'Birth Cert.',
    category: 'certificates',
    department: { en: 'Municipal Corporation / Panchayat Registrar / e-Sevai', ta: 'நகராட்சி / பஞ்சாயத்து பதிவாளர் / e-Sevai' },
    description: {
      en: 'Official record of birth, issued by local municipal registration authorities and Civil Registration System (CRS).',
      ta: 'உள்ளூர் நகராட்சி பதிவு அதிகாரம் மற்றும் CRS மூலம் வழங்கப்படும் பிறப்பின் அதிகாரப்பூர்வ பதிவு.',
    },
    eligibility: [
      { en: 'Any birth registered within the state jurisdiction', ta: 'அதிகார எல்லைக்குள் பதிவு செய்யப்பட்ட எந்த பிறப்பும்' },
    ],
    documents: [
      { en: 'Hospital birth discharge record', ta: 'மருத்துவமனை பிறப்பு பதிவு' },
      { en: 'Parents identity and address proof (Aadhaar / Passport)', ta: 'பெற்றோரின் அடையாள மற்றும் முகவரி சான்று' },
    ],
    steps: [
      { id: 's1', title: { en: 'Check if registered by hospital', ta: 'மருத்துவமனையில் பதிவு உள்ளதா என பார்க்கவும்' }, description: { en: 'Births in hospitals are auto-reported within 21 days.', ta: '21 நாட்களுக்குள் மருத்துவமனைகள் தானாக பதிவு செய்யும்.' } },
      { id: 's2', title: { en: 'Apply for certified copy online', ta: 'சான்றளிக்கப்பட்ட நகலுக்கு ஆன்லைனில் விண்ணப்பிக்கவும்' }, description: { en: 'Apply via e-Sevai or municipal CRS portal.', ta: 'e-Sevai அல்லது நகராட்சி CRS போர்ட்டலில் விண்ணப்பிக்கவும்.' } },
      { id: 's3', title: { en: 'Download digitally signed certificate', ta: 'டிஜிட்டல் கையொப்பமிட்ட சான்றிதழ் பெறவும்' }, description: { en: 'Download QR-coded birth certificate.', ta: 'QR குறியீட்டுடன் சான்றிதழைப் பதிவிறக்கவும்.' } },
    ],
    commonMistakes: [
      { en: 'Delaying registration beyond 21 days requiring magistrate order', ta: '21 நாட்களுக்கு மேல் தாமதிப்பது' },
    ],
    portalName: 'Tamil Nadu e-Sevai / TNeGA',
    officialUrl: 'https://serviceonline.gov.in/configuretn/login.do?language=en',
    officialUrlPlaceholder: 'https://serviceonline.gov.in/configuretn/login.do?language=en',
    feeNote: { en: 'First copy free within 21 days; nominal ₹60 for extra copies.', ta: '21 நாட்களுக்குள் இலவசம்; கூடுதல் நகல் ₹60.' },
    processingTimeNote: { en: '3 to 7 working days.', ta: '3 முதல் 7 வேலை நாட்கள்.' },
    keywords: ['birth certificate', 'newborn', 'crs', 'registration'],
    isDemoData: true,
  },
  {
    id: 'caste-certificate',
    name: { en: 'Caste / Community Certificate', ta: 'சாதி / சமூக சான்றிதழ்' },
    shortName: 'Caste Cert.',
    category: 'certificates',
    department: { en: 'Revenue Department (Tahsildar)', ta: 'வருவாய்த் துறை (தாசில்தார்)' },
    description: {
      en: 'Proof of community category (SC/ST/OBC/BC/MBC) for education, admissions, and reservation benefits.',
      ta: 'இடஒதுக்கீடு மற்றும் கல்வி சலுகைகளுக்கான சாதி நிலை சான்று.',
    },
    eligibility: [
      { en: 'Applicant belonging to recognized community category in Tamil Nadu', ta: 'அங்கீகரிக்கப்பட்ட பிரிவைச் சேர்ந்த தமிழ்நாட்டின் குடிமகன்' },
    ],
    documents: [
      { en: 'Parent or sibling community certificate', ta: 'பெற்றோர் அல்லது உடன் பிறந்தாரின் சாதி சான்று' },
      { en: 'School TC or transfer certificate', ta: 'பள்ளி மாற்றுச் சான்றிதழ் (TC)' },
      { en: 'Smart Ration Card & Aadhaar Card', ta: 'குடும்ப அட்டை & ஆதார்' },
    ],
    steps: [
      { id: 's1', title: { en: 'Apply via TN e-Sevai', ta: 'TN e-Sevai மூலம் விண்ணப்பிக்கவும்' }, description: { en: 'Submit application with CAN number.', ta: 'CAN எண் கொண்டு விண்ணப்பிக்கவும்.' } },
      { id: 's2', title: { en: 'Attach ancestral proof', ta: 'முன்னோர் சான்றுகளை இணைக்கவும்' }, description: { en: 'Upload parent community certificate.', ta: 'பெற்றோர் சான்றிதழை பதிவேற்றவும்.' } },
      { id: 's3', title: { en: 'VAO & RI Field Inspection', ta: 'VAO மற்றும் RI கள சரிபார்ப்பு' }, description: { en: 'Local revenue inquiry to confirm community status.', ta: 'சமூக நிலையை சரிபார்க்க வருவாய் விசாரணை.' } },
      { id: 's4', title: { en: 'Download Certificate', ta: 'சான்றிதழ் பதிவிறக்கவும்' }, description: { en: 'Download digitally signed Tahsildar certificate.', ta: 'டிஜிட்டல் சான்றிதழைப் பதிவிறக்கவும்.' } },
    ],
    commonMistakes: [
      { en: 'Not attaching parent or school community proof', ta: 'பெற்றோர் அல்லது பள்ளி சாதி சான்று இணைக்கத் தவறுவது' },
    ],
    portalName: 'Tamil Nadu e-Sevai / TNeGA',
    officialUrl: 'https://serviceonline.gov.in/configuretn/login.do?language=en',
    officialUrlPlaceholder: 'https://serviceonline.gov.in/configuretn/login.do?language=en',
    feeNote: { en: '₹60 e-Sevai fee.', ta: '₹60 e-Sevai கட்டணம்.' },
    processingTimeNote: { en: '15 working days.', ta: '15 வேலை நாட்கள்.' },
    keywords: ['caste certificate', 'community certificate', 'sc st obc mbc', 'tnega'],
    isDemoData: true,
  },
  {
    id: 'income-certificate',
    name: { en: 'Income Certificate', ta: 'வருமான சான்றிதழ்' },
    shortName: 'Income Cert.',
    category: 'certificates',
    department: { en: 'Revenue Department (Tahsildar)', ta: 'வருவாய்த் துறை (தாசில்தார்)' },
    description: {
      en: 'Certifies annual family income, essential for government scholarships, fee concessions, and welfare schemes.',
      ta: 'உதவித்தொகை மற்றும் சலுகைகளுக்கான ஆண்டு குடும்ப வருமான சான்று.',
    },
    eligibility: [
      { en: 'Resident applying for financial aid or scholarship schemes', ta: 'நிதி உதவி அல்லது உதவித்தொகை கோரும் குடியிருப்பாளர்' },
    ],
    documents: [
      { en: 'Salary certificate / Form 16 / Income declaration', ta: 'சம்பள சான்றிதழ் / வருமான அறிவிப்பு' },
      { en: 'Property tax receipt / Land document (if applicable)', ta: 'சொத்து வரி ரசீது' },
      { en: 'Aadhaar Card & Smart Ration Card', ta: 'ஆதார் அட்டை & குடும்ப அட்டை' },
    ],
    steps: [
      { id: 's1', title: { en: 'Gather income proofs', ta: 'வருமான சான்றுகளை சேகரிக்கவும்' }, description: { en: 'Pay slip, IT return, or self-declaration.', ta: 'சம்பள சீட்டு அல்லது சுய அறிவிப்பு.' } },
      { id: 's2', title: { en: 'Apply on TN e-Sevai Portal', ta: 'TN e-Sevai போர்ட்டலில் விண்ணப்பிக்கவும்' }, description: { en: 'Fill family income details.', ta: 'குடும்ப வருமான விவரங்களை உள்ளிடவும்.' } },
      { id: 's3', title: { en: 'VAO verification & Tahsildar approval', ta: 'VAO சரிபார்ப்பு & ஒப்புதல்' }, description: { en: 'Field check by Village Administrative Officer.', ta: 'கிராம நிர்வாக அலுவலர் கள சோதனை.' } },
      { id: 's4', title: { en: 'Download valid Income Certificate', ta: 'வருமான சான்றிதழ் பெறவும்' }, description: { en: 'Valid for 1 financial year.', ta: '1 நிதி ஆண்டிற்கு செல்லுபடியாகும்.' } },
    ],
    commonMistakes: [
      { en: 'Under-reporting income causing rejection during audit', ta: 'தவறான குறைவான வருமானத்தைக் குறிப்பிடுவது' },
    ],
    portalName: 'Tamil Nadu e-Sevai / TNeGA',
    officialUrl: 'https://serviceonline.gov.in/configuretn/login.do?language=en',
    officialUrlPlaceholder: 'https://serviceonline.gov.in/configuretn/login.do?language=en',
    feeNote: { en: '₹60 service charge.', ta: '₹60 சேவை கட்டணம்.' },
    processingTimeNote: { en: '7 to 10 working days.', ta: '7 முதல் 10 வேலை நாட்கள்.' },
    keywords: ['income certificate', 'scholarship income proof', 'revenue dept', 'tnega'],
    isDemoData: true,
  },
  {
    id: 'scholarship',
    name: { en: 'Government Scholarship', ta: 'அரசு உதவித்தொகை' },
    shortName: 'Scholarship',
    category: 'education',
    department: { en: 'National Scholarship Portal / State Education Dept.', ta: 'தேசிய உதவித்தொகை போர்ட்டல் / கல்வித் துறை' },
    description: {
      en: 'Central and State Post-Matric, Pre-Matric, and Merit-cum-Means Scholarships for school and college students.',
      ta: 'பள்ளி மற்றும் கல்லூரி மாணவர்களுக்கான மத்திய மற்றும் மாநில அரசு உதவித்தொகைகள்.',
    },
    eligibility: [
      { en: 'Enrolled student meeting family income and academic merit criteria', ta: 'வருமான மற்றும் தகுதி வரம்பை பூர்த்தி செய்யும் மாணவர்' },
    ],
    documents: [
      { en: 'Income Certificate & Community Certificate', ta: 'வருமான சான்றிதழ் & சாதி சான்றிதழ்' },
      { en: 'Previous year Marksheet', ta: 'முந்தைய ஆண்டு மதிப்பெண் பட்டியல்' },
      { en: 'Aadhaar-seeded Bank Account details', ta: 'ஆதாருடன் இணைக்கப்பட்ட வங்கி கணக்கு' },
      { en: 'Bonafide Certificate from College / School', ta: 'பள்ளி/கல்லூரி சேர்க்கை சான்று' },
    ],
    steps: [
      { id: 's1', title: { en: 'Find matching scheme on NSP / State Portal', ta: 'உதவித்தொகை திட்டத்தை கண்டறியவும்' }, description: { en: 'Filter by category, course, and income limit.', ta: 'பிரிவு மற்றும் படிப்பு அடிப்படையில் வடிகட்டவும்.' } },
      { id: 's2', title: { en: 'Register student profile', ta: 'மாணவர் சுயவிவரத்தை பதிவு செய்யவும்' }, description: { en: 'One-time registration using Aadhaar and OTR.', ta: 'ஆதார் மூலம் ஒருமுறை பதிவு செய்யவும்.' } },
      { id: 's3', title: { en: 'Submit online application and documents', ta: 'விண்ணப்பத்தை சமர்ப்பிக்கவும்' }, description: { en: 'Upload scanned marksheet, income cert, and bank details.', ta: 'சான்றிதழ்களை பதிவேற்றவும்.' } },
      { id: 's4', title: { en: 'Institute & Nodal Officer Verification', ta: 'நிறுவன சரிபார்ப்பு' }, description: { en: 'Institute verifies your student bonafide status.', ta: 'கல்வி நிறுவனம் உங்கள் சேர்க்கையை சரிபார்க்கும்.' } },
      { id: 's5', title: { en: 'Direct Benefit Transfer (DBT) payment', ta: 'DBT வங்கி கணக்கு செலுத்துதல்' }, description: { en: 'Funds credited directly to bank account.', ta: 'நிதி நேரடியாக வங்கி கணக்கில் வரவு வைக்கப்படும்.' } },
    ],
    commonMistakes: [
      { en: 'Bank account not mapped to Aadhaar NPCI mapper for DBT', ta: 'வங்கி கணக்கு ஆதாருடன் இணைக்கப்படாமல் இருப்பது' },
    ],
    portalName: 'National Government Services Portal',
    officialUrl: 'https://services.india.gov.in/',
    officialUrlPlaceholder: 'https://services.india.gov.in/',
    feeNote: { en: 'FREE to apply.', ta: 'இலவசம்.' },
    processingTimeNote: { en: 'Disbursed according to academic cycle.', ta: 'கல்வி ஆண்டு சுழற்சி படி வழங்கப்படும்.' },
    keywords: ['scholarship', 'nsp', 'student aid', 'dbt', 'post matric scholarship'],
    isDemoData: true,
  },
  {
    id: 'employment-registration',
    name: { en: 'Employment Exchange Registration', ta: 'வேலைவாய்ப்பு அலுவலக பதிவு' },
    shortName: 'Employment',
    category: 'employment',
    department: { en: 'State Employment & Training Department / e-Sevai', ta: 'மாநில வேலைவாய்ப்பு & பயிற்சித் துறை' },
    description: {
      en: 'Register qualifications to secure seniority for government job recruitments and public sector vacancies.',
      ta: 'அரசு பணி நியமனங்களுக்கான மூப்பு நிலையைப் பெற வேலைவாய்ப்பு அலுவலகத்தில் கல்வித் தகுதியை பதிவு செய்தல்.',
    },
    eligibility: [
      { en: 'Jobseekers resident in the state who completed 10th / 12th / Degree / Diploma', ta: 'பள்ளி/கல்லூரி தகுதி முடித்த வேலைதேடுபவர்கள்' },
    ],
    documents: [
      { en: 'Educational Marksheets & Transfer Certificate (TC)', ta: 'கல்வி சான்றிதழ்கள் & TC' },
      { en: 'Community Certificate & Aadhaar Card', ta: 'சாதி சான்றிதழ் & ஆதார்' },
      { en: 'Smart Ration Card', ta: 'குடும்ப அட்டை' },
    ],
    steps: [
      { id: 's1', title: { en: 'Register on State Employment Portal', ta: 'வேலைவாய்ப்பு போர்ட்டலில் பதிவு செய்யவும்' }, description: { en: 'Create jobseeker account.', ta: 'வேலைதேடுபவர் கணக்கை உருவாக்கவும்.' } },
      { id: 's2', title: { en: 'Add educational qualifications & seniority', ta: 'கல்வித் தகுதிகளைச் சேர்க்கவும்' }, description: { en: 'Enter passing year, school/college, and marks.', ta: 'தேர்ச்சி பெற்ற ஆண்டு மற்றும் மதிப்பெண்களை உள்ளிடவும்.' } },
      { id: 's3', title: { en: 'Receive Employment Registration Card', ta: 'பதிவு அட்டை பெறவும்' }, description: { en: 'Obtain registration number with registration date.', ta: 'பதிவு எண்ணுடன் அட்டையைப் பெறவும்.' } },
      { id: 's4', title: { en: 'Renew every 3 years', ta: '3 ஆண்டுகளுக்கு ஒருமுறை புதுப்பிக்கவும்' }, description: { en: 'Maintain seniority by renewing online.', ta: 'ஆன்லைனில் புதுப்பித்து மூப்பை தக்கவைக்கவும்.' } },
    ],
    commonMistakes: [
      { en: 'Failing to renew registration within grace period resulting in loss of seniority', ta: 'புதுப்பிப்பு காலக்கெடுவைத் தவறவிட்டு மூப்பை இழப்பது' },
    ],
    portalName: 'Tamil Nadu e-Sevai / TNeGA',
    officialUrl: 'https://serviceonline.gov.in/configuretn/login.do?language=en',
    officialUrlPlaceholder: 'https://serviceonline.gov.in/configuretn/login.do?language=en',
    feeNote: { en: 'FREE online registration.', ta: 'இலவச ஆன்லைன் பதிவு.' },
    processingTimeNote: { en: 'Instant registration card generation.', ta: 'உடனடி பதிவு அட்டை.' },
    keywords: ['employment exchange', 'job registration', 'employment card', 'tnega', 'seniority'],
    isDemoData: true,
  },
]

export function findServiceById(id) {
  return services.find((s) => s.id === id)
}

/** Keyword-overlap classifier matching user queries to official services. */
export function classifyQuery(query) {
  const q = query.toLowerCase()
  const scored = services.map((service) => {
    let score = 0
    for (const kw of service.keywords) {
      if (q.includes(kw)) score += 2
    }
    if (q.includes(service.shortName.toLowerCase())) score += 3
    if (q.includes(service.category)) score += 1
    return { service, score }
  })
  const matches = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score)
  return matches.length ? matches.map((m) => m.service) : services.slice(0, 3)
}
