'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { matchRoastProfile } from '../lib/matchRoast';
import type { QuizFormData } from '../lib/quizData';
import './styles.css';

// Coffee beans SVG component
const CoffeeBeansSVG = () => (
  <svg className="coffee-beans" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <path d="M85,85 C65,65 35,80 25,110 C15,140 25,180 55,195 C85,210 125,195 135,160 C145,125 105,105 85,85 Z" fill="#2c2722"/>
    <path d="M215,85 C235,65 265,80 275,110 C285,140 275,180 245,195 C215,210 175,195 165,160 C155,125 195,105 215,85 Z" fill="#2c2722"/>
    <path d="M150,185 C130,165 100,180 90,210 C80,240 90,280 120,295 C150,310 190,295 200,260 C210,225 170,205 150,185 Z" fill="#2c2722"/>
  </svg>
);

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Booking form component
const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    date: '',
    time: '',
    participants: '1',
    isInSF: false,
    isYC: false,
    ycBatch: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const availableTimes = [
    '10:00 AM',
    '11:30 AM',
    '2:00 PM',
    '3:30 PM',
  ];

  const validateEmail = (email: string) => {
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before submission
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setFormErrors(prev => ({ ...prev, email: emailError }));
      return;
    }

    setIsSubmitting(true);

    try {
      // Get existing quiz data from URL params
      const searchParams = new URLSearchParams(window.location.search);
      const quizDataStr = searchParams.get('data');
      let quizData = {};
      
      if (quizDataStr) {
        try {
          quizData = JSON.parse(decodeURIComponent(quizDataStr));
        } catch (error) {
          console.error('Error parsing quiz data:', error);
        }
      }

      // Send to quiz API endpoint
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...quizData, // Include existing quiz data if available
          ...formData,  // Add booking form data
          // Only set default quiz fields if no quiz data exists
          ...(Object.keys(quizData).length === 0 && {
            stage: 'Not specified',
            problemSolving: 'Methodical Analyzer',
            boostTime: 'Mid-Morning',
            bigChallenge: 'Finding Product-Market Fit',
            workStyle: 'Deep Focus Immersion',
            environment: 'Quiet Sanctuary',
            deadlineStyle: 'Methodical Planning',
            sensoryFocus: 'Aromatic Complexity',
            flavorNotes: 'Bold & Rich',
            attentionStyle: 'Laser Focus'
          })
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      setIsBooked(true);
    } catch (error) {
      console.error('Error processing booking:', error);
      alert('There was an error processing your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Clear email error when user starts typing
    if (name === 'email') {
      setFormErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'email') {
      const error = validateEmail(value);
      setFormErrors(prev => ({ ...prev, email: error }));
    }
  };

  // Calculate min date (tomorrow) and max date (2 months from now)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  if (isBooked) {
    return (
      <div className="booking-section mt-12 p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for booking your coffee experience. We'll contact you shortly with confirmation details.
        </p>
        <div className="p-4 bg-green-50 rounded-lg text-green-800">
          <p>Get ready to experience your perfect roast in person!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-section mt-12 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-left">Book Your Founder Coffee Experience</h2>
      <p className="text-gray-600 mb-6 text-left">
        Join us in San Francisco for an exclusive coffee tasting featuring your matched roast profile.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-left">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
              formErrors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1 text-left">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
            <input
              type="checkbox"
              name="isInSF"
              className="mr-2 rounded text-amber-600 focus:ring-amber-500"
              checked={formData.isInSF}
              onChange={handleChange}
            />
            Is your startup located in San Francisco?
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
            <input
              type="checkbox"
              name="isYC"
              className="mr-2 rounded text-amber-600 focus:ring-amber-500"
              checked={formData.isYC}
              onChange={handleChange}
            />
            Are you part of a Y Combinator batch?
          </label>
        </div>

        {formData.isYC && (
          <div>
            <label htmlFor="ycBatch" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Which YC batch are you in?
            </label>
            <input
              type="text"
              id="ycBatch"
              name="ycBatch"
              placeholder="e.g. W24, S23"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={formData.ycBatch}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Preferred Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              min={tomorrow.toISOString().split('T')[0]}
              max={maxDate.toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Preferred Time
            </label>
            <select
              id="time"
              name="time"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={formData.time}
              onChange={handleChange}
            >
              <option value="">Select a time</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1 text-left">
            Number of Participants
          </label>
          <select
            id="participants"
            name="participants"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={formData.participants}
            onChange={handleChange}
          >
            {[1, 2, 3, 4].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 text-white rounded-lg transition-colors duration-200 ${
            isSubmitting 
              ? 'bg-amber-400 cursor-not-allowed' 
              : 'bg-amber-600 hover:bg-amber-700'
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Book Experience'}
        </button>
      </form>

      <div className="mt-8 p-4 bg-amber-50 rounded-lg">
        <h3 className="text-lg font-semibold text-amber-900 mb-2 text-left">What to Expect</h3>
        <ul className="space-y-2 text-amber-800">
          <li className="flex items-center">
            <span className="mr-2">•</span>
            90-minute personalized coffee experience
          </li>
          <li className="flex items-center">
            <span className="mr-2">•</span>
            Guided tasting of your matched roast
          </li>
          <li className="flex items-center">
            <span className="mr-2">•</span>
            Professional brewing demonstration
          </li>
          <li className="flex items-center">
            <span className="mr-2">•</span>
            Take-home bag of your matched coffee
          </li>
        </ul>
      </div>
    </div>
  );
};

// Separate component that uses useSearchParams
function ResultData() {
  const searchParams = useSearchParams();
  const quizData = searchParams.get('data');
  
  if (!quizData) {
    return (
      <div className="result-container">
        <h1 className="result-title">No Quiz Data Found</h1>
        <p className="result-tagline">
          Please take the quiz to get your personalized roast recommendation.
        </p>
        <Link href="/quiz" className="home-button">Take the Quiz</Link>
      </div>
    );
  }

  let answers: QuizFormData;
  try {
    answers = JSON.parse(decodeURIComponent(quizData)) as QuizFormData;
  } catch (error) {
    console.error('Error parsing quiz data:', error);
    return (
      <div className="result-container">
        <h1 className="result-title">Error Loading Results</h1>
        <p className="result-tagline">
          There was an error processing your quiz results. Please try taking the quiz again.
        </p>
        <Link href="/quiz" className="home-button">Take the Quiz Again</Link>
      </div>
    );
  }
  
  try {
    const matchedRoast = matchRoastProfile(answers);
    
    return (
      <div className="result-container">
        <CoffeeBeansSVG />
        <h1 className="result-title">Your Perfect Roast Match</h1>
        <p className="result-tagline">
          We've found your ideal coffee profile. Ready to experience it in person?
        </p>
        
        <div className="roast-card-container">
          <div className="roast-card">
            <h2 className="roast-name">{matchedRoast.name}</h2>
            <p className="roast-description">{matchedRoast.description}</p>
            
            <h3 className="tasting-notes-title">Tasting Notes</h3>
            <div className="tasting-notes">
              {matchedRoast.tastingNotes.map((note) => (
                <div key={note} className="note">{note}</div>
              ))}
            </div>
          </div>
        </div>

        <BookingForm />
        
        <Link href="/" className="home-button mt-8">Take Me Home</Link>
      </div>
    );
  } catch (error) {
    console.error('Error matching roast:', error);
    return (
      <div className="result-container">
        <h1 className="result-title">Error Finding Your Match</h1>
        <p className="result-tagline">
          There was an error finding your perfect roast match. Please try taking the quiz again.
        </p>
        <Link href="/quiz" className="home-button">Take the Quiz Again</Link>
      </div>
    );
  }
}

// Loading component
function LoadingState() {
  return (
    <div className="result-container">
      <h2 className="result-title">Loading your results...</h2>
    </div>
  );
}

// Main page component with proper Suspense boundary
export default function ResultPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f4]">
      <Suspense fallback={<LoadingState />}>
        <ResultData />
      </Suspense>
    </main>
  );
} 