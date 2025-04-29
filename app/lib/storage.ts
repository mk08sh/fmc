import fs from 'fs';
import path from 'path';
import { QuizFormData } from './quizData';

const STORAGE_DIR = path.join(process.cwd(), 'data');
const RESPONSES_FILE = path.join(STORAGE_DIR, 'quiz-responses.json');

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

export async function saveQuizResponse(response: QuizFormData) {
  try {
    // Read existing responses
    let responses = [];
    if (fs.existsSync(RESPONSES_FILE)) {
      const data = fs.readFileSync(RESPONSES_FILE, 'utf8');
      responses = JSON.parse(data);
    }

    // Add new response with timestamp
    responses.push({
      ...response,
      timestamp: new Date().toISOString(),
      id: `quiz_${Date.now()}`
    });

    // Write back to file
    fs.writeFileSync(RESPONSES_FILE, JSON.stringify(responses, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving quiz response:', error);
    return false;
  }
}

export async function getQuizResponses() {
  try {
    if (!fs.existsSync(RESPONSES_FILE)) {
      return [];
    }
    const data = fs.readFileSync(RESPONSES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading quiz responses:', error);
    return [];
  }
} 