import React from 'react';
import { LogoLoop, type LogoItem } from './LogoLoop';

interface ServiceItemData {
  id: string;
  title: string;
  subtitle: string;
  barColor: string;
  badgeBg: string;
  icon: React.ReactNode;
  href?: string;
}

const governmentServicesList: ServiceItemData[] = [
  {
    id: 'aadhaar',
    title: 'Aadhaar',
    subtitle: 'Aadhaar Services',
    barColor: '#e11d48',
    badgeBg: 'bg-red-50/80 ring-1 ring-red-100',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#fff5f5" />
        {/* Sun rays */}
        <g stroke="#f97316" strokeWidth="2.5" strokeLinecap="round">
          <line x1="50" y1="14" x2="50" y2="20" />
          <line x1="26" y1="24" x2="31" y2="29" />
          <line x1="74" y1="24" x2="69" y2="29" />
          <line x1="16" y1="42" x2="22" y2="44" />
          <line x1="84" y1="42" x2="78" y2="44" />
          <line x1="38" y1="17" x2="41" y2="23" />
          <line x1="62" y1="17" x2="59" y2="23" />
        </g>
        {/* Fingerprint arch */}
        <path d="M50 28 A20 20 0 0 1 70 48 C70 60 60 70 50 70 C40 70 30 60 30 48 A20 20 0 0 1 50 28 Z" stroke="#e11d48" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M50 35 A13 13 0 0 1 63 48 C63 56 57 62 50 62 C43 62 37 56 37 48 A13 13 0 0 1 50 35 Z" stroke="#ea580c" strokeWidth="3" />
        <path d="M50 42 A6 6 0 0 1 56 48 C56 51 53 54 50 54 C47 54 44 51 44 48 A6 6 0 0 1 50 42 Z" fill="#e11d48" />
        <text x="50" y="85" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.6">
          AADHAAR
        </text>
      </svg>
    ),
  },
  {
    id: 'pan',
    title: 'PAN Card',
    subtitle: 'e-PAN',
    barColor: '#2563eb',
    badgeBg: 'bg-blue-50/80 ring-1 ring-blue-100',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#eff6ff" />
        {/* PAN Card Base */}
        <rect x="18" y="24" width="64" height="42" rx="6" fill="#3b82f6" />
        <text x="24" y="34" fill="#ffffff" fontSize="6.5" fontWeight="bold">PAN</text>
        {/* User avatar circle */}
        <circle cx="28" cy="46" r="5" fill="#ffffff" />
        <path d="M22 57 C22 52 25 50 28 50 C31 50 34 52 34 57 Z" fill="#ffffff" />
        {/* Chip */}
        <rect x="40" y="38" width="10" height="7" rx="1.5" fill="#fbbf24" />
        {/* Detail lines */}
        <rect x="54" y="38" width="22" height="2.5" rx="1" fill="#bfdbfe" />
        <rect x="54" y="43" width="18" height="2.5" rx="1" fill="#bfdbfe" />
        <rect x="40" y="52" width="36" height="3" rx="1" fill="#ffffff" />
        <circle cx="72" cy="33" r="3" fill="#f87171" />
      </svg>
    ),
  },
  {
    id: 'passport',
    title: 'Passport',
    subtitle: 'Seva Online',
    barColor: '#1e3a8a',
    badgeBg: 'bg-indigo-50/80 ring-1 ring-indigo-100',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#eef2ff" />
        {/* Passport Book */}
        <rect x="26" y="18" width="48" height="58" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        {/* Golden Emblem */}
        <circle cx="50" cy="38" r="10" stroke="#d4af37" strokeWidth="1.2" fill="none" />
        <path d="M46 34 L54 34 L52 42 L48 42 Z" fill="#d4af37" />
        <circle cx="50" cy="38" r="2.5" fill="#facc15" />
        <text x="50" y="52" textAnchor="middle" fill="#d4af37" fontSize="5" fontWeight="bold" letterSpacing="0.8">
          PASSPORT
        </text>
        {/* Chip symbol */}
        <rect x="44" y="60" width="12" height="5" rx="1" stroke="#d4af37" strokeWidth="1" fill="none" />
        <line x1="40" y1="62.5" x2="60" y2="62.5" stroke="#d4af37" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'voter',
    title: 'Voter ID',
    subtitle: 'EPIC / ECI',
    barColor: '#059669',
    badgeBg: 'bg-emerald-50/80 ring-1 ring-emerald-100',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#ecfdf5" />
        {/* Flag badge */}
        <g transform="rotate(45 50 50)">
          <rect x="36" y="32" width="28" height="36" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="36" y="32" width="9" height="36" fill="#ea580c" />
          <rect x="45" y="32" width="10" height="36" fill="#ffffff" />
          <rect x="55" y="32" width="9" height="36" fill="#16a34a" />
          <circle cx="50" cy="50" r="3" fill="#1e3a8a" />
        </g>
        {/* Inked finger dots */}
        <circle cx="34" cy="34" r="3" fill="#94a3b8" />
        <circle cx="44" cy="24" r="3.5" fill="#94a3b8" />
        <circle cx="54" cy="28" r="3" fill="#94a3b8" />
      </svg>
    ),
  },
  {
    id: 'driving',
    title: 'Driving Licence',
    subtitle: 'Vehicle Services',
    barColor: '#7c3aed',
    badgeBg: 'bg-purple-50/80 ring-1 ring-purple-100',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#f5f3ff" />
        {/* Licence card */}
        <rect x="18" y="24" width="64" height="42" rx="6" fill="#ffffff" stroke="#7c3aed" strokeWidth="2" />
        <rect x="18" y="24" width="64" height="11" rx="4" fill="#7c3aed" />
        {/* Person icon */}
        <circle cx="32" cy="46" r="4.5" fill="#4c1d95" />
        <path d="M25 58 C25 53 28 51 32 51 C36 51 39 53 39 58 Z" fill="#4c1d95" />
        {/* Car icon */}
        <path d="M54 53 L58 46 L70 46 L74 53 Z" fill="#6d28d9" />
        <rect x="52" y="53" width="24" height="5" rx="1.5" fill="#6d28d9" />
        <circle cx="56" cy="58" r="2.5" fill="#1e1b4b" />
        <circle cx="70" cy="58" r="2.5" fill="#1e1b4b" />
      </svg>
    ),
  },
  {
    id: 'fssai',
    title: 'FSSAI',
    subtitle: 'Food Licence Registration',
    barColor: '#ea580c',
    badgeBg: 'bg-orange-50/80 ring-1 ring-orange-100',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#fff7ed" />
        {/* Orange arch & leaf */}
        <path d="M26 44 C26 28 40 22 56 22 C70 22 76 32 76 42 C76 54 62 62 48 62 C34 62 26 52 26 44 Z" fill="#f97316" />
        <path d="M32 44 C32 34 42 28 52 28 C62 28 68 34 68 42 C68 50 58 56 48 56 C38 56 32 50 32 44 Z" fill="#ffffff" />
        <path d="M50 28 C60 28 68 36 68 46 C58 46 50 38 50 28 Z" fill="#16a34a" />
        <text x="50" y="49" textAnchor="middle" fill="#ea580c" fontSize="14" fontWeight="900" fontFamily="sans-serif">
          fssai
        </text>
        <line x1="28" y1="56" x2="72" y2="56" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'msme',
    title: 'MSME / Udyam',
    subtitle: 'Registration',
    barColor: '#0891b2',
    badgeBg: 'bg-cyan-50/80 ring-1 ring-cyan-100',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#ecfeff" />
        {/* Ashoka Pillar capital */}
        <path d="M46 16 L54 16 L52 28 L48 28 Z" fill="#1e293b" />
        <circle cx="50" cy="22" r="3" fill="#0891b2" />
        {/* MSME Banner */}
        <rect x="22" y="32" width="56" height="20" rx="3" fill="#0f172a" />
        <text x="50" y="47" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.8">
          MSME
        </text>
        <text x="50" y="60" textAnchor="middle" fill="#0891b2" fontSize="5.5" fontWeight="bold">
          MICRO, SMALL & MEDIUM ENTERPRISES
        </text>
        <text x="50" y="69" textAnchor="middle" fill="#0f172a" fontSize="6.5" fontWeight="bold">
          सूक्ष्म, लघु एवं मध्यम उद्यम
        </text>
      </svg>
    ),
  },
  {
    id: 'gst',
    title: 'GST',
    subtitle: 'Registration & Services',
    barColor: '#f59e0b',
    badgeBg: 'bg-amber-50/80 ring-1 ring-amber-100',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#fffbeb" />
        {/* Tricolor Swirl */}
        <path d="M26 36 Q 50 20 74 36" stroke="#f97316" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M30 46 Q 50 32 70 46" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M34 54 Q 50 42 66 54" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" fill="none" />
        <text x="50" y="76" textAnchor="middle" fill="#1e3a8a" fontSize="16" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
          GST
        </text>
      </svg>
    ),
  },
  {
    id: 'tn-certificates',
    title: 'Tamil Nadu',
    subtitle: 'Certificates & Services',
    barColor: '#059669',
    badgeBg: 'bg-emerald-50/80 ring-1 ring-emerald-100',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#f0fdf4" />
        {/* TN Seal Laurel Ring */}
        <circle cx="50" cy="50" r="40" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeDasharray="3 1.5" />
        {/* Srivilliputhur Gopuram Outline */}
        <path
          d="M48 20 L52 20 L53 23 L47 23 Z M46 23 L54 23 L55 28 L45 28 Z M43 28 L57 28 L58 35 L42 35 Z M40 35 L60 35 L62 44 L38 44 Z M36 44 L64 44 L66 54 L34 54 Z M32 54 L68 54 L70 66 L30 66 Z"
          fill="#ca8a04"
        />
        <path d="M44 66 A6 6 0 0 1 56 66 Z" fill="#ffffff" />
        <circle cx="50" cy="18" r="2" fill="#eab308" />
        <circle cx="50" cy="48" r="5" fill="#dc2626" />
        <text x="50" y="78" textAnchor="middle" fill="#166534" fontSize="6.5" fontWeight="bold">
          தமிழ்நாடு அரசு
        </text>
      </svg>
    ),
  },
  {
    id: 'tn-land-records',
    title: 'Tamil Nadu',
    subtitle: 'Land Records Patta-Chitta',
    barColor: '#65a30d',
    badgeBg: 'bg-lime-50/80 ring-1 ring-lime-100',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#f7fee7" />
        {/* Folded Map Shape */}
        <path d="M22 36 L38 28 L62 36 L78 28 L78 68 L62 76 L38 68 L22 76 Z" fill="#86efac" stroke="#15803d" strokeWidth="1.5" />
        <path d="M38 28 L38 68 L62 76 L62 36 Z" fill="#4ade80" />
        {/* Map Grid Lines */}
        <line x1="28" y1="52" x2="34" y2="48" stroke="#16a34a" strokeWidth="1.5" />
        <line x1="44" y1="46" x2="56" y2="52" stroke="#15803d" strokeWidth="1.5" />
        <line x1="68" y1="52" x2="74" y2="48" stroke="#16a34a" strokeWidth="1.5" />
        {/* Red Map Pin */}
        <path d="M50 20 C44 20 40 24 40 30 C40 38 50 48 50 48 C50 48 60 38 60 30 C60 24 56 20 50 20 Z" fill="#dc2626" stroke="#ffffff" strokeWidth="1.2" />
        <circle cx="50" cy="28" r="3" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: 'tn-registration',
    title: 'Tamil Nadu',
    subtitle: 'Registration Services',
    barColor: '#be123c',
    badgeBg: 'bg-rose-50/80 ring-1 ring-rose-100',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#fff1f2" />
        {/* Document Sheet */}
        <rect x="26" y="20" width="48" height="58" rx="4" fill="#ffffff" stroke="#991b1b" strokeWidth="2" />
        <line x1="34" y1="32" x2="56" y2="32" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="40" x2="66" y2="40" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="48" x2="66" y2="48" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="56" x2="54" y2="56" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        {/* Maroon Pen Writing */}
        <path d="M68 40 L76 32 C78 30 81 30 83 32 C85 34 85 37 83 39 L75 47 L66 49 Z" fill="#be123c" />
        <line x1="68" y1="40" x2="75" y2="47" stroke="#ffffff" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'national',
    title: 'National',
    subtitle: 'Government Directory',
    barColor: '#3b82f6',
    badgeBg: 'bg-blue-50/80 ring-1 ring-blue-100',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" fill="#eff6ff" />
        {/* india.gov.in swoosh */}
        <path d="M58 26 C68 26 78 34 78 46 C78 52 74 58 68 62" stroke="#f97316" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M62 34 C70 34 74 40 74 48 C74 54 70 58 64 60" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <text x="44" y="46" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900" fontFamily="sans-serif">
          india
        </text>
        <text x="44" y="60" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
          .gov.in
        </text>
      </svg>
    ),
  },
];

export function GovernmentServicesLogoLoop() {
  const logos: LogoItem[] = governmentServicesList.map((svc) => ({
    id: svc.id,
    title: svc.title,
    subtitle: svc.subtitle,
    barColor: svc.barColor,
    badgeBg: svc.badgeBg,
    node: svc.icon,
  }));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 my-6 sm:my-8">
      <div className="relative rounded-2xl border border-white/60 bg-white/45 backdrop-blur-xl shadow-xs overflow-hidden py-3 px-2 sm:px-4">
        {/* Continuous React Bits LogoLoop with compact proportionate sizing */}
        <div className="relative overflow-hidden">
          <LogoLoop
            logos={logos}
            speed={45}
            direction="left"
            gap={32}
            logoHeight={115}
            hoverSpeed={0}
            scaleOnHover
            fadeOut={false}
            ariaLabel="Government services and official portals"
            renderItem={(item) => {
              const svc = item as LogoItem & ServiceItemData;
              return (
                <div className="flex flex-col items-center justify-between w-28 sm:w-32 py-1 px-1 group cursor-pointer transition-all duration-300 select-none">
                  {/* Circular Badge */}
                  <div
                    className={`flex items-center justify-center rounded-full p-2 transition-transform duration-300 group-hover:scale-110 shadow-2xs ${svc.badgeBg}`}
                  >
                    {svc.node}
                  </div>

                  {/* Service Title */}
                  <div className="mt-2 text-center w-full px-0.5 min-h-[36px] flex flex-col justify-start">
                    <p className="text-xs font-bold text-ink leading-tight group-hover:text-brand-600 transition-colors">
                      {svc.title}
                    </p>
                    {svc.subtitle && (
                      <p className="mt-0.5 text-[10px] font-medium text-ink-soft line-clamp-2 leading-tight">
                        {svc.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Bottom Color Accent Bar */}
                  <div
                    className="mt-1.5 h-0.5 sm:h-1 w-8 sm:w-10 rounded-full transition-all duration-300 group-hover:w-12"
                    style={{ backgroundColor: svc.barColor }}
                  />
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default GovernmentServicesLogoLoop;
