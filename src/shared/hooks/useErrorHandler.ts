import { useCallback } from 'react';

interface ErrorHandlerOptions {
  fallbackMessage?: string;
}

export const useErrorHandler = () => {
  const handleError = useCallback(
    (error: unknown, options: ErrorHandlerOptions = {}) => {
      const { fallbackMessage = 'An unexpected error occurred' } = options;

      let errorMessage = fallbackMessage;

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      }

      return errorMessage;
    },
    []
  );

  return { handleError };
};
