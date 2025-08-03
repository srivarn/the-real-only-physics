export interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  votes: number;
  answers: Answer[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
  isSolved: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Answer {
  id: string;
  content: string;
  author: string;
  authorAvatar: string;
  votes: number;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  members: GroupMember[];
  maxMembers: number;
  isPrivate: boolean;
  createdBy: string;
  createdAt: Date;
  lastActivity: Date;
  topics: string[];
  meetingSchedule?: string;
  thumbnail: string;
}

export interface GroupMember {
  id: string;
  username: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  contributions: number;
}

export const COMMUNITY_QUESTIONS: Question[] = [
  {
    id: 'q1',
    title: 'How does quantum entanglement work in simple terms?',
    content: 'I\'m struggling to understand quantum entanglement. Can someone explain it without too much complex math? I understand the basics of quantum mechanics but this concept is confusing me.',
    author: 'PhysicsStudent123',
    authorAvatar: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
    category: 'Quantum Physics',
    tags: ['quantum entanglement', 'quantum mechanics', 'beginner'],
    votes: 45,
    views: 1250,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
    isSolved: true,
    difficulty: 'Intermediate',
    answers: [
      {
        id: 'a1',
        content: 'Think of quantum entanglement like having two magic coins. When you flip one and it lands heads, the other instantly becomes tails, no matter how far apart they are. The particles share a quantum state that connects them instantaneously.',
        author: 'QuantumExpert',
        authorAvatar: 'https://images.pexels.com/photos/2280572/pexels-photo-2280572.jpeg',
        votes: 38,
        isAccepted: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: 'a2',
        content: 'To add to the previous answer, it\'s important to note that this "spooky action at a distance" doesn\'t allow for faster-than-light communication. The correlation is real, but you can\'t control what result you get when measuring your particle.',
        author: 'PhysicsProf',
        authorAvatar: 'https://images.pexels.com/photos/2280573/pexels-photo-2280573.jpeg',
        votes: 22,
        isAccepted: false,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-16')
      }
    ]
  },
  {
    id: 'q2',
    title: 'Why does E=mc² work? What\'s the intuition behind it?',
    content: 'I know the famous equation E=mc², but I don\'t really understand why mass and energy are equivalent. Can someone help me understand the physical intuition behind this relationship?',
    author: 'CuriousLearner',
    authorAvatar: 'https://images.pexels.com/photos/2280574/pexels-photo-2280574.jpeg',
    category: 'Relativity',
    tags: ['einstein', 'mass-energy equivalence', 'relativity'],
    votes: 67,
    views: 2100,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    isSolved: true,
    difficulty: 'Advanced',
    answers: [
      {
        id: 'a3',
        content: 'The key insight is that mass is just another form of energy. When you heat something up, you\'re adding energy and it actually becomes slightly more massive. The c² factor is huge, which means even tiny amounts of mass contain enormous energy - that\'s why nuclear reactions are so powerful.',
        author: 'RelativityGuru',
        authorAvatar: 'https://images.pexels.com/photos/2280575/pexels-photo-2280575.jpeg',
        votes: 54,
        isAccepted: true,
        createdAt: new Date('2024-01-11'),
        updatedAt: new Date('2024-01-11')
      }
    ]
  },
  {
    id: 'q3',
    title: 'How do I calculate the trajectory of a projectile with air resistance?',
    content: 'I can solve projectile motion problems without air resistance, but how do I include air resistance in my calculations? What equations should I use?',
    author: 'MechanicsStudent',
    authorAvatar: 'https://images.pexels.com/photos/2280576/pexels-photo-2280576.jpeg',
    category: 'Mechanics',
    tags: ['projectile motion', 'air resistance', 'differential equations'],
    votes: 31,
    views: 890,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-21'),
    isSolved: false,
    difficulty: 'Advanced',
    answers: [
      {
        id: 'a4',
        content: 'Air resistance is proportional to v² for high speeds. You\'ll need to solve the differential equation: ma = mg - bv² where b is the drag coefficient. This usually requires numerical methods or approximations.',
        author: 'FluidDynamicsExpert',
        authorAvatar: 'https://images.pexels.com/photos/2280577/pexels-photo-2280577.jpeg',
        votes: 18,
        isAccepted: false,
        createdAt: new Date('2024-01-21'),
        updatedAt: new Date('2024-01-21')
      }
    ]
  }
];

// Generate additional questions to reach 120+
const questionCategories = ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum Physics', 'Relativity', 'Waves and Optics'];
const questionTemplates = [
  'How do I solve problems involving',
  'What is the physical meaning of',
  'Can someone explain why',
  'What are the applications of',
  'How does this relate to',
  'What\'s the difference between'
];

for (let i = 0; i < 117; i++) {
  const category = questionCategories[i % questionCategories.length];
  const template = questionTemplates[i % questionTemplates.length];
  const topic = `${category.toLowerCase()} concept ${i + 1}`;
  
  COMMUNITY_QUESTIONS.push({
    id: `q${i + 4}`,
    title: `${template} ${topic}?`,
    content: `I'm having trouble understanding ${topic}. Could someone provide a clear explanation with examples?`,
    author: `User${i + 100}`,
    authorAvatar: `https://images.pexels.com/photos/${2280571 + (i % 20)}/pexels-photo-${2280571 + (i % 20)}.jpeg`,
    category,
    tags: [category.toLowerCase(), 'help', 'explanation'],
    votes: Math.floor(Math.random() * 100),
    views: Math.floor(Math.random() * 3000),
    createdAt: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
    updatedAt: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
    isSolved: Math.random() > 0.3,
    difficulty: ['Beginner', 'Intermediate', 'Advanced'][i % 3] as 'Beginner' | 'Intermediate' | 'Advanced',
    answers: []
  });
}

export const STUDY_GROUPS: StudyGroup[] = [
  {
    id: 'sg1',
    name: 'Quantum Physics Study Circle',
    description: 'Weekly discussions on quantum mechanics concepts, problem-solving sessions, and research paper reviews.',
    category: 'Quantum Physics',
    maxMembers: 15,
    isPrivate: false,
    createdBy: 'QuantumExpert',
    createdAt: new Date('2024-01-01'),
    lastActivity: new Date('2024-01-25'),
    topics: ['Quantum entanglement', 'Schrödinger equation', 'Quantum computing'],
    meetingSchedule: 'Wednesdays 7 PM EST',
    thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
    members: [
      {
        id: 'm1',
        username: 'QuantumExpert',
        avatar: 'https://images.pexels.com/photos/2280572/pexels-photo-2280572.jpeg',
        role: 'admin',
        joinedAt: new Date('2024-01-01'),
        contributions: 45
      },
      {
        id: 'm2',
        username: 'PhysicsStudent123',
        avatar: 'https://images.pexels.com/photos/2280573/pexels-photo-2280573.jpeg',
        role: 'member',
        joinedAt: new Date('2024-01-05'),
        contributions: 12
      }
    ]
  },
  {
    id: 'sg2',
    name: 'Engineering Physics Problem Solvers',
    description: 'Collaborative problem-solving group for engineering physics students. Share solutions and study together.',
    category: 'Engineering Physics',
    maxMembers: 25,
    isPrivate: false,
    createdBy: 'EngineeringPhysicsGuru',
    createdAt: new Date('2024-01-05'),
    lastActivity: new Date('2024-01-24'),
    topics: ['Mechanics problems', 'Thermodynamics applications', 'Circuit analysis'],
    meetingSchedule: 'Saturdays 2 PM EST',
    thumbnail: 'https://images.pexels.com/photos/2280574/pexels-photo-2280574.jpeg',
    members: [
      {
        id: 'm3',
        username: 'EngineeringPhysicsGuru',
        avatar: 'https://images.pexels.com/photos/2280575/pexels-photo-2280575.jpeg',
        role: 'admin',
        joinedAt: new Date('2024-01-05'),
        contributions: 38
      }
    ]
  }
];

// Generate additional study groups to reach 120+
const groupCategories = ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum Physics', 'Astrophysics'];
const groupTypes = [
  'Study Circle', 'Problem Solvers', 'Research Group', 'Discussion Forum', 'Lab Partners',
  'Exam Prep Team', 'Project Collaborators', 'Theory Explorers', 'Application Specialists'
];

for (let i = 0; i < 118; i++) {
  const category = groupCategories[i % groupCategories.length];
  const type = groupTypes[i % groupTypes.length];
  const name = `${category} ${type} ${Math.floor(i / groupTypes.length) + 1}`;
  
  STUDY_GROUPS.push({
    id: `sg${i + 3}`,
    name,
    description: `Collaborative learning group focused on ${category.toLowerCase()} with regular meetings and shared resources.`,
    category,
    maxMembers: 10 + Math.floor(Math.random() * 20),
    isPrivate: Math.random() > 0.7,
    createdBy: `GroupLeader${i + 100}`,
    createdAt: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
    lastActivity: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
    topics: [`${category} fundamentals`, `${category} applications`, `${category} problems`],
    meetingSchedule: `${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i % 7]}s ${Math.floor(Math.random() * 12) + 1} PM EST`,
    thumbnail: `https://images.pexels.com/photos/${2280571 + (i % 20)}/pexels-photo-${2280571 + (i % 20)}.jpeg`,
    members: [
      {
        id: `m${i + 100}`,
        username: `GroupLeader${i + 100}`,
        avatar: `https://images.pexels.com/photos/${2280571 + (i % 20)}/pexels-photo-${2280571 + (i % 20)}.jpeg`,
        role: 'admin',
        joinedAt: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
        contributions: Math.floor(Math.random() * 50)
      }
    ]
  });
}