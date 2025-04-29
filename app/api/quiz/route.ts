import { NextResponse } from 'next/server';
import { emailQuizResponse } from '@/app/lib/emailService';
import type { QuizFormData } from '@/app/lib/quizData';
import { generatePersonalizedResults } from '@/app/lib/quizLogic';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate and sanitize the input data
    const quizData: QuizFormData = {
      stage: data.stage || 'Not specified',
      problemSolving: data.problemSolving || 'Not specified',
      boostTime: data.boostTime || 'Not specified',
      bigChallenge: data.bigChallenge || 'Not specified',
      workStyle: data.workStyle || 'Not specified',
      environment: data.environment || 'Not specified',
      deadlineStyle: data.deadlineStyle || 'Not specified',
      sensoryFocus: data.sensoryFocus || 'Not specified',
      flavorNotes: data.flavorNotes || 'Not specified',
      attentionStyle: data.attentionStyle || 'Not specified',
      name: data.name || 'Anonymous',
      email: data.email || 'Not provided',
      companyName: data.companyName || '',
      phoneNumber: data.phoneNumber || ''
    };
    
    // Generate personalized results
    const personalizedResults = generatePersonalizedResults(quizData);
    
    // Send email with both quiz responses and personalized results
    const emailSent = await emailQuizResponse({ ...quizData, personalizedResults });
    
    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: 'Quiz response sent successfully',
      results: personalizedResults
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error processing quiz submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 