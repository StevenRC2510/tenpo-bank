import { renderHook, act } from '@testing-library/react';
import { useToast } from './useToast';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  },
}));

describe('useToast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide all toast methods', () => {
    const { result } = renderHook(() => useToast());

    expect(result.current.showSuccess).toBeDefined();
    expect(result.current.showError).toBeDefined();
    expect(result.current.showLoading).toBeDefined();
    expect(result.current.showInfo).toBeDefined();
    expect(result.current.showWarning).toBeDefined();
    expect(result.current.dismiss).toBeDefined();
    expect(result.current.updateToast).toBeDefined();
  });

  it('should call toast.success when showSuccess is called', () => {
    const { result } = renderHook(() => useToast());
    const toast = require('react-hot-toast').default;

    act(() => {
      result.current.showSuccess('Success message');
    });

    expect(toast.success).toHaveBeenCalledWith('Success message');
  });

  it('should call toast.error when showError is called', () => {
    const { result } = renderHook(() => useToast());
    const toast = require('react-hot-toast').default;

    act(() => {
      result.current.showError('Error message');
    });

    expect(toast.error).toHaveBeenCalledWith('Error message');
  });

  it('should call toast.loading when showLoading is called', () => {
    const { result } = renderHook(() => useToast());
    const toast = require('react-hot-toast').default;

    act(() => {
      result.current.showLoading('Loading message');
    });

    expect(toast.loading).toHaveBeenCalledWith('Loading message');
  });

  it('should call toast.dismiss when dismiss is called', () => {
    const { result } = renderHook(() => useToast());
    const toast = require('react-hot-toast').default;

    act(() => {
      result.current.dismiss('toast-id');
    });

    expect(toast.dismiss).toHaveBeenCalledWith('toast-id');
  });
});
