export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* 3-spoke asterisk — horizontal + two diagonals */}
      <line x1="6" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="11.3" y1="7" x2="20.7" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20.7" y1="7" x2="11.3" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
