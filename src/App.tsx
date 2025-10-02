import { AuthProvider, ErrorBoundary, ToastProvider } from 'shared';
import { NetworkStatus } from 'shared/components/NetworkStatus';
import { AppRouter } from 'routes';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRouter />
        <ToastProvider />
        <NetworkStatus />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
