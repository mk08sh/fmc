import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { QuizFormData } from './quizData';

// Database setup
const dbPromise = open({
  filename: './data/quiz.db',
  driver: sqlite3.Database
});

// Initialize database
async function initDB() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS quiz_responses (
      id TEXT PRIMARY KEY,
      stage TEXT,
      problemSolving TEXT,
      workStyle TEXT,
      deadlineStyle TEXT,
      attentionStyle TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Initialize DB on import
initDB().catch(console.error);

export async function saveQuizResponse(response: QuizFormData) {
  try {
    const db = await dbPromise;
    const id = `quiz_${Date.now()}`;
    
    await db.run(
      `INSERT INTO quiz_responses (
        id, stage, problemSolving, workStyle, deadlineStyle, attentionStyle
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        response.stage,
        response.problemSolving,
        response.workStyle,
        response.deadlineStyle,
        response.attentionStyle
      ]
    );
    
    return true;
  } catch (error) {
    console.error('Error saving to database:', error);
    return false;
  }
}

export async function getQuizResponses() {
  try {
    const db = await dbPromise;
    return await db.all('SELECT * FROM quiz_responses ORDER BY timestamp DESC');
  } catch (error) {
    console.error('Error reading from database:', error);
    return [];
  }
}

export async function getQuizResponseById(id: string) {
  try {
    const db = await dbPromise;
    return await db.get('SELECT * FROM quiz_responses WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error reading from database:', error);
    return null;
  }
} 