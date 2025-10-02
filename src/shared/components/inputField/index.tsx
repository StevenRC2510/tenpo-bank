import React from 'react';
import { InputFieldProps } from './types';

export const inputField: React.FC<InputFieldProps> = ({
  label,
  error,
  size = 'md',
  className = '',
  ...inputProps
}) => {
  const fieldId = `field-${inputProps.name || 'input'}`;
  const errorId = `error-${inputProps.name || 'input'}`;

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {inputProps.required && <span className="text-error-500 ml-1">*</span>}
      </label>

      <input
        id={fieldId}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        className={`
          block w-full border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          transition-colors duration-200
          ${sizeClasses[size]}
          ${
            error
              ? 'border-error-300 text-error-900 placeholder-error-300'
              : 'border-gray-300 text-gray-900 placeholder-gray-400'
          }
        `}
        {...inputProps}
      />

      {error && (
        <p id={errorId} className="text-sm text-error-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
