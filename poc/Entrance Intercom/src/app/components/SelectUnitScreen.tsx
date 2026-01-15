import { Building, ChevronLeft, Check } from 'lucide-react';
import { Language } from '../App';
import CenteredBottomActionBar from './CenteredBottomActionBar';

interface SelectUnitScreenProps {
  onUnitSelect: (unit: string) => void;
  selectedUnit: string | null;
  onConfirm: () => void;
  onBack: () => void;
  language: Language;
  isExiting?: boolean;
}

const translations = {
  en: {
    title: 'Select Unit',
    management: 'Management Center',
    confirm: 'Confirm',
    back: 'Back',
  },
  zh: {
    title: '選擇戶號',
    management: '管理中心',
    confirm: '確認',
    back: '返回',
  },
  es: {
    title: 'Seleccionar Unidad',
    management: 'Centro de Gestión',
    confirm: 'Confirmar',
    back: 'Volver',
  },
};

// Mock unit data - privacy compliant (unit numbers only)
const units = [
  'Management Center',
  'A-101', 'A-102', 'A-103', 'A-104', 'A-105', 'A-106',
  'A-201', 'A-202', 'A-203', 'A-204', 'A-205', 'A-206',
  'B-101', 'B-102', 'B-103', 'B-104', 'B-105', 'B-106',
  'B-201', 'B-202', 'B-203', 'B-204', 'B-205', 'B-206',
  'C-101', 'C-102', 'C-103', 'C-104', 'C-105', 'C-106',
  'C-201', 'C-202', 'C-203', 'C-204', 'C-205', 'C-206',
];

export default function SelectUnitScreen({
  onUnitSelect,
  selectedUnit,
  onConfirm,
  onBack,
  language,
  isExiting,
}: SelectUnitScreenProps) {
  const t = translations[language];

  return (
    <div className={`w-full h-full flex flex-col bg-white relative ${isExiting ? 'screen-exit' : ''}`}>
      {/* Header - 3-column layout to prevent GlobalLogo overlap */}
      <div 
        className="flex items-center border-b border-gray-200 flex-shrink-0"
        style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '32px', paddingBottom: '32px' }}
      >
        {/* Left: Spacer for GlobalLogo (64px) + gap (16px) */}
        <div style={{ width: '80px', flexShrink: 0 }} />
        
        {/* Center: Title */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-4xl text-gray-900">{t.title}</h1>
        </div>
        
        {/* Right: Spacer for symmetry */}
        <div style={{ width: '80px', flexShrink: 0 }} />
      </div>

      {/* Content - Fills space between header and bottom bar, scrollable if needed */}
      <div 
        className="flex-1 overflow-y-auto"
        style={{ paddingLeft: '64px', paddingRight: '64px', paddingTop: '32px', paddingBottom: '32px' }}
      >
        <div className="grid grid-cols-6 gap-6 pb-20">
          {units.map((unit) => {
            const isSelected = selectedUnit === unit;
            const isManagement = unit === 'Management Center';
            
            return (
              <button
                key={unit}
                onClick={() => onUnitSelect(unit)}
                className={`
                  h-32 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all relative
                  ${isSelected 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 bg-gray-50 active:border-blue-400'
                  }
                  ${isManagement ? 'col-span-2' : ''}
                `}
              >
                {isManagement && <Building className="w-8 h-8 text-gray-700" />}
                <span className={`text-2xl ${isManagement ? 'text-gray-900' : 'text-gray-800'}`}>
                  {isManagement ? t.management : unit}
                </span>
                {isSelected && (
                  <Check className="w-6 h-6 text-blue-600 absolute top-2 right-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Centered Bottom Action Bar — NON-SESSION: 96px height, 360×72 buttons, 28px font, 24px gap */}
      <CenteredBottomActionBar
        secondaryButton={
          <button
            onClick={onBack}
            className="rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center gap-3 active:bg-gray-50 transition-colors"
            style={{ width: '360px', height: '72px' }}
          >
            <ChevronLeft style={{ width: '28px', height: '28px' }} className="text-gray-700" />
            <span className="text-gray-900" style={{ fontSize: '28px' }}>{t.back}</span>
          </button>
        }
        primaryButton={
          <button
            onClick={onConfirm}
            disabled={!selectedUnit}
            className={`
              rounded-lg flex items-center justify-center transition-all
              ${selectedUnit 
                ? 'bg-blue-600 text-white active:bg-blue-700' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
            style={{ width: '360px', height: '72px' }}
          >
            <span style={{ fontSize: '28px' }}>{t.confirm}</span>
          </button>
        }
      />
    </div>
  );
}