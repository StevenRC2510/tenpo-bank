import { FC } from 'react';
import { Gamepad2 } from 'lucide-react';
import { useTranslation } from 'shared';

export const LoginFooter: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-transparent backdrop-blur-sm text-gray-500 font-medium">
            {t('form.noAccount')}
          </span>
        </div>
      </div>

      <button className="mt-6 w-full flex justify-center items-center py-3 px-4 border-2 border-gray-800 rounded-xl shadow-lg bg-gray-800 hover:bg-black text-sm font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
        <Gamepad2 className="mr-2 w-4 h-4" />
        {t('form.createAccount')}
      </button>
    </div>
  );
};
