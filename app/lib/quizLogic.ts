import { QuizFormData } from './quizData';

interface PersonalizedResult {
  workStyle: string;
  coffeeRecommendation: string;
  productivityTips: string[];
}

export function generatePersonalizedResults(data: QuizFormData): PersonalizedResult {
  // Generate work style description
  const workStyle = generateWorkStyleDescription(data);
  
  // Generate coffee recommendation
  const coffeeRecommendation = generateCoffeeRecommendation(data);
  
  // Generate productivity tips
  const productivityTips = generateProductivityTips(data);
  
  return {
    workStyle,
    coffeeRecommendation,
    productivityTips
  };
}

function generateWorkStyleDescription(data: QuizFormData): string {
  const styles = {
    problemSolving: {
      'Methodical Analyzer': 'You approach problems systematically, gathering data before making decisions.',
      'Intuitive Visionary': 'You trust your instincts and creative insights to solve problems.',
      'Collaborative Builder': 'You thrive on bringing diverse perspectives together.',
      'Rapid Experimenter': 'You prefer quick iterations and learning through trial and error.'
    },
    workStyle: {
      'Deep Focus Immersion': 'You excel in long, uninterrupted work sessions.',
      'Parallel Processing': 'You skillfully manage multiple tasks simultaneously.',
      'Structured Approach': 'You prefer clear methodologies and defined steps.',
      'Collaborative Thinking': 'You generate your best ideas through discussion and feedback.'
    }
  };

  return `${styles.problemSolving[data.problemSolving]} ${styles.workStyle[data.workStyle]}`;
}

function generateCoffeeRecommendation(data: QuizFormData): string {
  const recommendations = {
    'Early Riser': {
      'Bright & Vibrant': 'Light roast Ethiopian Yirgacheffe with bright, citrusy notes',
      'Rich & Complex': 'Medium roast Colombian with nutty, caramel undertones',
      'Bold & Intense': 'Dark roast Sumatra with deep, earthy flavors',
      'Smooth & Balanced': 'Medium roast Brazilian Santos with chocolate notes'
    },
    'Mid-Morning': {
      'Bright & Vibrant': 'Light roast Kenya AA with wine-like acidity',
      'Rich & Complex': 'Medium roast Guatemala Antigua with spicy notes',
      'Bold & Intense': 'Dark roast Italian Roast with smoky sweetness',
      'Smooth & Balanced': 'Medium roast Costa Rican with honey notes'
    },
    'Afternoon Recharge': {
      'Bright & Vibrant': 'Light roast Rwanda with tea-like clarity',
      'Rich & Complex': 'Medium roast Peru with maple sweetness',
      'Bold & Intense': 'Dark roast French Roast with intense body',
      'Smooth & Balanced': 'Medium roast Mexican with subtle chocolate'
    },
    'Evening Creator': {
      'Bright & Vibrant': 'Light roast Panama Geisha with floral notes',
      'Rich & Complex': 'Medium roast Yemen Mocha with wine notes',
      'Bold & Intense': 'Dark roast Espresso Blend with robust flavor',
      'Smooth & Balanced': 'Medium roast Hawaiian with mild sweetness'
    }
  };

  return recommendations[data.boostTime]?.[data.flavorNotes] || 
    'A balanced medium roast blend customized to your taste preferences';
}

function generateProductivityTips(data: QuizFormData): string[] {
  const tips: string[] = [];

  // Environment-based tips
  if (data.environment === 'Quiet Sanctuary') {
    tips.push('Create a dedicated, distraction-free workspace');
    tips.push('Use noise-canceling headphones during focus sessions');
  } else if (data.environment === 'Dynamic Atmosphere') {
    tips.push('Try working from different locations to maintain energy');
    tips.push('Use ambient noise or coffee shop sounds for background');
  }

  // Deadline approach tips
  if (data.deadlineStyle === 'Last-Minute Intensity') {
    tips.push('Break large projects into smaller, manageable deadlines');
    tips.push('Set artificial early deadlines to harness your pressure-driven focus');
  } else if (data.deadlineStyle === 'Methodical Planning') {
    tips.push('Use a project management tool to track milestones');
    tips.push('Schedule regular progress review sessions');
  }

  // Work style tips
  if (data.workStyle === 'Deep Focus Immersion') {
    tips.push('Block out 2-3 hour chunks for deep work sessions');
    tips.push('Use the Pomodoro Technique with longer focus periods');
  } else if (data.workStyle === 'Parallel Processing') {
    tips.push('Use a task-switching system to maintain momentum');
    tips.push('Keep a running list of quick tasks for between-focus work');
  }

  return tips;
} 