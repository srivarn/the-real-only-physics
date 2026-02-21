export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  courses: string[];
  experiments: string[];
  milestones: Milestone[];
  prerequisites: string[];
  learningOutcomes: string[];
  thumbnail: string;
  enrolledStudents: number;
  completionRate: number;
  rating: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  requiredCourses: string[];
  requiredExperiments: string[];
  quiz?: string;
  certificate?: string;
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'physics-foundations',
    title: 'Physics Foundations Pathway',
    description: 'Complete beginner\'s journey through fundamental physics concepts, from basic mechanics to modern physics.',
    category: 'General Physics',
    difficulty: 'Beginner',
    estimatedTime: '6 months',
    courses: ['classical-mechanics-fundamentals', 'waves-optics-complete'],
    experiments: ['pendulum-motion', 'light-refraction-prism'],
    prerequisites: ['High school mathematics', 'Basic algebra'],
    learningOutcomes: [
      'Understand fundamental physics principles',
      'Solve basic physics problems',
      'Conduct simple experiments',
      'Apply physics to everyday situations'
    ],
    thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
    enrolledStudents: 25600,
    completionRate: 78,
    rating: 4.8,
    milestones: [
      {
        id: 'milestone1',
        title: 'Mechanics Mastery',
        description: 'Complete understanding of classical mechanics',
        requiredCourses: ['classical-mechanics-fundamentals'],
        requiredExperiments: ['pendulum-motion'],
        certificate: 'Mechanics Foundation Certificate'
      },
      {
        id: 'milestone2',
        title: 'Waves and Light Expert',
        description: 'Master wave phenomena and optics',
        requiredCourses: ['waves-optics-complete'],
        requiredExperiments: ['light-refraction-prism'],
        certificate: 'Waves and Optics Certificate'
      }
    ]
  },
  {
    id: 'engineering-physics',
    title: 'Engineering Physics Mastery',
    description: 'Comprehensive pathway for engineering students covering mechanics, thermodynamics, and electromagnetism.',
    category: 'Engineering',
    difficulty: 'Intermediate',
    estimatedTime: '8 months',
    courses: ['classical-mechanics-fundamentals', 'thermodynamics-engineering', 'electromagnetism-mastery'],
    experiments: ['pendulum-motion', 'electromagnetic-induction', 'sound-wave-interference'],
    prerequisites: ['Calculus', 'Basic physics', 'Engineering mathematics'],
    learningOutcomes: [
      'Apply physics principles to engineering problems',
      'Design and analyze engineering systems',
      'Understand energy conversion processes',
      'Master electromagnetic applications'
    ],
    thumbnail: 'https://images.pexels.com/photos/2280572/pexels-photo-2280572.jpeg',
    enrolledStudents: 18900,
    completionRate: 72,
    rating: 4.7,
    milestones: [
      {
        id: 'eng-milestone1',
        title: 'Mechanical Systems Expert',
        description: 'Master mechanical engineering physics',
        requiredCourses: ['classical-mechanics-fundamentals'],
        requiredExperiments: ['pendulum-motion'],
        certificate: 'Mechanical Engineering Physics Certificate'
      },
      {
        id: 'eng-milestone2',
        title: 'Thermal Systems Specialist',
        description: 'Expert in thermodynamics applications',
        requiredCourses: ['thermodynamics-engineering'],
        requiredExperiments: [],
        certificate: 'Thermal Engineering Certificate'
      }
    ]
  },
  {
    id: 'quantum-journey',
    title: 'Quantum Physics Journey',
    description: 'Advanced pathway exploring quantum mechanics, particle physics, and modern applications.',
    category: 'Modern Physics',
    difficulty: 'Advanced',
    estimatedTime: '12 months',
    courses: ['quantum-physics-intro'],
    experiments: [],
    prerequisites: ['Advanced mathematics', 'Classical physics', 'Linear algebra'],
    learningOutcomes: [
      'Understand quantum mechanical principles',
      'Analyze quantum systems mathematically',
      'Explore quantum technologies',
      'Research quantum applications'
    ],
    thumbnail: 'https://images.pexels.com/photos/2280573/pexels-photo-2280573.jpeg',
    enrolledStudents: 7400,
    completionRate: 65,
    rating: 4.9,
    milestones: [
      {
        id: 'quantum-milestone1',
        title: 'Quantum Fundamentals',
        description: 'Master basic quantum concepts',
        requiredCourses: ['quantum-physics-intro'],
        requiredExperiments: [],
        certificate: 'Quantum Physics Foundation Certificate'
      }
    ]
  }
];

// Generate additional learning paths to reach 120+
const pathCategories = ['General Physics', 'Engineering', 'Medical Physics', 'Astrophysics', 'Computational Physics'];
const pathTitles = [
  'Advanced Mechanics Pathway', 'Electromagnetic Engineering Track', 'Thermal Physics Mastery',
  'Optics and Photonics Journey', 'Nuclear Physics Pathway', 'Particle Physics Track',
  'Condensed Matter Physics', 'Biophysics Applications', 'Environmental Physics',
  'Space Physics Exploration', 'Materials Science Physics', 'Quantum Computing Track'
];

for (let i = 0; i < 117; i++) {
  const category = pathCategories[i % pathCategories.length];
  const baseTitle = pathTitles[i % pathTitles.length];
  const title = `${baseTitle} ${Math.floor(i / pathTitles.length) + 1}`;
  
  LEARNING_PATHS.push({
    id: `path-${i + 3}`,
    title,
    description: `Specialized learning pathway focusing on ${title.toLowerCase()} with comprehensive coverage and practical applications.`,
    category,
    difficulty: ['Beginner', 'Intermediate', 'Advanced'][i % 3] as 'Beginner' | 'Intermediate' | 'Advanced',
    estimatedTime: `${4 + (i % 8)} months`,
    courses: [`course-${(i % 25) + 1}`],
    experiments: [`exp-${(i % 20) + 1}`],
    prerequisites: ['Basic mathematics', 'Physics fundamentals'],
    learningOutcomes: [
      `Master ${title.toLowerCase()} concepts`,
      'Apply knowledge to real-world problems',
      'Develop analytical skills',
      'Understand practical applications'
    ],
    thumbnail: `https://images.pexels.com/photos/${2280571 + (i % 10)}/pexels-photo-${2280571 + (i % 10)}.jpeg`,
    enrolledStudents: 3000 + Math.floor(Math.random() * 15000),
    completionRate: 60 + Math.floor(Math.random() * 25),
    rating: 4.2 + Math.random() * 0.7,
    milestones: [
      {
        id: `milestone-${i}-1`,
        title: `${title} Foundation`,
        description: `Complete the foundational concepts of ${title.toLowerCase()}`,
        requiredCourses: [`course-${(i % 25) + 1}`],
        requiredExperiments: [`exp-${(i % 20) + 1}`],
        certificate: `${title} Foundation Certificate`
      }
    ]
  });
}