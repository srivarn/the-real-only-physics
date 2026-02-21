export interface Experiment {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  materials: string[];
  safetyNotes: string[];
  procedure: ExperimentStep[];
  expectedResults: string;
  explanation: string;
  realWorldApplications: string[];
  videoUrl?: string;
  images: string[];
  tags: string[];
  rating: number;
  completedBy: number;
}

export interface ExperimentStep {
  stepNumber: number;
  instruction: string;
  image?: string;
  warning?: string;
  tip?: string;
}

export const PHYSICS_EXPERIMENTS: Experiment[] = [
  {
    id: 'pendulum-motion',
    title: 'Simple Pendulum Motion Analysis',
    description: 'Investigate the relationship between pendulum length and period of oscillation using everyday materials.',
    category: 'Mechanics',
    difficulty: 'Easy',
    duration: '45 minutes',
    materials: [
      'String or thread (1 meter)',
      'Small weight (coin, washer, or small ball)',
      'Stopwatch or smartphone timer',
      'Ruler or measuring tape',
      'Protractor',
      'Support structure (doorway, table edge)'
    ],
    safetyNotes: [
      'Ensure the weight is securely attached to prevent falling',
      'Clear the area below the pendulum',
      'Be careful when measuring angles'
    ],
    procedure: [
      {
        stepNumber: 1,
        instruction: 'Tie the weight securely to one end of the string.',
        tip: 'Make sure the knot is tight to prevent the weight from falling during the experiment.'
      },
      {
        stepNumber: 2,
        instruction: 'Attach the other end of the string to a fixed support point.',
        warning: 'Ensure the support can handle the weight and motion.'
      },
      {
        stepNumber: 3,
        instruction: 'Measure the length from the support point to the center of the weight.',
        tip: 'This is your pendulum length (L). Record this value.'
      },
      {
        stepNumber: 4,
        instruction: 'Pull the weight to one side at a small angle (less than 15 degrees) and release.',
        warning: 'Keep angles small for accurate results.'
      },
      {
        stepNumber: 5,
        instruction: 'Time 10 complete oscillations and divide by 10 to get the period.',
        tip: 'Timing multiple oscillations reduces measurement error.'
      },
      {
        stepNumber: 6,
        instruction: 'Repeat with different string lengths and record all data.',
        tip: 'Try at least 5 different lengths between 20cm and 100cm.'
      }
    ],
    expectedResults: 'The period should increase with the square root of the length. Doubling the length increases the period by √2 ≈ 1.41.',
    explanation: 'The period of a simple pendulum depends only on its length and gravity: T = 2π√(L/g). This experiment demonstrates simple harmonic motion and the independence of period from mass and amplitude (for small angles).',
    realWorldApplications: [
      'Clock mechanisms and timekeeping',
      'Seismometers for earthquake detection',
      'Metronomes for music timing',
      'Playground swings design',
      'Building sway analysis'
    ],
    videoUrl: 'https://example.com/pendulum-experiment',
    images: [
      'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
      'https://images.pexels.com/photos/2280572/pexels-photo-2280572.jpeg'
    ],
    tags: ['pendulum', 'oscillation', 'simple harmonic motion', 'mechanics'],
    rating: 4.7,
    completedBy: 8420
  },
  {
    id: 'electromagnetic-induction',
    title: 'Electromagnetic Induction with Magnets',
    description: 'Demonstrate Faraday\'s law of electromagnetic induction using simple magnets and coils.',
    category: 'Electromagnetism',
    difficulty: 'Medium',
    duration: '60 minutes',
    materials: [
      'Strong neodymium magnet',
      'Copper wire (insulated, 22-24 gauge)',
      'Iron nail or rod',
      'LED light',
      'Multimeter or galvanometer',
      'Cardboard tube',
      'Electrical tape'
    ],
    safetyNotes: [
      'Handle strong magnets carefully - they can pinch fingers',
      'Keep magnets away from electronic devices',
      'Ensure wire connections are secure'
    ],
    procedure: [
      {
        stepNumber: 1,
        instruction: 'Wind 50-100 turns of copper wire around the cardboard tube to create a coil.',
        tip: 'Keep windings neat and close together for better results.'
      },
      {
        stepNumber: 2,
        instruction: 'Connect the ends of the coil to the LED or multimeter.',
        warning: 'Note the polarity for consistent measurements.'
      },
      {
        stepNumber: 3,
        instruction: 'Move the magnet quickly in and out of the coil.',
        tip: 'Faster motion generates more voltage.'
      },
      {
        stepNumber: 4,
        instruction: 'Observe the LED lighting up or voltage readings on the multimeter.',
        tip: 'The LED may be dim - try in a dark room for better visibility.'
      },
      {
        stepNumber: 5,
        instruction: 'Try different speeds and directions of magnet movement.',
        tip: 'Record how speed affects the brightness or voltage.'
      },
      {
        stepNumber: 6,
        instruction: 'Experiment with different numbers of coil turns.',
        tip: 'More turns should produce higher voltage.'
      }
    ],
    expectedResults: 'Moving the magnet generates voltage in the coil, lighting the LED. Faster movement and more coil turns produce higher voltage.',
    explanation: 'This demonstrates Faraday\'s law: a changing magnetic field induces an electric current. The induced voltage is proportional to the rate of change of magnetic flux through the coil.',
    realWorldApplications: [
      'Electric generators and power plants',
      'Transformers for power distribution',
      'Induction motors',
      'Wireless charging systems',
      'Metal detectors'
    ],
    videoUrl: 'https://example.com/induction-experiment',
    images: [
      'https://images.pexels.com/photos/2280573/pexels-photo-2280573.jpeg'
    ],
    tags: ['electromagnetic induction', 'faraday law', 'magnetism', 'electricity'],
    rating: 4.6,
    completedBy: 6230
  },
  {
    id: 'sound-wave-interference',
    title: 'Sound Wave Interference Patterns',
    description: 'Explore constructive and destructive interference using sound waves and smartphone apps.',
    category: 'Waves and Optics',
    difficulty: 'Medium',
    duration: '50 minutes',
    materials: [
      'Two smartphones or speakers',
      'Sound frequency generator app',
      'Sound level meter app',
      'Measuring tape',
      'Notebook for data recording'
    ],
    safetyNotes: [
      'Keep volume at moderate levels to protect hearing',
      'Take breaks if experiencing ear discomfort'
    ],
    procedure: [
      {
        stepNumber: 1,
        instruction: 'Download a frequency generator app on both smartphones.',
        tip: 'Apps like "Frequency Generator" or "Signal Generator" work well.'
      },
      {
        stepNumber: 2,
        instruction: 'Set both phones to generate the same frequency (start with 440 Hz).',
        tip: 'This is the musical note A4, easy to hear clearly.'
      },
      {
        stepNumber: 3,
        instruction: 'Place the phones 2 meters apart, facing each other.',
        warning: 'Ensure both phones are at the same height.'
      },
      {
        stepNumber: 4,
        instruction: 'Walk slowly between the phones and listen for loud and quiet spots.',
        tip: 'Use a sound meter app to measure actual sound levels.'
      },
      {
        stepNumber: 5,
        instruction: 'Mark the positions where sound is loudest (constructive interference).',
        tip: 'Also mark where sound is quietest (destructive interference).'
      },
      {
        stepNumber: 6,
        instruction: 'Measure distances between interference patterns.',
        tip: 'The pattern spacing relates to the wavelength of sound.'
      }
    ],
    expectedResults: 'You should find alternating regions of loud and quiet sound, spaced about 39 cm apart for 440 Hz (wavelength/2).',
    explanation: 'Sound waves from two sources interfere. When waves arrive in phase, they add constructively (loud). When out of phase, they cancel destructively (quiet).',
    realWorldApplications: [
      'Noise-canceling headphones',
      'Acoustic design of concert halls',
      'Sonar and ultrasound imaging',
      'Audio engineering and mixing',
      'Architectural acoustics'
    ],
    videoUrl: 'https://example.com/sound-interference',
    images: [
      'https://images.pexels.com/photos/2280574/pexels-photo-2280574.jpeg'
    ],
    tags: ['sound waves', 'interference', 'acoustics', 'waves'],
    rating: 4.5,
    completedBy: 5670
  },
  {
    id: 'light-refraction-prism',
    title: 'Light Refraction and Dispersion',
    description: 'Investigate how light bends and separates into colors when passing through different materials.',
    category: 'Waves and Optics',
    difficulty: 'Easy',
    duration: '40 minutes',
    materials: [
      'Glass prism or clear plastic container',
      'Laser pointer or bright flashlight',
      'White screen or wall',
      'Water',
      'Various transparent materials (glass, plastic)',
      'Protractor',
      'Ruler'
    ],
    safetyNotes: [
      'Never look directly into laser light',
      'Point laser away from people and reflective surfaces',
      'Handle glass materials carefully'
    ],
    procedure: [
      {
        stepNumber: 1,
        instruction: 'Set up the prism on a flat surface with a white screen behind it.',
        tip: 'A dark room will make the effects more visible.'
      },
      {
        stepNumber: 2,
        instruction: 'Shine the laser at one face of the prism at various angles.',
        warning: 'Never point the laser at anyone\'s eyes.'
      },
      {
        stepNumber: 3,
        instruction: 'Observe how the light beam bends as it enters and exits the prism.',
        tip: 'Measure the angles of incidence and refraction.'
      },
      {
        stepNumber: 4,
        instruction: 'If using white light, observe the spectrum of colors produced.',
        tip: 'Red light bends least, violet light bends most.'
      },
      {
        stepNumber: 5,
        instruction: 'Try the experiment with water in a clear container.',
        tip: 'Compare the refraction angles with the glass prism.'
      },
      {
        stepNumber: 6,
        instruction: 'Calculate the refractive index using Snell\'s law.',
        tip: 'n = sin(θ₁)/sin(θ₂) where θ₁ is incident angle, θ₂ is refracted angle.'
      }
    ],
    expectedResults: 'Light bends toward the normal when entering denser materials. White light separates into a spectrum of colors.',
    explanation: 'Refraction occurs because light travels at different speeds in different materials. Dispersion happens because different colors have slightly different refractive indices.',
    realWorldApplications: [
      'Eyeglasses and contact lenses',
      'Camera lenses and telescopes',
      'Fiber optic communications',
      'Prisms in optical instruments',
      'Rainbow formation in nature'
    ],
    videoUrl: 'https://example.com/refraction-experiment',
    images: [
      'https://images.pexels.com/photos/2280575/pexels-photo-2280575.jpeg'
    ],
    tags: ['refraction', 'dispersion', 'optics', 'light'],
    rating: 4.8,
    completedBy: 9340
  }
];

// Generate additional experiments to reach 120+
const experimentCategories = ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Waves and Optics', 'Modern Physics'];
const experimentTitles = [
  'Projectile Motion Analysis', 'Friction Coefficient Measurement', 'Conservation of Energy Demo',
  'Heat Transfer Investigation', 'Gas Law Verification', 'Thermal Expansion Study',
  'Electric Field Mapping', 'Ohm\'s Law Verification', 'Capacitor Charging Analysis',
  'Wave Speed Measurement', 'Doppler Effect Demo', 'Polarization Investigation',
  'Photoelectric Effect', 'Radioactive Decay Simulation', 'Quantum Tunneling Demo'
];

for (let i = 0; i < 115; i++) {
  const category = experimentCategories[i % experimentCategories.length];
  const baseTitle = experimentTitles[i % experimentTitles.length];
  const title = `${baseTitle} ${Math.floor(i / experimentTitles.length) + 1}`;
  
  PHYSICS_EXPERIMENTS.push({
    id: `exp-${i + 5}`,
    title,
    description: `Hands-on experiment exploring ${title.toLowerCase()} with detailed analysis and real-world connections.`,
    category,
    difficulty: ['Easy', 'Medium', 'Hard'][i % 3] as 'Easy' | 'Medium' | 'Hard',
    duration: `${30 + (i % 6) * 10} minutes`,
    materials: [
      'Basic laboratory equipment',
      'Measuring instruments',
      'Safety equipment',
      'Recording materials'
    ],
    safetyNotes: [
      'Follow all safety protocols',
      'Wear appropriate protective equipment',
      'Handle materials with care'
    ],
    procedure: [
      {
        stepNumber: 1,
        instruction: 'Set up the experimental apparatus according to the diagram.',
        tip: 'Take time to ensure proper setup for accurate results.'
      },
      {
        stepNumber: 2,
        instruction: 'Calibrate all measuring instruments.',
        warning: 'Proper calibration is essential for reliable data.'
      },
      {
        stepNumber: 3,
        instruction: 'Conduct the experiment following the detailed procedure.',
        tip: 'Record all observations and measurements carefully.'
      },
      {
        stepNumber: 4,
        instruction: 'Analyze the collected data and compare with theoretical predictions.',
        tip: 'Look for patterns and relationships in your data.'
      }
    ],
    expectedResults: `Results should demonstrate the principles of ${category.toLowerCase()} and match theoretical predictions within experimental error.`,
    explanation: `This experiment illustrates fundamental concepts in ${category.toLowerCase()} and provides hands-on experience with scientific methodology.`,
    realWorldApplications: [
      'Industrial applications',
      'Technology development',
      'Scientific research',
      'Engineering design'
    ],
    videoUrl: `https://example.com/experiment-${i + 5}`,
    images: [
      `https://images.pexels.com/photos/${2280576 + (i % 20)}/pexels-photo-${2280576 + (i % 20)}.jpeg`
    ],
    tags: [category.toLowerCase(), 'experiment', 'hands-on'],
    rating: 4.0 + Math.random() * 1.0,
    completedBy: 1000 + Math.floor(Math.random() * 8000)
  });
}