'use client';

import { useSearchParams } from 'next/navigation';
import Button from '../components/Button';
import { matchRoastProfile } from '../lib/matchRoast';
import type { QuizFormData } from '../lib/quizData';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const quizData = searchParams.get('data');
  
  if (!quizData) {
    console.log('No quiz data found');
    return (
      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            No Quiz Data Found
          </h1>
          <p className="mt-4 text-gray-600">
            Please take the quiz to get your personalized roast recommendation.
          </p>
          <div className="mt-8">
            <Button href="/quiz">Take the Quiz</Button>
          </div>
        </div>
      </main>
    );
  }

  let answers: QuizFormData;
  try {
    console.log('Raw quiz data:', quizData);
    answers = JSON.parse(decodeURIComponent(quizData)) as QuizFormData;
    console.log('Parsed answers:', answers);
  } catch (error) {
    console.error('Error parsing quiz data:', error);
    return (
      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Error Loading Results
          </h1>
          <p className="mt-4 text-gray-600">
            There was an error processing your quiz results. Please try taking the quiz again.
          </p>
          <div className="mt-8">
            <Button href="/quiz">Take the Quiz Again</Button>
          </div>
        </div>
      </main>
    );
  }
  
  try {
    const matchedRoast = matchRoastProfile(answers);
    console.log('Matched roast:', matchedRoast);
    
    return (
      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Your Perfect Roast Match
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Based on your unique founder profile, we've crafted the perfect roast for you.
            </p>
          </div>
          
          <div className="mt-12 bg-amber-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-amber-900">
              {matchedRoast.name}
            </h2>
            <p className="mt-4 text-amber-800">
              {matchedRoast.description}
            </p>
            
            <div className="mt-6">
              <h3 className="font-medium text-amber-900">Tasting Notes</h3>
              <ul className="mt-2 grid grid-cols-2 gap-2">
                {matchedRoast.tastingNotes.map((note) => (
                  <li
                    key={note}
                    className="bg-amber-100 px-3 py-1 rounded-full text-amber-800 text-sm"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Ready to experience your perfect roast?
            </p>
            <Button href="/book" size="lg">
              Book Your Pop-Up
            </Button>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error matching roast:', error);
    return (
      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Error Finding Your Match
          </h1>
          <p className="mt-4 text-gray-600">
            There was an error finding your perfect roast match. Please try taking the quiz again.
          </p>
          <div className="mt-8">
            <Button href="/quiz">Take the Quiz Again</Button>
          </div>
        </div>
      </main>
    );
  }
} 