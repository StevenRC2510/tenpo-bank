import { FC, useEffect } from 'react';
import { useNetworkStatus } from 'shared/hooks/useNetworkStatus';
import { useToast } from 'shared/hooks/useToast';

export const NetworkStatus: FC = () => {
  const { isOnline, isOffline } = useNetworkStatus();
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    if (isOffline) {
      showError(
        'You are currently offline. Some features may not work properly.'
      );
    } else if (isOnline) {
      const wasOffline = sessionStorage.getItem('wasOffline') === 'true';
      if (wasOffline) {
        showSuccess('Connection restored! You are back online.');
        sessionStorage.removeItem('wasOffline');
      }
    }
  }, [isOnline, isOffline, showError, showSuccess]);

  useEffect(() => {
    if (isOffline) {
      sessionStorage.setItem('wasOffline', 'true');
    }
  }, [isOffline]);

  return null;
};
