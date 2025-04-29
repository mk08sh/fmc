'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import OptionCard from '../components/OptionCard';
import { quizQuestions, type QuizFormData } from '../lib/quizData';

export default function QuizPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<QuizFormData>>({});
  
  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('quizResponses');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error parsing saved quiz data:', error);
        localStorage.removeItem('quizResponses');
      }
    }
  }, []);
  
  // Save to localStorage whenever formData changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('quizResponses', JSON.stringify(formData));
    }
  }, [formData, isClient]);
  
  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / quizQuestions.length) * 100;
  
  const handleSelect = (value: string) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };
  
  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure all questions are answered
    const allQuestionsAnswered = quizQuestions.every(q => formData[q.id as keyof QuizFormData]);
    
    if (!allQuestionsAnswered) {
      alert('Please answer all questions before seeing your results.');
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

  // Don't render anything until we've initialized on the client
  if (!isClient) {
    return null;
  }
  
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
            Question {currentStep + 1} of {quizQuestions.length}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
          
          <div className="flex justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            {currentStep === quizQuestions.length - 1 ? (
              <Button 
                type="submit"
                disabled={!formData[currentQuestion.id as keyof QuizFormData]}
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