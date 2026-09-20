interface CivicFlowLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export function CivicFlowLogo({
  size = 'md',
  showText = true,
  className = '',
}: CivicFlowLogoProps) {
  const sizeMap = {
    sm: { img: 'w-8 h-8', text: 'text-base' },
    md: { img: 'w-10 h-10', text: 'text-lg sm:text-xl' },
    lg: { img: 'w-14 h-14', text: 'text-2xl' },
    xl: { img: 'w-20 h-20', text: 'text-3xl' },
  };

  const { img, text } = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Enhanced Circular Logo Emblem */}
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:scale-105 ${img}`}
      >
        <img
          src="/civicflow-logo.jpeg"
          alt="CivicFlow Logo"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Subtle glass reflection overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/40" />
      </div>

      {/* Indian Flag (Tiranga) Colored Brand Typography */}
      {showText && (
        <span className={`font-display font-black tracking-tight leading-none ${text}`}>
          <span className="text-[#FF671F]">Civic</span>
          <span className="text-[#046A38]">Flow</span>
        </span>
      )}
    </div>
  );
}

export default CivicFlowLogo;
