export interface QuizQuestion {
  id: string;
  label: string;
  options: string[];
}

export interface QuizFormData {
  stage: string;
  problemSolving: string;
  boostTime: string;
  bigChallenge: string;
  workStyle: string;
  environment: string;
  deadlineStyle: string;
  sensoryFocus: string;
  flavorNotes: string;
  attentionStyle: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "stage",
    label: "How would you describe your startup's current stage?",
    options: ["Ideation Phase", "Early Prototype", "Growth Mode", "Scaling Up"]
  },
  {
    id: "problemSolving",
    label: "What's your approach to problem-solving?",
    options: ["Methodical Analyzer", "Intuitive Visionary", "Collaborative Builder", "Rapid Experimenter"]
  },
  {
    id: "boostTime",
    label: "When do you typically need your coffee boost?",
    options: ["Early Riser", "Mid-Morning", "Afternoon Recharge", "Evening Creator"]
  },
  {
    id: "bigChallenge",
    label: "What's your current biggest challenge?",
    options: ["Finding Product-Market Fit", "Building the Team", "Securing Funding", "Scaling Operations"]
  },
  {
    id: "workStyle",
    label: "How do you prefer to work on complex problems?",
    options: ["Deep Focus Immersion", "Parallel Processing", "Structured Approach", "Collaborative Thinking"]
  },
  {
    id: "environment",
    label: "What's your ideal work environment?",
    options: ["Quiet Sanctuary", "Dynamic Atmosphere", "Flexible Space", "Nature Connection"]
  },
  {
    id: "deadlineStyle",
    label: "How do you typically approach deadlines?",
    options: ["Last-Minute Intensity", "Methodical Planning", "Flexible Adaptation", "Time Blindness"]
  },
  {
    id: "sensoryFocus",
    label: "What sensory aspects of coffee are most important to you?",
    options: ["Texture Experience", "Aromatic Complexity", "Flavor Balance", "Visual Presentation"]
  },
  {
    id: "flavorNotes",
    label: "What flavor notes do you typically enjoy?",
    options: ["Bold & Rich", "Bright & Vibrant", "Smooth & Balanced", "Exotic & Distinctive"]
  },
  {
    id: "attentionStyle",
    label: "How would you describe your attention style?",
    options: ["Laser Focus", "Panoramic Awareness", "Context-Dependent", "Multi-Channel Processing"]
  }
]; 