import { Language } from '../App';

interface SelectedUnitHeaderProps {
  unit: string;
  language: Language;
}

const translations = {
  en: {
    unitLabel: 'Unit:',
  },
  zh: {
    unitLabel: '房號：',
  },
  es: {
    unitLabel: 'Unidad:',
  },
};

export default function SelectedUnitHeader({ unit, language }: SelectedUnitHeaderProps) {
  const t = translations[language];

  return (
    <div className="flex items-center justify-center px-6 py-3">
      <span className="text-2xl text-gray-600">{t.unitLabel}</span>
      <span className="text-2xl text-gray-900 ml-2" style={{ fontWeight: 600 }}>{unit}</span>
    </div>
  );
}
