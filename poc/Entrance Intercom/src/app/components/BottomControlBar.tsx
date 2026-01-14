import { ReactNode } from 'react';

/**
 * BOTTOM CONTROL BAR — SESSION (PERSISTENT)
 * 
 * CRITICAL: EXACTLY 84px height, part of flex layout (NOT absolutely positioned)
 * Purpose: Intercom session, Voice Message session
 * 
 * CONSTRAINTS:
 * - Height: EXACTLY 84px (enforced via inline style)
 * - Padding: 24px horizontal, 10px vertical
 * - Button height: 64px
 * - Always visible during session, never disappears
 * - Part of flex column layout, occupies its own space
 */

interface BottomControlBarProps {
  children: ReactNode;
}

export default function BottomControlBar({ children }: BottomControlBarProps) {
  return (
    <div 
      className="w-full bg-white border-t border-gray-200 flex-shrink-0"
      style={{ height: '84px' }}
    >
      <div 
        className="h-full flex items-center justify-center"
        style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '10px', paddingBottom: '10px' }}
      >
        {children}
      </div>
    </div>
  );
}