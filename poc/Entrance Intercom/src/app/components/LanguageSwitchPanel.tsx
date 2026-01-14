import { X, Check } from 'lucide-react';
import { Language } from '../App';

interface LanguageSwitchPanelProps {
  currentLanguage: Language;
  onLanguageSelect: (language: Language) => void;
  onClose: () => void;
}

const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Traditional Chinese', nativeName: '繁體中文' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
];

export default function LanguageSwitchPanel({
  currentLanguage,
  onLanguageSelect,
  onClose,
}: LanguageSwitchPanelProps) {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="w-full max-w-4xl bg-white rounded-t-3xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-12 py-8 border-b border-gray-200">
          <h2 className="text-3xl text-gray-900">Select Language</h2>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            <X className="w-8 h-8 text-gray-600" />
          </button>
        </div>

        {/* Language List */}
        <div className="px-12 py-8">
          {languages.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onLanguageSelect(lang.code)}
                className={`w-full flex items-center justify-between px-8 py-6 mb-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white active:border-blue-400'
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="text-2xl text-gray-900">{lang.nativeName}</span>
                  <span className="text-lg text-gray-500">{lang.name}</span>
                </div>
                {isSelected && <Check className="w-8 h-8 text-blue-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}