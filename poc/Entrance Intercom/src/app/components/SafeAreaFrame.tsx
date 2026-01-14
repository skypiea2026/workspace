import { ReactNode } from 'react';

interface SafeAreaFrameProps {
  children: ReactNode;
}

/**
 * SafeAreaFrame - Development frame to show the 1920×800 safe area boundary
 * 
 * Structure:
 * - Global background (html/body) uses light gray (#E5E5E5) as "out-of-bounds" indicator
 * - Safe area container (1920×800) has white background representing valid design area
 * - Horizontally centered, vertically aligned to top
 * - Overflow is visible in development to show content that spills outside the boundary
 */
export default function SafeAreaFrame({ children }: SafeAreaFrameProps) {
  return (
    <div 
      className="min-h-screen w-full flex justify-center"
      style={{ 
        backgroundColor: '#E5E5E5', // Out-of-bounds background
        paddingTop: '0px', // Align to top
      }}
    >
      {/* Safe Area Container - 1920×800 */}
      <div
        className="bg-white relative"
        style={{
          width: '1920px',
          height: '800px',
          boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)', // Optional 2px stroke to show boundary
          overflow: 'visible', // Allow overflow to be visible for development
        }}
      >
        {children}
      </div>
    </div>
  );
}
