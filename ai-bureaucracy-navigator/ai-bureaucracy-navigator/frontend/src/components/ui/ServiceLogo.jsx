
export function ServiceLogo({
  serviceId = '',
  portalName = '',
  size = 'md',
  className = '',
  showBadgeBackground = true,
}) {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  }

  const s = sizeMap[size] || sizeMap.md

  // Normalize ID / Portal for matching
  const id = serviceId.toLowerCase()
  const portal = portalName.toLowerCase()

  // 1. Aadhaar / UIDAI
  if (id.includes('aadhaar') || id.includes('aadhar') || portal.includes('uidai') || portal.includes('myaadhaar')) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
          showBadgeBackground ? 'bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 p-1.5' : ''
        }`}
        title="UIDAI / Aadhaar"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#ffffff" />
          {/* Aadhaar Sunburst rays */}
          <g stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round">
            <line x1="50" y1="12" x2="50" y2="20" />
            <line x1="50" y1="80" x2="50" y2="88" />
            <line x1="12" y1="50" x2="20" y2="50" />
            <line x1="80" y1="50" x2="88" y2="50" />
            <line x1="23" y1="23" x2="29" y2="29" />
            <line x1="71" y1="71" x2="77" y2="77" />
            <line x1="23" y1="77" x2="29" y2="71" />
            <line x1="71" y1="29" x2="77" y2="23" />
            <line x1="36" y1="16" x2="39" y2="23" />
            <line x1="64" y1="16" x2="61" y2="23" />
            <line x1="84" y1="36" x2="77" y2="39" />
            <line x1="84" y1="64" x2="77" y2="61" />
            <line x1="16" y1="36" x2="23" y2="39" />
            <line x1="16" y1="64" x2="23" y2="61" />
          </g>
          {/* Aadhaar Fingerprint Arch */}
          <path
            d="M50 28 A22 22 0 0 1 72 50 C72 63 61 74 50 74 C39 74 28 63 28 50 A22 22 0 0 1 50 28 Z"
            stroke="#F97316"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M50 35 A15 15 0 0 1 65 50 C65 58 58 66 50 66 C42 66 35 58 35 50 A15 15 0 0 1 50 35 Z"
            stroke="#DC2626"
            strokeWidth="3"
          />
          <path
            d="M50 42 A8 8 0 0 1 58 50 C58 54 54 58 50 58 C46 58 42 54 42 50 A8 8 0 0 1 50 42 Z"
            fill="#E11D48"
          />
          {/* Aadhaar Text mark */}
          <text x="50" y="88" textAnchor="middle" fill="#991B1B" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">
            AADHAAR
          </text>
        </svg>
      </div>
    )
  }

  // 2. PAN Card / Income Tax e-Filing
  if (id.includes('pan') || portal.includes('income tax') || portal.includes('incometax')) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
          showBadgeBackground ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 p-1.5' : ''
        }`}
        title="Income Tax Department / PAN"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#0f172a" />
          <circle cx="50" cy="50" r="43" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Card Shape */}
          <rect x="22" y="28" width="56" height="38" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          {/* Chip */}
          <rect x="28" y="36" width="10" height="8" rx="2" fill="#fbbf24" />
          {/* Lines */}
          <rect x="42" y="36" width="28" height="3" rx="1" fill="#94a3b8" />
          <rect x="42" y="42" width="20" height="3" rx="1" fill="#94a3b8" />
          <rect x="28" y="52" width="34" height="4" rx="1" fill="#38bdf8" />
          <circle cx="70" cy="54" r="4" fill="#ef4444" />
          {/* IT Dept Emblem Text */}
          <text x="50" y="80" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
            INCOME TAX
          </text>
          <text x="50" y="90" textAnchor="middle" fill="#fbbf24" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
            e-FILING / PAN
          </text>
        </svg>
      </div>
    )
  }

  // 3. Passport Seva / Ministry of External Affairs
  if (id.includes('passport') || portal.includes('passport')) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
          showBadgeBackground ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-1.5' : ''
        }`}
        title="Passport Seva"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#0b132b" />
          <circle cx="50" cy="50" r="42" stroke="#d4af37" strokeWidth="2" />
          {/* Passport Book */}
          <rect x="28" y="22" width="44" height="54" rx="4" fill="#1c2541" stroke="#d4af37" strokeWidth="1.8" />
          {/* Golden Ashoka Lion Capital Motif */}
          <circle cx="50" cy="40" r="10" stroke="#d4af37" strokeWidth="1.5" fill="#3a506b" />
          <path d="M46 36 L54 36 L52 44 L48 44 Z" fill="#d4af37" />
          <circle cx="50" cy="40" r="3" fill="#facc15" />
          {/* Emblems / Biometric chip sign */}
          <rect x="44" y="62" width="12" height="6" rx="1.5" stroke="#d4af37" strokeWidth="1.2" fill="none" />
          <line x1="40" y1="65" x2="60" y2="65" stroke="#d4af37" strokeWidth="1.2" />
          <circle cx="50" cy="65" r="1.8" fill="#d4af37" />
          <text x="50" y="55" textAnchor="middle" fill="#d4af37" fontSize="5.5" fontWeight="bold" letterSpacing="0.8">
            PASSPORT
          </text>
          <text x="50" y="87" textAnchor="middle" fill="#d4af37" fontSize="7" fontWeight="bold">
            PASSPORT SEVA
          </text>
        </svg>
      </div>
    )
  }

  // 4. Voter ID / Election Commission of India (ECI)
  if (id.includes('voter') || portal.includes('election') || portal.includes('eci')) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
          showBadgeBackground ? 'bg-gradient-to-br from-indigo-700 via-blue-600 to-sky-500 p-1.5' : ''
        }`}
        title="Election Commission of India (ECI)"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#ffffff" />
          {/* Tricolor Ring */}
          <circle cx="50" cy="50" r="44" stroke="#FF9933" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="41" stroke="#138808" strokeWidth="2.5" />
          {/* Inked Voter Finger */}
          <rect x="43" y="24" width="14" height="34" rx="7" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
          <rect x="44" y="25" width="12" height="12" rx="6" fill="#ffedd5" />
          {/* Indelible Purple Inked Mark */}
          <rect x="48.5" y="25" width="3" height="14" rx="1.5" fill="#6b21a8" />
          {/* Ballot Box / Tick */}
          <rect x="28" y="56" width="44" height="22" rx="3" fill="#0284c7" />
          <path d="M40 67 L47 73 L60 61" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="50" y="90" textAnchor="middle" fill="#1e3a8a" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
            ECI / VOTER
          </text>
        </svg>
      </div>
    )
  }

  // 5. Driving Licence / Parivahan Sewa / MoRTH
  if (id.includes('driving') || id.includes('licence') || id.includes('license') || portal.includes('parivahan')) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
          showBadgeBackground ? 'bg-gradient-to-br from-sky-600 via-blue-700 to-cyan-800 p-1.5' : ''
        }`}
        title="Parivahan Sewa / MoRTH"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#0f172a" />
          <circle cx="50" cy="50" r="43" stroke="#38bdf8" strokeWidth="2" />
          {/* Highway Road */}
          <path d="M36 74 L44 32 L56 32 L64 74 Z" fill="#334155" />
          <line x1="50" y1="36" x2="50" y2="44" stroke="#facc15" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="50" y1="48" x2="50" y2="58" stroke="#facc15" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="50" y1="62" x2="50" y2="72" stroke="#facc15" strokeWidth="2" />
          {/* Steering Wheel */}
          <circle cx="50" cy="42" r="18" stroke="#38bdf8" strokeWidth="3.5" fill="none" />
          <circle cx="50" cy="42" r="5" fill="#38bdf8" />
          <line x1="32" y1="42" x2="45" y2="42" stroke="#38bdf8" strokeWidth="3" />
          <line x1="55" y1="42" x2="68" y2="42" stroke="#38bdf8" strokeWidth="3" />
          <line x1="50" y1="47" x2="50" y2="60" stroke="#38bdf8" strokeWidth="3" />
          <text x="50" y="88" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
            PARIVAHAN
          </text>
        </svg>
      </div>
    )
  }

  // 6. FSSAI / Food Safety & FoSCoS
  if (id.includes('fssai') || portal.includes('foscos') || portal.includes('fssai')) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
          showBadgeBackground ? 'bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 p-1.5' : ''
        }`}
        title="FSSAI / FoSCoS"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#ffffff" />
          <circle cx="50" cy="50" r="42" stroke="#16a34a" strokeWidth="2.5" />
          {/* FSSAI Dynamic Swirls */}
          <path
            d="M26 48 C26 32 38 24 54 24 C68 24 76 34 76 44 C76 56 62 66 48 66 C32 66 26 56 26 48 Z"
            fill="#ea580c"
          />
          <path
            d="M32 48 C32 36 42 30 52 30 C64 30 70 38 70 46 C70 56 58 62 48 62 C38 62 32 56 32 48 Z"
            fill="#ffffff"
          />
          {/* Green Leaf */}
          <path
            d="M48 30 C58 30 66 38 66 48 C56 48 48 40 48 30 Z"
            fill="#16a34a"
          />
          <text x="50" y="52" textAnchor="middle" fill="#ea580c" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">
            fssai
          </text>
          <text x="50" y="80" textAnchor="middle" fill="#15803d" fontSize="7.5" fontWeight="bold">
            FoSCoS PORTAL
          </text>
        </svg>
      </div>
    )
  }

  // 7. MSME / Udyam Registration
  if (id.includes('udyam') || id.includes('msme') || portal.includes('udyam')) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
          showBadgeBackground ? 'bg-gradient-to-br from-amber-600 via-orange-600 to-blue-800 p-1.5' : ''
        }`}
        title="Ministry of MSME / Udyam"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#ffffff" />
          <circle cx="50" cy="50" r="43" stroke="#d97706" strokeWidth="2.5" />
          {/* Gear Motif */}
          <circle cx="50" cy="40" r="16" fill="#1e40af" />
          <circle cx="50" cy="40" r="7" fill="#ffffff" />
          {/* Plant Sprout Growth inside */}
          <path d="M50 40 C50 32 56 30 56 30 C56 36 52 40 50 40 Z" fill="#16a34a" />
          <path d="M50 40 C50 34 45 32 45 32 C45 37 48 40 50 40 Z" fill="#15803d" />
          <text x="50" y="70" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="900" fontFamily="sans-serif">
            UDYAM
          </text>
          <text x="50" y="82" textAnchor="middle" fill="#d97706" fontSize="8" fontWeight="bold" letterSpacing="1">
            MSME INDIA
          </text>
        </svg>
      </div>
    )
  }

  // 8. GST Portal / Goods and Services Tax
  if (id.includes('gst') || portal.includes('gst')) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
          showBadgeBackground ? 'bg-gradient-to-br from-blue-700 via-indigo-800 to-teal-800 p-1.5' : ''
        }`}
        title="GST Portal"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#ffffff" />
          {/* 3 Color Tri-Ribbon Circle */}
          <circle cx="50" cy="50" r="43" stroke="#FF9933" strokeWidth="3" />
          <circle cx="50" cy="50" r="39" stroke="#1e3a8a" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" stroke="#138808" strokeWidth="3" />
          {/* Center GST Badge */}
          <circle cx="50" cy="50" r="28" fill="#1e3a8a" />
          <text x="50" y="52" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
            GST
          </text>
          <text x="50" y="63" textAnchor="middle" fill="#38bdf8" fontSize="5" fontWeight="bold" letterSpacing="0.5">
            GOODS &amp; SERVICES TAX
          </text>
          <text x="50" y="90" textAnchor="middle" fill="#1e3a8a" fontSize="7" fontWeight="bold">
            GST.GOV.IN
          </text>
        </svg>
      </div>
    )
  }

  // 9. Tamil Nadu State / TN e-Sevai / TNeGA / Patta Chitta / TNREGINET / Certificates
  if (
    id.includes('tn-') ||
    id.includes('tnreginet') ||
    id.includes('patta') ||
    id.includes('caste') ||
    id.includes('income-certificate') ||
    portal.includes('tamil nadu') ||
    portal.includes('tnega') ||
    portal.includes('eservices.tn') ||
    portal.includes('e-sevai')
  ) {
    const isLand = id.includes('land') || id.includes('patta')
    const isReg = id.includes('reginet')
    const isCert = id.includes('caste') || id.includes('income-certificate') || id.includes('e-sevai')

    const headerLabel = isLand ? 'PATTA CHITTA' : isReg ? 'TNREGINET' : isCert ? 'TN e-SEVAI' : 'TNeGA'
    const bgGradient = isLand
      ? 'from-emerald-700 via-green-800 to-teal-900'
      : isReg
      ? 'from-rose-900 via-red-950 to-stone-900'
      : 'from-emerald-800 via-teal-900 to-slate-900'

    return (
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
          showBadgeBackground ? `bg-gradient-to-br ${bgGradient} p-1.5` : ''
        }`}
        title="Tamil Nadu Government / TNeGA"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#ffffff" />
          <circle cx="50" cy="50" r="43" stroke="#047857" strokeWidth="2.5" />
          {/* Iconic Tamil Nadu Temple Gopuram Silhouette (Srivilliputhur) */}
          <path
            d="M48 20 L52 20 L53 23 L47 23 Z M46 23 L54 23 L55 28 L45 28 Z M43 28 L57 28 L58 34 L42 34 Z M40 34 L60 34 L62 42 L38 42 Z M36 42 L64 42 L66 52 L34 52 Z M32 52 L68 52 L70 64 L30 64 Z"
            fill="#b45309"
          />
          {/* Gopuram Entrance Arch */}
          <path d="M44 64 A6 6 0 0 1 56 64 Z" fill="#ffffff" />
          <circle cx="50" cy="18" r="2.5" fill="#f59e0b" />
          {/* Tamil Nadu emblem circular laurel */}
          <path
            d="M24 50 A26 26 0 0 0 50 76 A26 26 0 0 0 76 50"
            stroke="#047857"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          {/* Text */}
          <text x="50" y="80" textAnchor="middle" fill="#065f46" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
            தமிழ்நாடு அரசு
          </text>
          <text x="50" y="89" textAnchor="middle" fill="#b45309" fontSize="6.5" fontWeight="900" letterSpacing="0.5">
            {headerLabel}
          </text>
        </svg>
      </div>
    )
  }

  // 10. Birth Certificate / Civil Registration System (CRS)
  if (id.includes('birth') || portal.includes('crs') || portal.includes('civil registration')) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
          showBadgeBackground ? 'bg-gradient-to-br from-pink-500 via-rose-600 to-teal-700 p-1.5' : ''
        }`}
        title="Civil Registration System / Birth Certificate"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#ffffff" />
          <circle cx="50" cy="50" r="43" stroke="#0f766e" strokeWidth="2.5" />
          {/* Certificate Scroll & Baby Footprint */}
          <rect x="25" y="22" width="50" height="46" rx="4" fill="#f0fdfa" stroke="#0f766e" strokeWidth="1.8" />
          <line x1="32" y1="30" x2="68" y2="30" stroke="#0f766e" strokeWidth="2" />
          <line x1="32" y1="36" x2="56" y2="36" stroke="#99f6e4" strokeWidth="1.5" />
          {/* Baby Footprint */}
          <ellipse cx="46" cy="50" rx="4" ry="7" fill="#e11d48" transform="rotate(-15 46 50)" />
          <circle cx="43" cy="40" r="1.5" fill="#e11d48" />
          <circle cx="47" cy="40" r="1.5" fill="#e11d48" />
          <circle cx="51" cy="42" r="1.3" fill="#e11d48" />
          {/* Official Stamp */}
          <circle cx="62" cy="52" r="7" stroke="#0f766e" strokeWidth="1.5" fill="#ccfbf1" strokeDasharray="2 1" />
          <text x="50" y="80" textAnchor="middle" fill="#0f766e" fontSize="7" fontWeight="bold">
            CRS INDIA
          </text>
          <text x="50" y="90" textAnchor="middle" fill="#e11d48" fontSize="6.5" fontWeight="bold">
            BIRTH RECORD
          </text>
        </svg>
      </div>
    )
  }

  // 11. Scholarship / National Scholarship Portal (NSP)
  if (id.includes('scholarship') || portal.includes('scholarship') || portal.includes('nsp')) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
          showBadgeBackground ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-500 p-1.5' : ''
        }`}
        title="National Scholarship Portal (NSP)"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#ffffff" />
          <circle cx="50" cy="50" r="43" stroke="#2563eb" strokeWidth="2.5" />
          {/* Graduation Mortarboard */}
          <polygon points="50,22 78,34 50,46 22,34" fill="#1e3a8a" />
          <polygon points="34,42 34,54 50,62 66,54 66,42 50,50" fill="#2563eb" />
          {/* Tassel */}
          <path d="M72 37 L72 52 A2 2 0 0 1 70 54" stroke="#f59e0b" strokeWidth="2" fill="none" />
          <circle cx="70" cy="54" r="2" fill="#f59e0b" />
          {/* Open Book */}
          <path d="M30 68 C40 64 48 66 50 70 C52 66 60 64 70 68 L70 76 C60 72 52 74 50 78 C48 74 40 72 30 76 Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
          <text x="50" y="89" textAnchor="middle" fill="#1e3a8a" fontSize="7.5" fontWeight="bold">
            NSP SCHOLARSHIPS
          </text>
        </svg>
      </div>
    )
  }

  // 12. Employment Registration / NCS
  if (id.includes('employment') || portal.includes('employment') || portal.includes('job')) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
          showBadgeBackground ? 'bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-900 p-1.5' : ''
        }`}
        title="Employment Exchange / Career Portal"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#ffffff" />
          <circle cx="50" cy="50" r="43" stroke="#7c3aed" strokeWidth="2.5" />
          {/* Briefcase & Career ID Badge */}
          <rect x="26" y="34" width="48" height="34" rx="5" fill="#4c1d95" />
          <path d="M40 34 L40 28 A4 4 0 0 1 44 24 L56 24 A4 4 0 0 1 60 28 L60 34" stroke="#7c3aed" strokeWidth="2.5" fill="none" />
          {/* Lock / Clip */}
          <rect x="46" y="44" width="8" height="6" rx="1.5" fill="#fbbf24" />
          <line x1="26" y1="46" x2="74" y2="46" stroke="#6d28d9" strokeWidth="1.5" />
          {/* Success Growth Arrow */}
          <path d="M60 32 L74 18 M74 18 L66 18 M74 18 L74 26" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="50" y="80" textAnchor="middle" fill="#4c1d95" fontSize="7.5" fontWeight="bold">
            EMPLOYMENT
          </text>
          <text x="50" y="89" textAnchor="middle" fill="#7c3aed" fontSize="6.5" fontWeight="bold">
            EXCHANGE
          </text>
        </svg>
      </div>
    )
  }

  // 13. National Portal of India / National Directory / Fallback
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-xs ${s} ${className} ${
        showBadgeBackground ? 'bg-gradient-to-br from-amber-500 via-orange-600 to-blue-700 p-1.5' : ''
      }`}
      title="National Portal of India"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#ffffff" />
        <circle cx="50" cy="50" r="43" stroke="#FF9933" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="40" stroke="#138808" strokeWidth="2" />
        {/* Ashoka Chakra in Center */}
        <circle cx="50" cy="46" r="16" stroke="#000080" strokeWidth="2" fill="#eff6ff" />
        <circle cx="50" cy="46" r="3" fill="#000080" />
        {/* Chakra Spokes */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="50"
            y1="46"
            x2={50 + 15 * Math.cos((deg * Math.PI) / 180)}
            y2={46 + 15 * Math.sin((deg * Math.PI) / 180)}
            stroke="#000080"
            strokeWidth="1.2"
          />
        ))}
        <text x="50" y="76" textAnchor="middle" fill="#000080" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
          INDIA.GOV.IN
        </text>
        <text x="50" y="86" textAnchor="middle" fill="#ea580c" fontSize="6.5" fontWeight="bold">
          GOVT PORTAL
        </text>
      </svg>
    </div>
  )
}
