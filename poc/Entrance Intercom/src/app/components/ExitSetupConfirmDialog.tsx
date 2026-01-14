interface ExitSetupConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  language: 'en' | 'zh' | 'es';
}

export default function ExitSetupConfirmDialog({ 
  onConfirm, 
  onCancel,
  language 
}: ExitSetupConfirmDialogProps) {
  const translations = {
    en: {
      title: 'Exit setup mode?',
      message: 'You will return to the public visitor interface.',
      confirm: 'Exit',
      cancel: 'Stay in Setup'
    },
    zh: {
      title: '退出設定模式？',
      message: '您將返回公開訪客介面。',
      confirm: '退出',
      cancel: '留在設定'
    },
    es: {
      title: '¿Salir del modo de configuración?',
      message: 'Regresará a la interfaz pública de visitantes.',
      confirm: 'Salir',
      cancel: 'Permanecer en configuración'
    }
  };

  const t = translations[language];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-[480px] p-8">
        <h3 className="text-xl font-medium text-gray-900 mb-3">
          {t.title}
        </h3>
        <p className="text-gray-600 mb-8">
          {t.message}
        </p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors touch-manipulation"
          >
            {t.cancel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-4 bg-[#5B7C99] text-white rounded-lg font-medium hover:bg-[#4a6578] active:bg-[#3d5463] transition-colors touch-manipulation"
          >
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}
