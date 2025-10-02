import { FC } from 'react';
import { InputField, Button, useTranslation } from 'shared';
import { useLoginForm } from 'features/auth/ui/hooks/useLoginForm';

export const LoginForm: FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    handleFormSubmit,
    isLoading,
  } = useLoginForm();

  return (
    <form
      className="space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <InputField
        label={t('form.email')}
        type="email"
        placeholder={t('form.emailPlaceholder')}
        required
        error={errors.email?.message}
        {...register('email')}
      />

      <InputField
        label={t('form.password')}
        type="password"
        placeholder={t('form.passwordPlaceholder')}
        required
        error={errors.password?.message}
        {...register('password')}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            {t('form.rememberMe')}
          </label>
        </div>

        <span className="text-sm font-medium text-primary-600 hover:text-primary-500 cursor-pointer">
          {t('form.forgotPassword')}
        </span>
      </div>

      <div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!isValid}
          loading={isLoading}
          className="w-full"
        >
          {isLoading ? t('form.loginButtonLoading') : t('form.loginButton')}
        </Button>
      </div>
    </form>
  );
};
