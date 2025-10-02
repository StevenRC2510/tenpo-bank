import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useTranslation } from 'shared';
import {
  createLoginSchema,
  LoginFormData,
} from 'features/auth/domain/validation.schemas';
import { UseLoginFormReturn } from 'features/auth/ui/login/types';
import { useLogin } from 'features/auth/infrastructure/auth.queries';

export const useLoginForm = (): UseLoginFormReturn => {
  const { t } = useTranslation();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(createLoginSchema(t)),
    mode: 'onChange',
  });

  const handleFormSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    handleFormSubmit,
    isLoading: loginMutation.isPending,
  };
};
