import { NextResponse } from 'next/server';
import { emailQuizResponse } from '@/app/lib/emailService';
import type { QuizFormData } from '@/app/lib/quizData';
import { generatePersonalizedResults } from '@/app/lib/quizLogic';

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request: Request) {
  try {
    console.log('Quiz API - Received request');
    const data = await request.json();
    console.log('Quiz API - Request data:', {
      hasEmail: !!data.email,
      emailLength: data.email?.length,
      name: data.name,
      isBooking: !!data.date,
      fields: Object.keys(data),
    });
    
    // Validate email if provided
    if (data.email && !emailRegex.test(data.email)) {
      console.log('Quiz API - Invalid email format:', data.email);
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      );
    }
    
    // Validate and sanitize the input data
    const quizData: QuizFormData = {
      // Quiz answers
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
      
      // Contact information with proper validation
      name: data.name?.trim() || 'Anonymous',
      email: data.email?.trim() || 'Not provided',
      companyName: data.companyName?.trim() || '',
      phoneNumber: data.phoneNumber?.trim() || '',
      
      // Additional fields
      isInSF: data.isInSF || false,
      isYC: data.isYC || false,
      ycBatch: data.ycBatch?.trim() || '',
      
      // Booking fields
      date: data.date,
      time: data.time,
      participants: data.participants,
    };

    console.log('Quiz API - Processed quiz data:', {
      hasEmail: !!quizData.email,
      emailLength: quizData.email?.length,
      name: quizData.name,
      isBooking: !!quizData.date,
    });
    
    // Generate personalized results
    const personalizedResults = generatePersonalizedResults(quizData);
    
    // Send email with both quiz responses and personalized results
    if (quizData.email && quizData.email !== 'Not provided') {
      console.log('Quiz API - Attempting to send email');
      try {
        const emailResult = await emailQuizResponse({ ...quizData, personalizedResults });
        
        if (!emailResult) {
          console.error('Quiz API - Failed to send email notification');
          // Continue with the response even if email fails
          return NextResponse.json({
            message: 'Quiz processed but email failed to send',
            error: 'Email sending failed',
            results: personalizedResults,
            contact: {
              name: quizData.name,
              email: quizData.email,
              companyName: quizData.companyName,
              isInSF: quizData.isInSF,
              isYC: quizData.isYC,
              ycBatch: quizData.ycBatch
            }
          }, { status: 200 });
        } else {
          console.log('Quiz API - Email sent successfully');
        }
      } catch (emailError) {
        console.error('Quiz API - Error sending email:', emailError);
        // Continue with the response even if email fails
        return NextResponse.json({
          message: 'Quiz processed but email failed to send',
          error: emailError instanceof Error ? emailError.message : 'Unknown email error',
          results: personalizedResults,
          contact: {
            name: quizData.name,
            email: quizData.email,
            companyName: quizData.companyName,
            isInSF: quizData.isInSF,
            isYC: quizData.isYC,
            ycBatch: quizData.ycBatch
          }
        }, { status: 200 });
      }
    } else {
      console.log('Quiz API - No email provided, skipping email send');
    }
    
    return NextResponse.json({
      message: 'Quiz response processed successfully',
      results: personalizedResults,
      contact: {
        name: quizData.name,
        email: quizData.email,
        companyName: quizData.companyName,
        isInSF: quizData.isInSF,
        isYC: quizData.isYC,
        ycBatch: quizData.ycBatch
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Quiz API - Error processing submission:', error);
    console.error('Quiz API - Full error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 