import { FC } from 'react';
import { LanguageSelector, useTranslation } from 'shared';

export const LoginHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>
      <div className="mx-auto w-full max-w-md">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('app.title')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 font-medium">
            {t('app.subtitle')}
          </p>
        </div>
      </div>
    </>
  );
};
