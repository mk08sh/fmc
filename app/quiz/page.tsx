'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from '../components/Select';
import Button from '../components/Button';
import { quizQuestions, type QuizFormData } from '../lib/quizData';

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<QuizFormData>>({});
  
  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / quizQuestions.length) * 100;
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/result?data=${encodeURIComponent(JSON.stringify(formData))}`);
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
            Question {currentStep + 1} of {quizQuestions.length}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            key={currentQuestion.id}
            name={currentQuestion.id}
            label={currentQuestion.label}
            options={currentQuestion.options}
            value={formData[currentQuestion.id as keyof QuizFormData] || ''}
            onChange={handleChange}
            required
          />
          
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
              <Button type="submit">
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