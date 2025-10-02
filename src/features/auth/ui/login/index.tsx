import { FC } from 'react';
import {
  LoginHeader,
  LoginForm,
  LoginFooter,
} from 'features/auth/ui/login/components';

export const Login: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-8 px-4 sm:py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-20 right-8 sm:top-32 sm:right-16 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-16 left-8 sm:bottom-20 sm:left-20 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-2000"></div>
      <div className="absolute bottom-24 right-4 sm:bottom-32 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-pulse delay-3000"></div>

      <LoginHeader />

      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-md relative z-10">
        <LoginForm />
        <LoginFooter />
      </div>
    </div>
  );
};
