import { Language } from '../App';

interface GlobalLogoProps {
  onClick: () => void;
  isAdminMode?: boolean;
}

export default function GlobalLogo({ onClick, isAdminMode = false }: GlobalLogoProps) {
  return (
    <button
      onClick={onClick}
      className="absolute z-50 group touch-manipulation flex items-center justify-center rounded-lg hover:bg-white/80 active:bg-white/90 transition-colors"
      style={{ 
        top: '24px', 
        left: '24px',
        width: '64px',
        height: '64px'
      }}
      aria-label={isAdminMode ? "Setup mode" : "Return to home"}
    >
      {isAdminMode ? (
        // Gear icon for admin/setup mode - 56×56
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-opacity group-active:opacity-60"
        >
          <path
            d="M28 20.3C23.7473 20.3 20.3 23.7473 20.3 28C20.3 32.2527 23.7473 35.7 28 35.7C32.2527 35.7 35.7 32.2527 35.7 28C35.7 23.7473 32.2527 20.3 28 20.3Z"
            stroke="#4A5568"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M24.5 11.9L25.48 15.82C26.32 16.1 27.16 16.52 27.86 17.02L31.5 15.12L35 19.88L32.06 22.82C32.2 23.66 32.2 23.94 32.2 24.5C32.2 25.06 32.2 25.34 32.06 26.18L35 29.12L31.5 33.88L27.86 31.98C27.16 32.48 26.32 32.9 25.48 33.18L24.5 37.1H20.3L19.32 33.18C18.48 32.9 17.64 32.48 16.94 31.98L13.3 33.88L9.8 29.12L12.74 26.18C12.6 25.34 12.6 25.06 12.6 24.5C12.6 23.94 12.6 23.66 12.74 22.82L9.8 19.88L13.3 15.12L16.94 17.02C17.64 16.52 18.48 16.1 19.32 15.82L20.3 11.9H24.5Z"
            stroke="#4A5568"
            strokeWidth="2"
            fill="none"
            transform="translate(5.6, 2.8)"
          />
        </svg>
      ) : (
        // Building/door icon for visitor mode - 56×56
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-opacity group-active:opacity-60"
        >
          <rect
            x="16.8"
            y="11.2"
            width="22.4"
            height="33.6"
            rx="1.4"
            stroke="#4A5568"
            strokeWidth="2"
            fill="none"
          />
          <rect
            x="22.4"
            y="28"
            width="11.2"
            height="16.8"
            fill="#4A5568"
            opacity="0.3"
          />
          <circle
            cx="30.8"
            cy="33.6"
            r="1.4"
            fill="#4A5568"
          />
          <line
            x1="16.8"
            y1="22.4"
            x2="39.2"
            y2="22.4"
            stroke="#4A5568"
            strokeWidth="2"
          />
        </svg>
      )}
    </button>
  );
}