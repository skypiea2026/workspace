import { useState } from 'react';
import { Lock, User, ChevronLeft } from 'lucide-react';
import { Language } from '../App';
import CenteredBottomActionBar from './CenteredBottomActionBar';

interface AdminLoginScreenProps {
  onLogin: () => void;
  onCancel: () => void;
  language: Language;
}

const translations = {
  en: {
    title: 'Administrator Login',
    username: 'Username',
    password: 'Password',
    usernamePlaceholder: 'Enter username',
    passwordPlaceholder: 'Enter password',
    cancel: 'Cancel',
    login: 'Login',
  },
  zh: {
    title: '管理員登入',
    username: '使用者名稱',
    password: '密碼',
    usernamePlaceholder: '輸入使用者名稱',
    passwordPlaceholder: '輸入密碼',
    cancel: '取消',
    login: '登入',
  },
  es: {
    title: 'Inicio de sesión de administrador',
    username: 'Nombre de usuario',
    password: 'Contraseña',
    usernamePlaceholder: 'Ingrese el nombre de usuario',
    passwordPlaceholder: 'Ingrese la contraseña',
    cancel: 'Cancelar',
    login: 'Iniciar sesión',
  },
};

export default function AdminLoginScreen({ onLogin, onCancel, language }: AdminLoginScreenProps) {
  const t = translations[language];
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // In real implementation, this would validate credentials
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      {/* Header with Home/Back Icon and Title */}
      <div 
        className="flex items-center border-b border-gray-200"
        style={{ paddingLeft: '112px', paddingRight: '64px', paddingTop: '32px', paddingBottom: '32px' }}
      >
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

      {/* Login Form */}
      <div className="flex-1 flex items-start justify-center px-16" style={{ paddingTop: '64px' }}>
        <div className="w-full max-w-3xl">
          {/* Logo Block - Top Center - Non-interactive */}
          <div className="flex justify-center" style={{ marginBottom: '48px' }}>
            <div 
              className="flex items-center justify-center pointer-events-none"
              style={{
                width: '200px',
                height: '200px',
                backgroundColor: '#111827',
                borderRadius: '24px',
              }}
            >
              <span 
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  userSelect: 'none',
                }}
              >
                LOGO
              </span>
            </div>
          </div>

          {/* Form Fields - space-y-8 for consistent vertical spacing */}
          <div className="space-y-8">
            {/* Username Field */}
            <div className="space-y-3">
              <label className="text-2xl text-gray-700">{t.username}</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-20 pl-20 pr-8 text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder={t.usernamePlaceholder}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label className="text-2xl text-gray-700">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-20 pl-20 pr-8 text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder={t.passwordPlaceholder}
                />
              </div>
            </div>
          </div>
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
            onClick={handleLogin}
            disabled={!username || !password}
            className={`
              rounded-lg flex items-center justify-center transition-all
              ${username && password
                ? 'bg-blue-600 text-white active:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
            style={{ width: '360px', height: '72px' }}
          >
            <span style={{ fontSize: '28px' }}>{t.login}</span>
          </button>
        }
      />
    </div>
  );
}