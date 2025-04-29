import { NextResponse } from 'next/server';
import { emailQuizResponse } from '@/app/lib/emailService';
import type { QuizFormData } from '@/app/lib/quizData';
import { generatePersonalizedResults } from '@/app/lib/quizLogic';

export async function POST(request: Request) {
  try {
    const data = await request.json() as QuizFormData;
    
    // Generate personalized results
    const personalizedResults = generatePersonalizedResults(data);
    
    // Send email with both quiz responses and personalized results
    const emailSent = await emailQuizResponse({ ...data, personalizedResults });
    
    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Quiz response sent successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing quiz submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 