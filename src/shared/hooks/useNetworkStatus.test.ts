import { renderHook, act } from '@testing-library/react';
import { useNetworkStatus } from './useNetworkStatus';

const mockNavigator = {
  onLine: true,
};

Object.defineProperty(window, 'navigator', {
  value: mockNavigator,
  writable: true,
});

describe('useNetworkStatus', () => {
  beforeEach(() => {
    mockNavigator.onLine = true;
    jest.clearAllMocks();
  });

  it('should return online status initially', () => {
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.isOnline).toBe(true);
    expect(result.current.isOffline).toBe(false);
  });

  it('should update status when going offline', () => {
    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      mockNavigator.onLine = false;
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current.isOnline).toBe(false);
    expect(result.current.isOffline).toBe(true);
  });

  it('should update status when going online', () => {
    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      mockNavigator.onLine = false;
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current.isOffline).toBe(true);

    act(() => {
      mockNavigator.onLine = true;
      window.dispatchEvent(new Event('online'));
    });

    expect(result.current.isOnline).toBe(true);
    expect(result.current.isOffline).toBe(false);
  });

  it('should handle connection type if available', () => {
    const mockConnection = {
      effectiveType: '4g',
      type: 'cellular',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    Object.defineProperty(window.navigator, 'connection', {
      value: mockConnection,
      writable: true,
    });

    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.connectionType).toBe('4g');
  });
});
