import React, { FC } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSelectorProps } from './types';

export const LanguageSelector: FC<LanguageSelectorProps> = ({
  className = '',
}) => {
  const { currentLanguage, changeLanguage } = useTranslation();

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          currentLanguage === 'es'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          currentLanguage === 'en'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
    </div>
  );
};
