import { useState, useEffect } from 'react';

interface NetworkConnection {
  effectiveType?: string;
  type?: string;
  addEventListener: (event: string, handler: () => void) => void;
  removeEventListener: (event: string, handler: () => void) => void;
}

interface NetworkStatus {
  isOnline: boolean;
  isOffline: boolean;
  connectionType?: string;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    isOffline: !navigator.onLine,
  });

  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus({
        isOnline: true,
        isOffline: false,
        connectionType: 'online',
      });
    };

    const handleOffline = () => {
      setNetworkStatus({
        isOnline: false,
        isOffline: true,
        connectionType: 'offline',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if ('connection' in navigator) {
      const connection = (
        navigator as unknown as { connection: NetworkConnection }
      ).connection;
      if (connection) {
        setNetworkStatus(prev => ({
          ...prev,
          connectionType: connection.effectiveType || connection.type,
        }));

        const handleConnectionChange = () => {
          setNetworkStatus(prev => ({
            ...prev,
            connectionType: connection.effectiveType || connection.type,
          }));
        };

        connection.addEventListener('change', handleConnectionChange);

        return () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
          connection.removeEventListener('change', handleConnectionChange);
        };
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return networkStatus;
};
