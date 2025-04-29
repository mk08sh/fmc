export interface QuizQuestion {
  id: string;
  label: string;
  options: Array<{
    value: string;
    subheading: string;
  }>;
}

export type QuizFormData = {
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
  // Contact Information
  name: string;
  email: string;
  companyName?: string;
  phoneNumber?: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "stage",
    label: "How would you describe your startup's current stage?",
    options: [
      {
        value: "Ideation Phase",
        subheading: "Still exploring possibilities and validating concepts"
      },
      {
        value: "Early Prototype",
        subheading: "Working MVP with initial user feedback"
      },
      {
        value: "Growth Mode",
        subheading: "Established product with growing user base"
      },
      {
        value: "Scaling Up",
        subheading: "Expanding rapidly with significant traction"
      }
    ]
  },
  {
    id: "problemSolving",
    label: "What's your approach to problem-solving?",
    options: [
      {
        value: "Methodical Analyzer",
        subheading: "I gather all data before making decisions"
      },
      {
        value: "Intuitive Visionary",
        subheading: "I trust my gut feelings and creative insights"
      },
      {
        value: "Collaborative Builder",
        subheading: "I bring in diverse perspectives to find solutions"
      },
      {
        value: "Rapid Experimenter",
        subheading: "I test many approaches quickly to see what works"
      }
    ]
  },
  {
    id: "boostTime",
    label: "When do you typically need your coffee boost?",
    options: [
      {
        value: "Early Riser",
        subheading: "5-8am, I start my day with focused work"
      },
      {
        value: "Mid-Morning",
        subheading: "9-11am, during my strategic planning time"
      },
      {
        value: "Afternoon Recharge",
        subheading: "1-4pm, to power through the mid-day slump"
      },
      {
        value: "Evening Creator",
        subheading: "After 6pm, when my creative energy peaks"
      }
    ]
  },
  {
    id: "bigChallenge",
    label: "What's your current biggest challenge?",
    options: [
      {
        value: "Finding Product-Market Fit",
        subheading: "Aligning solution with customer needs"
      },
      {
        value: "Building the Team",
        subheading: "Recruiting and developing talent"
      },
      {
        value: "Securing Funding",
        subheading: "Raising capital for growth"
      },
      {
        value: "Scaling Operations",
        subheading: "Managing growth without breaking systems"
      }
    ]
  },
  {
    id: "workStyle",
    label: "How do you prefer to work on complex problems?",
    options: [
      {
        value: "Deep Focus Immersion",
        subheading: "I can focus intensely on one problem for hours, losing track of time"
      },
      {
        value: "Parallel Processing",
        subheading: "I work on multiple aspects simultaneously, making unexpected connections"
      },
      {
        value: "Structured Approach",
        subheading: "I prefer following established methodologies and clear steps"
      },
      {
        value: "Collaborative Thinking",
        subheading: "I need to discuss ideas with others to fully develop them"
      }
    ]
  },
  {
    id: "environment",
    label: "What's your ideal work environment?",
    options: [
      {
        value: "Quiet Sanctuary",
        subheading: "Minimal noise, controlled lighting, few distractions"
      },
      {
        value: "Dynamic Atmosphere",
        subheading: "Bustling coffee shop or co-working space with background activity"
      },
      {
        value: "Flexible Space",
        subheading: "I need to change my environment frequently throughout the day"
      },
      {
        value: "Nature Connection",
        subheading: "Natural lighting and elements that connect me to the outdoors"
      }
    ]
  },
  {
    id: "deadlineStyle",
    label: "How do you typically approach deadlines?",
    options: [
      {
        value: "Last-Minute Intensity",
        subheading: "I thrive under pressure and often do my best work right before deadlines"
      },
      {
        value: "Methodical Planning",
        subheading: "I break tasks into small steps and schedule everything in advance"
      },
      {
        value: "Flexible Adaptation",
        subheading: "I start early but continually adjust my approach as I learn more"
      },
      {
        value: "Time Blindness",
        subheading: "I struggle to estimate how long tasks will take and often misjudge timing"
      }
    ]
  },
  {
    id: "sensoryFocus",
    label: "What sensory aspects of coffee are most important to you?",
    options: [
      {
        value: "Texture Experience",
        subheading: "The mouthfeel and consistency of the coffee"
      },
      {
        value: "Aromatic Complexity",
        subheading: "The nuanced smells that emerge from freshly brewed coffee"
      },
      {
        value: "Flavor Balance",
        subheading: "The harmonious interplay of different taste notes"
      },
      {
        value: "Visual Presentation",
        subheading: "How the coffee looks, including color and crema"
      }
    ]
  },
  {
    id: "flavorNotes",
    label: "What flavor notes do you typically enjoy?",
    options: [
      {
        value: "Bold & Rich",
        subheading: "Dark chocolate, caramel, nutty notes"
      },
      {
        value: "Bright & Vibrant",
        subheading: "Citrus, berries, floral undertones"
      },
      {
        value: "Smooth & Balanced",
        subheading: "Honey, mild fruit, subtle spices"
      },
      {
        value: "Exotic & Distinctive",
        subheading: "Unique flavor profiles and experimental processes"
      }
    ]
  },
  {
    id: "attentionStyle",
    label: "How would you describe your attention style?",
    options: [
      {
        value: "Laser Focus",
        subheading: "I can concentrate intensely on interests but may miss other things"
      },
      {
        value: "Panoramic Awareness",
        subheading: "I notice everything around me, sometimes to the point of distraction"
      },
      {
        value: "Context-Dependent",
        subheading: "My attention varies greatly depending on my interest in the subject"
      },
      {
        value: "Multi-Channel Processing",
        subheading: "I can actively manage multiple streams of information simultaneously"
      }
    ]
  }
];

// Add contact information step
export const contactFields = {
  id: 'contact',
  fields: [
    {
      id: 'name',
      label: 'Your Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your full name'
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter your email address'
    },
    {
      id: 'companyName',
      label: 'Company Name',
      type: 'text',
      required: false,
      placeholder: 'Your company name (optional)'
    }
  ]
}; 