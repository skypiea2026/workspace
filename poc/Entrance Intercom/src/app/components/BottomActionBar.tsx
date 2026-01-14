import { ReactNode } from 'react';

/**
 * BOTTOM ACTION BAR — COMPACT (PINNED)
 *
 * Purpose: Back/Confirm, Cancel/Save on non-session pages
 *
 * CONSTRAINTS (UPDATED):
 * - Height: EXACTLY 72px
 * - Positioning: part of flex column layout (NOT absolute)
 * - Padding: 24px horizontal, 12px vertical
 * - Recommended Button height: 48px
 * - Never scrolls, never grows
 */

interface BottomActionBarProps {
  leftButton?: ReactNode;
  rightButton?: ReactNode;
}

export default function BottomActionBar({ leftButton, rightButton }: BottomActionBarProps) {
  return (
    <div 
      className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10"
      style={{ height: '72px' }}
    >
      <div 
        className="h-full flex items-center justify-between"
        style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '12px', paddingBottom: '12px' }}
      >
        <div className="flex-shrink-0">
          {leftButton}
        </div>
        <div className="flex-shrink-0">
          {rightButton}
        </div>
      </div>
    </div>
  );
}