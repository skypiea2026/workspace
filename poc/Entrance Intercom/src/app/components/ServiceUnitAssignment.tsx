import { useState } from 'react';
import { Building, Check, ChevronLeft } from 'lucide-react';
import { Language } from '../App';
import CenteredBottomActionBar from './CenteredBottomActionBar';

interface ServiceUnitAssignmentProps {
  onSave: () => void;
  onCancel: () => void;
  language: Language;
}

// Mock unit data - privacy compliant (unit numbers only)
const availableUnits = [
  'Management Center',
  'A-101', 'A-102', 'A-103', 'A-104', 'A-105', 'A-106',
  'A-201', 'A-202', 'A-203', 'A-204', 'A-205', 'A-206',
  'B-101', 'B-102', 'B-103', 'B-104', 'B-105', 'B-106',
  'B-201', 'B-202', 'B-203', 'B-204', 'B-205', 'B-206',
  'C-101', 'C-102', 'C-103', 'C-104', 'C-105', 'C-106',
  'C-201', 'C-202', 'C-203', 'C-204', 'C-205', 'C-206',
];

const translations = {
  en: {
    title: 'Service Unit Assignment',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    infoMessage: 'Select which units this door station can serve. Only unit numbers are displayed for privacy compliance.',
    unitsSelected: (count: number) => `${count} unit${count !== 1 ? 's' : ''} selected`,
    cancel: 'Cancel',
    save: 'Save',
  },
  zh: {
    title: '服務單元指派',
    selectAll: '全選',
    deselectAll: '全部取消',
    infoMessage: '設定本裝置可服務的單元。為符合隱私規範，僅顯示單元編號。',
    unitsSelected: (count: number) => `已選擇 ${count} 個單元`,
    cancel: '取消',
    save: '儲存',
  },
  es: {
    title: 'Asignación de unidades de servicio',
    selectAll: 'Seleccionar todo',
    deselectAll: 'Deseleccionar todo',
    infoMessage: 'Seleccione qué unidades puede servir esta estación de puerta. Solo se muestran los números de unidad para cumplir con las normas de privacidad.',
    unitsSelected: (count: number) => `${count} unidad${count !== 1 ? 'es' : ''} seleccionada${count !== 1 ? 's' : ''}`,
    cancel: 'Cancelar',
    save: 'Guardar',
  },
};

export default function ServiceUnitAssignment({ onSave, onCancel, language }: ServiceUnitAssignmentProps) {
  const t = translations[language];
  const [selectedUnits, setSelectedUnits] = useState<Set<string>>(
    new Set(['Management Center', 'A-101', 'A-102', 'A-103', 'B-101', 'B-102'])
  );

  const toggleUnit = (unit: string) => {
    const newSelection = new Set(selectedUnits);
    if (newSelection.has(unit)) {
      newSelection.delete(unit);
    } else {
      newSelection.add(unit);
    }
    setSelectedUnits(newSelection);
  };

  const selectAll = () => {
    setSelectedUnits(new Set(availableUnits));
  };

  const deselectAll = () => {
    setSelectedUnits(new Set());
  };

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      {/* Header with Home/Back Icon and Title */}
      <div 
        className="flex items-center justify-between border-b border-gray-200 flex-shrink-0"
        style={{ paddingLeft: '112px', paddingRight: '64px', paddingTop: '32px', paddingBottom: '32px' }}
      >
        <div className="flex items-center">
          {/* Home/Back Icon Button - 48×48 hit area, 36×36 icon */}
          <button
            onClick={onCancel}
            className="flex items-center justify-center rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0"
            style={{ width: '48px', height: '48px' }}
          >
            <ChevronLeft className="text-gray-600" style={{ width: '36px', height: '36px' }} />
          </button>
          
          {/* Title - Aligned horizontally with icon */}
          <h1 className="text-4xl text-gray-900" style={{ marginLeft: '16px' }}>
            {t.title}
          </h1>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={selectAll}
            className="rounded-lg border-2 border-gray-300 bg-white active:bg-gray-50 transition-colors"
            style={{ height: '64px', paddingLeft: '32px', paddingRight: '32px' }}
          >
            <span className="text-xl text-gray-900">{t.selectAll}</span>
          </button>
          <button
            onClick={deselectAll}
            className="rounded-lg border-2 border-gray-300 bg-white active:bg-gray-50 transition-colors"
            style={{ height: '64px', paddingLeft: '32px', paddingRight: '32px' }}
          >
            <span className="text-xl text-gray-900">{t.deselectAll}</span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div 
        className="bg-blue-50 border-b border-blue-200 flex-shrink-0"
        style={{ paddingLeft: '64px', paddingRight: '64px', paddingTop: '24px', paddingBottom: '24px' }}
      >
        <p className="text-xl text-blue-900">
          {t.infoMessage}
        </p>
      </div>

      {/* Unit Grid - Scrollable */}
      <div 
        className="flex-1 overflow-y-auto"
        style={{ paddingLeft: '64px', paddingRight: '64px', paddingTop: '32px', paddingBottom: '32px' }}
      >
        <div className="grid grid-cols-6 gap-6">
          {availableUnits.map((unit) => {
            const isSelected = selectedUnits.has(unit);
            const isManagement = unit === 'Management Center';

            return (
              <button
                key={unit}
                onClick={() => toggleUnit(unit)}
                className={`
                  relative h-32 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all
                  ${isSelected 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 bg-gray-50 active:border-blue-400'
                  }
                  ${isManagement ? 'col-span-2' : ''}
                `}
              >
                {isManagement && <Building className="w-7 h-7 text-gray-700" />}
                <span className={`text-xl ${isManagement ? 'text-gray-900' : 'text-gray-800'}`}>
                  {unit}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Selection Count - Inside scrollable area at bottom */}
        <div 
          className="mt-8 bg-gray-50 border border-gray-200 rounded-lg"
          style={{ padding: '16px' }}
        >
          <p className="text-xl text-gray-700">
            {t.unitsSelected(selectedUnits.size)}
          </p>
        </div>
      </div>

      {/* Centered Bottom Action Bar — NON-SESSION: 96px height, 360×72 buttons, 28px font, 24px gap */}
      <CenteredBottomActionBar
        secondaryButton={
          <button
            onClick={onCancel}
            className="rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center active:bg-gray-50 transition-colors"
            style={{ width: '360px', height: '72px' }}
          >
            <span className="text-gray-900" style={{ fontSize: '28px' }}>{t.cancel}</span>
          </button>
        }
        primaryButton={
          <button
            onClick={onSave}
            disabled={selectedUnits.size === 0}
            className={`
              rounded-lg flex items-center justify-center transition-all
              ${selectedUnits.size > 0
                ? 'bg-blue-600 text-white active:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
            style={{ width: '360px', height: '72px' }}
          >
            <span style={{ fontSize: '28px' }}>{t.save}</span>
          </button>
        }
      />
    </div>
  );
}