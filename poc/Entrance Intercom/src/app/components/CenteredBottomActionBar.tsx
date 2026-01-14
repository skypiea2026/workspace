import { ReactNode } from 'react';

/**
 * CENTERED BOTTOM ACTION BAR — NON-SESSION SCREENS ONLY
 *
 * Purpose: Centered action buttons for non-session pages
 *
 * HARD CONSTRAINTS:
 * - Height: EXACTLY 96px
 * - Positioning: absolute bottom (pinned, never scrolls)
 * - Padding: 24px horizontal, 12px top/bottom
 * - Button size: EXACTLY 360×72px
 * - Font size: EXACTLY 28px
 * - Icon size (if present): EXACTLY 28×28px
 * - Gap between buttons (two-button layout): EXACTLY 24px
 * - Buttons are centered horizontally
 * - NO spacer/empty layers/reserved footer space
 * - DO NOT allow grow/fill/min-height > 96px
 */

interface CenteredBottomActionBarProps {
  /** Secondary button (left position) - e.g., Back, Cancel */
  secondaryButton?: ReactNode;
  /** Primary button (right position) - e.g., Confirm, Save, Continue */
  primaryButton?: ReactNode;
}

export default function CenteredBottomActionBar({ 
  secondaryButton, 
  primaryButton 
}: CenteredBottomActionBarProps) {
  // Determine if we have one or two buttons
  const hasBothButtons = secondaryButton && primaryButton;
  const hasSingleButton = !secondaryButton || !primaryButton;

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 flex items-center justify-center"
      style={{ height: '96px', paddingLeft: '24px', paddingRight: '24px', paddingTop: '12px', paddingBottom: '12px' }}
    >
      {hasBothButtons ? (
        // Two-button layout: Secondary (left) + Primary (right) with 24px gap
        <div className="flex items-center" style={{ gap: '24px' }}>
          {secondaryButton}
          {primaryButton}
        </div>
      ) : (
        // Single-button layout: Centered
        <div>
          {secondaryButton || primaryButton}
        </div>
      )}
    </div>
  );
}
