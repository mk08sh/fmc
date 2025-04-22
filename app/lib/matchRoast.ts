import { QuizFormData } from './quizData';
import { roastProfiles, type RoastProfile } from './roastProfiles';

export function matchRoastProfile(answers: QuizFormData): RoastProfile {
  // Calculate match scores for each roast profile
  const scores = roastProfiles.map(profile => {
    let score = 0;
    
    // Stage match
    if (profile.matchingCriteria.stage.includes(answers.stage)) {
      score += 2;
    }
    
    // Problem-solving approach match
    if (profile.matchingCriteria.problemSolving.includes(answers.problemSolving)) {
      score += 2;
    }
    
    // Primary traits matches (workStyle, deadlineStyle, attentionStyle)
    const traits = [answers.workStyle, answers.deadlineStyle, answers.attentionStyle];
    traits.forEach(trait => {
      if (profile.matchingCriteria.primaryTraits.includes(trait)) {
        score += 1;
      }
    });
    
    return { profile, score };
  });
  
  // Sort by score and return the best match
  scores.sort((a, b) => b.score - a.score);
  return scores[0].profile;
} 