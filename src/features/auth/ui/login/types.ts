import {
  FieldErrors,
  UseFormRegister,
  UseFormHandleSubmit,
} from 'react-hook-form';

import { LoginFormData } from 'features/auth/domain/validation.schemas';

export interface UseLoginFormReturn {
  register: UseFormRegister<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isValid: boolean;
  handleFormSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
}
