import React from 'react';
import { contactFields, type QuizFormData } from '../lib/quizData';

interface ContactFormProps {
  formData: Partial<QuizFormData>;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string) => void;
  submitButtonText?: string;
}

export default function ContactForm({ 
  formData, 
  onSubmit, 
  onChange,
  submitButtonText = "Submit"
}: ContactFormProps) {
  const isFormValid = contactFields.fields
    .filter(field => field.required)
    .every(field => formData[field.id as keyof QuizFormData]);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
            value={formData[field.id as keyof QuizFormData] || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500 sm:text-sm"
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm mt-6
          ${isFormValid 
            ? 'bg-brown-600 hover:bg-brown-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown-600' 
            : 'bg-gray-300 cursor-not-allowed'}`}
      >
        {submitButtonText}
      </button>
    </form>
  );
} 