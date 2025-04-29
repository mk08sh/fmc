'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import OptionCard from '../components/OptionCard';
import { quizQuestions, contactFields, type QuizFormData } from '../lib/quizData';

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState<Partial<QuizFormData>>(() => {
    // Try to load saved data on initial render
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quizResponses');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  
  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('quizResponses', JSON.stringify(formData));
  }, [formData]);
  
  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / (quizQuestions.length + 1)) * 100;
  
  const handleSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === quizQuestions.length - 1) {
      setShowContactForm(true);
    }
  };
  
  const handlePrevious = () => {
    if (showContactForm) {
      setShowContactForm(false);
      setCurrentStep(quizQuestions.length - 1);
    } else if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure all questions and required contact fields are answered
    const allQuestionsAnswered = quizQuestions.every(q => formData[q.id as keyof QuizFormData]);
    const requiredContactFieldsAnswered = contactFields.fields
      .filter(field => field.required)
      .every(field => formData[field.id as keyof QuizFormData]);
    
    if (!allQuestionsAnswered || !requiredContactFieldsAnswered) {
      alert('Please fill in all required fields before submitting.');
      return;
    }
    
    try {
      // Send to API endpoint
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      // Clear localStorage after successful submission
      localStorage.removeItem('quizResponses');
      
      // Convert the form data to a URL-safe string and redirect to results
      const formDataString = encodeURIComponent(JSON.stringify(formData));
      router.push(`/result?data=${formDataString}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('There was an error submitting your quiz. Please try again.');
    }
  };
  
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Find Your Perfect Roast
          </h1>
          <div className="mt-4 bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-amber-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600 text-center">
            {showContactForm ? 'Final Step' : `Question ${currentStep + 1} of ${quizQuestions.length}`}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!showContactForm ? (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {currentQuestion.label}
              </h2>
              <div className="grid gap-3">
                {currentQuestion.options.map((option) => {
                  const optionValue = typeof option === 'string' ? option : option.value;
                  const optionSubheading = typeof option === 'string' ? undefined : option.subheading;
                  
                  return (
                    <OptionCard
                      key={optionValue}
                      value={optionValue}
                      label={optionValue}
                      subheading={optionSubheading}
                      isSelected={formData[currentQuestion.id as keyof QuizFormData] === optionValue}
                      onClick={() => handleSelect(optionValue)}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Almost there! How can we reach you?
              </h2>
              <div className="space-y-4">
                {contactFields.fields.map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={field.type}
                      name={field.id}
                      id={field.id}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={formData[field.id as keyof QuizFormData] || ''}
                      onChange={handleContactChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentStep === 0 && !showContactForm}
            >
              Previous
            </Button>
            
            {showContactForm ? (
              <Button 
                type="submit"
                disabled={!contactFields.fields
                  .filter(field => field.required)
                  .every(field => formData[field.id as keyof QuizFormData])}
              >
                See Your Results
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!formData[currentQuestion.id as keyof QuizFormData]}
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
} 