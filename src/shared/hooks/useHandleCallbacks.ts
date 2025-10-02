import { useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';

export type CallbacksProps<TResult, TError = unknown> = {
  onSuccess?: (data: TResult) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: TResult | undefined, error: TError | null) => void;
};

export const useHandleCallbacks = <T extends UseQueryResult>(
  query: T,
  callbacks: CallbacksProps<T['data'], T['error']>
) => {
  const { isError, isSuccess } = query;
  const { onError, onSettled, onSuccess } = callbacks;

  useEffect(() => {
    if (isSuccess) onSuccess?.(query.data);
    if (isError) onError?.(query.error);
    if (isSuccess || isError) onSettled?.(query.data, query.error);
  }, [
    isSuccess,
    isError,
    query.data,
    query.error,
    onSuccess,
    onError,
    onSettled,
  ]);
};
