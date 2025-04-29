'use client';

import { Suspense } from 'react';
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
        <h1 className="result-title">Roast Match Complete</h1>
        <p className="result-tagline">
          Our Chief Barista will connect with you shortly to finalize your Founder Experience.
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
        
        <Link href="/" className="home-button">Take Me Home</Link>
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