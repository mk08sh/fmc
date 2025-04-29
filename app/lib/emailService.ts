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
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Please check your Gmail credentials.');
    }
    return { success: false, error };
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

export async function emailQuizResponse(response: QuizFormData) {
  try {
    // Format the contact information
    const contactInfo = `
Contact Information:
------------------
Name: ${response.name}
Email: ${response.email}
${response.companyName ? `Company: ${response.companyName}` : ''}
${response.phoneNumber ? `Phone: ${response.phoneNumber}` : ''}
`;

    // Format the quiz responses
    const quizResponses = `
Quiz Responses:
-------------
Startup Stage: ${response.stage}
Problem-Solving Approach: ${response.problemSolving}
Work Style: ${response.workStyle}
Deadline Approach: ${response.deadlineStyle}
Attention Style: ${response.attentionStyle}
`;

    const emailContent = `
New Founder Quiz Response
========================
Timestamp: ${new Date().toLocaleString()}

${contactInfo}
${quizResponses}
------------------------
`;

    // Send email with HTML format for better readability
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Quiz Response from ${response.name} - ${response.companyName || 'Individual'}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
            New Founder Quiz Response
          </h1>
          
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #4a5568; margin-top: 0;">Contact Information</h2>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${response.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${response.email}</p>
            ${response.companyName ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${response.companyName}</p>` : ''}
            ${response.phoneNumber ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${response.phoneNumber}</p>` : ''}
          </div>

          <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px;">
            <h2 style="color: #4a5568; margin-top: 0;">Quiz Responses</h2>
            <p style="margin: 5px 0;"><strong>Startup Stage:</strong> ${response.stage}</p>
            <p style="margin: 5px 0;"><strong>Problem-Solving Approach:</strong> ${response.problemSolving}</p>
            <p style="margin: 5px 0;"><strong>Work Style:</strong> ${response.workStyle}</p>
            <p style="margin: 5px 0;"><strong>Deadline Approach:</strong> ${response.deadlineStyle}</p>
            <p style="margin: 5px 0;"><strong>Attention Style:</strong> ${response.attentionStyle}</p>
          </div>

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