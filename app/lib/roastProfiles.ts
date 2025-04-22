export interface RoastProfile {
  id: string;
  name: string;
  description: string;
  tastingNotes: string[];
  matchingCriteria: {
    stage: string[];
    problemSolving: string[];
    primaryTraits: string[];
  };
}

export const roastProfiles: RoastProfile[] = [
  {
    id: "steady-builder",
    name: "Steady Builder Roast",
    description: "A balanced, medium roast that provides consistent energy for methodical problem-solvers and team builders. Perfect for those who appreciate structure and steady progress.",
    tastingNotes: ["Chocolate", "Caramel", "Nutty", "Smooth Finish"],
    matchingCriteria: {
      stage: ["Early Prototype", "Growth Mode"],
      problemSolving: ["Methodical Analyzer", "Collaborative Builder"],
      primaryTraits: ["Structured Approach", "Methodical Planning"]
    }
  },
  {
    id: "bold-visionary",
    name: "Bold Visionary Roast",
    description: "An intense, dark roast that fuels big thinking and breakthrough moments. Ideal for visionary founders pushing boundaries and challenging conventions.",
    tastingNotes: ["Dark Chocolate", "Spices", "Bold Body", "Complex Finish"],
    matchingCriteria: {
      stage: ["Ideation Phase", "Scaling Up"],
      problemSolving: ["Intuitive Visionary", "Rapid Experimenter"],
      primaryTraits: ["Deep Focus Immersion", "Last-Minute Intensity"]
    }
  },
  {
    id: "agile-innovator",
    name: "Agile Innovator Roast",
    description: "A bright, medium-light roast that enhances adaptability and creative thinking. Perfect for founders who thrive on flexibility and rapid iteration.",
    tastingNotes: ["Citrus", "Floral", "Bright Acidity", "Clean Finish"],
    matchingCriteria: {
      stage: ["Early Prototype", "Growth Mode"],
      problemSolving: ["Rapid Experimenter", "Collaborative Builder"],
      primaryTraits: ["Flexible Adaptation", "Multi-Channel Processing"]
    }
  },
  {
    id: "strategic-leader",
    name: "Strategic Leader Roast",
    description: "A sophisticated, medium-dark roast that promotes strategic thinking and sustained focus. Designed for founders scaling operations and building lasting ventures.",
    tastingNotes: ["Dark Fruits", "Maple", "Full Body", "Long Finish"],
    matchingCriteria: {
      stage: ["Growth Mode", "Scaling Up"],
      problemSolving: ["Methodical Analyzer", "Intuitive Visionary"],
      primaryTraits: ["Panoramic Awareness", "Context-Dependent"]
    }
  }
]; 