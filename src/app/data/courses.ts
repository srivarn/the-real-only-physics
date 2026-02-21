export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
  rating: number;
  enrolledStudents: number;
  price: number;
  isFree: boolean;
  modules: CourseModule[];
  prerequisites: string[];
  learningOutcomes: string[];
  tags: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  quiz?: Quiz;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'simulation' | 'quiz';
  duration: string;
  content: string;
  videoUrl?: string;
  completed: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export const PHYSICS_COURSES: Course[] = [
  {
    id: 'classical-mechanics-fundamentals',
    title: 'Classical Mechanics Fundamentals',
    description: 'Master the foundations of classical mechanics including kinematics, dynamics, energy, and momentum with hands-on problem solving.',
    instructor: 'Dr. Sarah Johnson',
    duration: '8 weeks',
    level: 'Beginner',
    category: 'Mechanics',
    thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
    rating: 4.8,
    enrolledStudents: 15420,
    price: 99,
    isFree: false,
    prerequisites: ['Basic algebra', 'Trigonometry'],
    learningOutcomes: [
      'Understand Newton\'s laws of motion',
      'Solve kinematics problems',
      'Apply conservation of energy and momentum',
      'Analyze rotational motion'
    ],
    tags: ['mechanics', 'physics', 'fundamentals'],
    modules: [
      {
        id: 'mod1',
        title: 'Introduction to Motion',
        description: 'Learn the basics of motion, velocity, and acceleration',
        duration: '1 week',
        lessons: [
          {
            id: 'lesson1',
            title: 'What is Motion?',
            type: 'video',
            duration: '15 min',
            content: 'Introduction to the concept of motion in physics',
            videoUrl: 'https://example.com/video1',
            completed: false
          },
          {
            id: 'lesson2',
            title: 'Velocity and Acceleration',
            type: 'video',
            duration: '20 min',
            content: 'Understanding velocity and acceleration concepts',
            videoUrl: 'https://example.com/video2',
            completed: false
          }
        ],
        quiz: {
          id: 'quiz1',
          title: 'Motion Basics Quiz',
          passingScore: 70,
          timeLimit: 30,
          questions: [
            {
              id: 'q1',
              question: 'What is the SI unit of velocity?',
              type: 'multiple-choice',
              options: ['m/s', 'km/h', 'm/s²', 'N'],
              correctAnswer: 0,
              explanation: 'Velocity is measured in meters per second (m/s) in the SI system.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'quantum-physics-intro',
    title: 'Introduction to Quantum Physics',
    description: 'Explore the fascinating world of quantum mechanics, from wave-particle duality to quantum entanglement.',
    instructor: 'Prof. Michael Chen',
    duration: '12 weeks',
    level: 'Advanced',
    category: 'Modern Physics',
    thumbnail: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
    rating: 4.9,
    enrolledStudents: 8750,
    price: 149,
    isFree: false,
    prerequisites: ['Classical mechanics', 'Calculus', 'Linear algebra'],
    learningOutcomes: [
      'Understand quantum mechanical principles',
      'Solve Schrödinger equation problems',
      'Analyze quantum systems',
      'Apply quantum mechanics to real-world problems'
    ],
    tags: ['quantum', 'modern physics', 'advanced'],
    modules: []
  },
  {
    id: 'electromagnetism-mastery',
    title: 'Electromagnetism Mastery',
    description: 'Complete guide to electric and magnetic fields, circuits, and electromagnetic waves.',
    instructor: 'Dr. Emily Rodriguez',
    duration: '10 weeks',
    level: 'Intermediate',
    category: 'Electromagnetism',
    thumbnail: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg',
    rating: 4.7,
    enrolledStudents: 12300,
    price: 119,
    isFree: false,
    prerequisites: ['Basic physics', 'Calculus'],
    learningOutcomes: [
      'Master electric and magnetic field concepts',
      'Analyze complex circuits',
      'Understand electromagnetic waves',
      'Apply Maxwell\'s equations'
    ],
    tags: ['electromagnetism', 'circuits', 'fields'],
    modules: []
  },
  {
    id: 'thermodynamics-engineering',
    title: 'Thermodynamics for Engineers',
    description: 'Practical thermodynamics with real-world engineering applications and problem-solving techniques.',
    instructor: 'Prof. David Kim',
    duration: '6 weeks',
    level: 'Intermediate',
    category: 'Thermodynamics',
    thumbnail: 'https://images.pexels.com/photos/2280570/pexels-photo-2280570.jpeg',
    rating: 4.6,
    enrolledStudents: 9850,
    price: 89,
    isFree: false,
    prerequisites: ['Basic physics', 'Chemistry'],
    learningOutcomes: [
      'Understand thermodynamic laws',
      'Analyze heat engines and refrigerators',
      'Calculate entropy and enthalpy',
      'Design thermal systems'
    ],
    tags: ['thermodynamics', 'engineering', 'heat'],
    modules: []
  },
  {
    id: 'waves-optics-complete',
    title: 'Waves and Optics Complete Guide',
    description: 'Comprehensive study of wave phenomena, sound, light, and optical instruments.',
    instructor: 'Dr. Lisa Wang',
    duration: '8 weeks',
    level: 'Intermediate',
    category: 'Waves and Optics',
    thumbnail: 'https://images.pexels.com/photos/2280572/pexels-photo-2280572.jpeg',
    rating: 4.8,
    enrolledStudents: 11200,
    price: 109,
    isFree: false,
    prerequisites: ['Basic physics', 'Trigonometry'],
    learningOutcomes: [
      'Understand wave properties and behavior',
      'Analyze sound and light phenomena',
      'Design optical systems',
      'Apply wave interference principles'
    ],
    tags: ['waves', 'optics', 'light', 'sound'],
    modules: []
  }
];

// Generate additional courses to reach 120+
const additionalCourses = [
  'Advanced Quantum Mechanics',
  'Particle Physics Fundamentals',
  'Astrophysics and Cosmology',
  'Nuclear Physics Applications',
  'Solid State Physics',
  'Plasma Physics',
  'Biophysics Essentials',
  'Computational Physics',
  'Statistical Mechanics',
  'Fluid Dynamics',
  'Acoustics and Sound Engineering',
  'Laser Physics and Applications',
  'Semiconductor Physics',
  'Superconductivity',
  'Magnetic Resonance Imaging Physics',
  'Medical Physics',
  'Environmental Physics',
  'Geophysics Fundamentals',
  'Atmospheric Physics',
  'Ocean Physics',
  'Space Physics',
  'High Energy Physics',
  'Condensed Matter Physics',
  'Materials Science Physics',
  'Nanotechnology Physics'
];

// Add generated courses
additionalCourses.forEach((title, index) => {
  const categories = ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Modern Physics', 'Waves and Optics'];
  const levels: ('Beginner' | 'Intermediate' | 'Advanced')[] = ['Beginner', 'Intermediate', 'Advanced'];
  const instructors = ['Dr. Sarah Johnson', 'Prof. Michael Chen', 'Dr. Emily Rodriguez', 'Prof. David Kim', 'Dr. Lisa Wang'];
  
  PHYSICS_COURSES.push({
    id: `course-${index + 6}`,
    title,
    description: `Comprehensive study of ${title.toLowerCase()} with practical applications and problem-solving techniques.`,
    instructor: instructors[index % instructors.length],
    duration: `${6 + (index % 8)} weeks`,
    level: levels[index % 3],
    category: categories[index % categories.length],
    thumbnail: `https://images.pexels.com/photos/${2280570 + (index % 10)}/pexels-photo-${2280570 + (index % 10)}.jpeg`,
    rating: 4.5 + (Math.random() * 0.5),
    enrolledStudents: 5000 + Math.floor(Math.random() * 10000),
    price: 79 + (index % 5) * 20,
    isFree: index % 10 === 0,
    prerequisites: ['Basic physics'],
    learningOutcomes: [
      `Master ${title.toLowerCase()} concepts`,
      'Apply theoretical knowledge to practical problems',
      'Develop problem-solving skills',
      'Understand real-world applications'
    ],
    tags: [title.toLowerCase().replace(/\s+/g, '-')],
    modules: []
  });
});