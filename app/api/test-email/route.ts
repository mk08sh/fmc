import { NextResponse } from 'next/server';
import { emailQuizResponse } from '@/app/lib/emailService';
import type { QuizFormData } from '@/app/lib/quizData';

export async function GET() {
  // Add debug logging at the start of the function
  console.log('Environment Variables Status:', {
    GMAIL_USER: process.env.GMAIL_USER ? 'Set' : 'Not Set',
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not Set',
    RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL ? 'Set' : 'Not Set'
  });

  try {
    // Test data
    const testData: QuizFormData = {
      stage: "Ideation Phase",
      problemSolving: "Methodical Analyzer",
      boostTime: "Early Riser",
      bigChallenge: "Finding Product-Market Fit",
      workStyle: "Deep Focus Immersion",
      environment: "Quiet Sanctuary",
      deadlineStyle: "Methodical Planning",
      sensoryFocus: "Aromatic Complexity",
      flavorNotes: "Test Flavor",
      attentionStyle: "Focused",
      name: "Test User",
      email: "test@example.com",
      companyName: "Test Company",
      phoneNumber: "123-456-7890"
    };
    
    // Send test email
    const emailSent = await emailQuizResponse(testData);
    
    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send test email' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Test email sent successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 