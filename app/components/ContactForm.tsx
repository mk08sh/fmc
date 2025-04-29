import React, { useState } from 'react';
import { contactFields, type QuizFormData } from '../lib/quizData';

interface ContactFormProps {
  formData: Partial<QuizFormData>;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string) => void;
  submitButtonText?: string;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function ContactForm({ 
  formData, 
  onSubmit, 
  onChange,
  submitButtonText = "Submit"
}: ContactFormProps) {
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleChange = (field: string, value: string) => {
    onChange(field, value);
    // Clear email error when user starts typing
    if (field === 'email') {
      setEmailError('');
    }
  };

  const handleBlur = (field: string, value: string) => {
    if (field === 'email') {
      setEmailError(validateEmail(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailValidation = validateEmail(formData.email || '');
    if (emailValidation) {
      setEmailError(emailValidation);
      return;
    }
    onSubmit(e);
  };

  const isFormValid = contactFields.fields
    .filter(field => field.required)
    .every(field => formData[field.id as keyof QuizFormData]) && !emailError;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {contactFields.fields.map((field) => (
        <div key={field.id} className="flex flex-col space-y-1">
          <div className="flex items-center space-x-1">
            <label
              htmlFor={field.id}
              className="text-sm font-medium text-gray-700 text-left"
            >
              {field.label}
            </label>
            {field.required && <span className="text-red-500">*</span>}
          </div>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            required={field.required}
            placeholder={field.placeholder}
            value={(formData[field.id as keyof QuizFormData] as string) ?? ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            onBlur={(e) => handleBlur(field.id, e.target.value)}
            className={`block w-full rounded-md shadow-sm sm:text-sm
              ${field.id === 'email' && emailError 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500'
              }`}
            aria-invalid={field.id === 'email' && emailError ? 'true' : 'false'}
            aria-describedby={field.id === 'email' && emailError ? 'email-error' : undefined}
          />
          {field.id === 'email' && emailError && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {emailError}
            </p>
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm mt-6
          ${isFormValid 
            ? 'bg-amber-600 hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600' 
            : 'bg-gray-300 cursor-not-allowed'}`}
      >
        {submitButtonText}
      </button>
    </form>
  );
} 