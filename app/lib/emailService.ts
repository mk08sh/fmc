import nodemailer from 'nodemailer';
import { QuizFormData } from './quizData';

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

// Debug logging for environment variables
console.log('Email Service Initialization - Environment Variables Check:', {
  GMAIL_USER: process.env.GMAIL_USER ? 'Set' : 'Not Set',
  GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not Set',
  RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL ? 'Set' : 'Not Set'
});

// Create a transporter using Gmail with explicit settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  debug: true,
  logger: true
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Transporter verification failed:', error);
  } else {
    console.log('Transporter is ready to send emails');
  }
});

export async function sendEmail({ to, subject, html }: EmailData) {
  try {
    console.log('Attempting to send email with config:', {
      from: process.env.GMAIL_USER,
      to,
      subject
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Detailed error sending email:', error);
    // Type guard to check if error is an object with a code property
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'EAUTH') {
        console.error('Authentication failed. Please check your Gmail credentials.');
      }
    }
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

export function createQuizResponseEmail(quizData: any) {
  // Format quiz data into HTML
  const htmlContent = `
    <h1>New Quiz Response</h1>
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Quiz Results</h2>
      <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${JSON.stringify(quizData, null, 2)}
      </pre>
      <p>Submitted at: ${new Date().toLocaleString()}</p>
    </div>
  `;

  return htmlContent;
}

export async function emailQuizResponse(response: QuizFormData & { personalizedResults?: any }) {
  try {
    // Format the contact information
    const contactInfo = `
Contact Information:
------------------
Name: ${response.name || 'Not provided'}
Email: ${response.email || 'Not provided'}
${response.companyName ? `Company: ${response.companyName}` : ''}
${response.phoneNumber ? `Phone: ${response.phoneNumber}` : ''}
`;

    // Format all quiz responses
    const quizResponses = `
Quiz Responses:
-------------
Startup Stage: ${response.stage}
Problem-Solving Approach: ${response.problemSolving}
Boost Time: ${response.boostTime}
Biggest Challenge: ${response.bigChallenge}
Work Style: ${response.workStyle}
Environment Preference: ${response.environment}
Deadline Approach: ${response.deadlineStyle}
Sensory Focus: ${response.sensoryFocus}
Flavor Notes: ${response.flavorNotes}
Attention Style: ${response.attentionStyle}
`;

    // Format personalized results
    const personalizedResults = response.personalizedResults ? `
Personalized Results:
-------------------
Work Style Profile: ${response.personalizedResults.workStyle}

Coffee Recommendation: ${response.personalizedResults.coffeeRecommendation}

Productivity Tips:
${response.personalizedResults.productivityTips.map((tip: string) => `• ${tip}`).join('\n')}
` : '';

    const emailContent = `
New Founder Quiz Response
========================
Timestamp: ${new Date().toLocaleString()}

${contactInfo}
${quizResponses}
${personalizedResults}
------------------------
`;

    // Send email with HTML format for better readability
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Quiz Response from ${response.name || 'Anonymous'} ${response.companyName ? `- ${response.companyName}` : ''}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
            New Founder Quiz Response
          </h1>
          
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #4a5568; margin-top: 0;">Contact Information</h2>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${response.name || 'Not provided'}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${response.email || 'Not provided'}</p>
            ${response.companyName ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${response.companyName}</p>` : ''}
            ${response.phoneNumber ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${response.phoneNumber}</p>` : ''}
          </div>

          <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px;">
            <h2 style="color: #4a5568; margin-top: 0;">Quiz Responses</h2>
            <p style="margin: 5px 0;"><strong>Startup Stage:</strong> ${response.stage}</p>
            <p style="margin: 5px 0;"><strong>Problem-Solving Approach:</strong> ${response.problemSolving}</p>
            <p style="margin: 5px 0;"><strong>Boost Time:</strong> ${response.boostTime}</p>
            <p style="margin: 5px 0;"><strong>Biggest Challenge:</strong> ${response.bigChallenge}</p>
            <p style="margin: 5px 0;"><strong>Work Style:</strong> ${response.workStyle}</p>
            <p style="margin: 5px 0;"><strong>Environment Preference:</strong> ${response.environment}</p>
            <p style="margin: 5px 0;"><strong>Deadline Approach:</strong> ${response.deadlineStyle}</p>
            <p style="margin: 5px 0;"><strong>Sensory Focus:</strong> ${response.sensoryFocus}</p>
            <p style="margin: 5px 0;"><strong>Flavor Notes:</strong> ${response.flavorNotes}</p>
            <p style="margin: 5px 0;"><strong>Attention Style:</strong> ${response.attentionStyle}</p>
          </div>

          ${response.personalizedResults ? `
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h2 style="color: #4a5568; margin-top: 0;">Personalized Results</h2>
            
            <div style="margin-bottom: 15px;">
              <h3 style="color: #4a5568; margin-bottom: 5px;">Work Style Profile</h3>
              <p style="margin: 5px 0;">${response.personalizedResults.workStyle}</p>
            </div>

            <div style="margin-bottom: 15px;">
              <h3 style="color: #4a5568; margin-bottom: 5px;">Coffee Recommendation</h3>
              <p style="margin: 5px 0;">${response.personalizedResults.coffeeRecommendation}</p>
            </div>

            <div>
              <h3 style="color: #4a5568; margin-bottom: 5px;">Productivity Tips</h3>
              <ul style="margin: 5px 0; padding-left: 20px;">
                ${response.personalizedResults.productivityTips.map(tip => `
                  <li style="margin: 5px 0;">${tip}</li>
                `).join('')}
              </ul>
            </div>
          </div>
          ` : ''}

          <p style="color: #718096; font-size: 0.875rem; margin-top: 20px;">
            Received on: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
} 