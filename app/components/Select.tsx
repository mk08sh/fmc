import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  error?: string;
}

export default function Select({
  label,
  options,
  error,
  className = '',
  ...props
}: SelectProps) {
  const id = props.id || props.name;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        className={`
          block w-full rounded-md border-gray-300 shadow-sm
          focus:border-amber-500 focus:ring-amber-500
          disabled:bg-gray-50 disabled:text-gray-500
          ${error ? 'border-red-300' : ''}
          ${className}
        `}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 