export interface PhysicsFormula {
  id: string;
  name: string;
  formula: string;
  description: string;
  realLifeUse: string;
  meaning: string;
  topic: string;
  subtopic: string;
  units: string;
  variables: { [key: string]: string };
}

export const PHYSICS_FORMULAS: PhysicsFormula[] = [
  // MECHANICS - KINEMATICS
  {
    id: 'velocity',
    name: 'Velocity',
    formula: 'v = Δx/Δt',
    description: 'The rate of change of displacement with respect to time',
    realLifeUse: 'Used in speedometers, GPS navigation, sports analysis, and traffic monitoring',
    meaning: 'Velocity tells us how fast an object is moving and in what direction',
    topic: 'Mechanics',
    subtopic: 'Kinematics',
    units: 'm/s',
    variables: {
      'v': 'velocity',
      'Δx': 'change in displacement',
      'Δt': 'change in time'
    }
  },
  {
    id: 'acceleration',
    name: 'Acceleration',
    formula: 'a = Δv/Δt',
    description: 'The rate of change of velocity with respect to time',
    realLifeUse: 'Used in car safety systems, roller coaster design, and sports performance analysis',
    meaning: 'Acceleration measures how quickly an object\'s speed or direction is changing',
    topic: 'Mechanics',
    subtopic: 'Kinematics',
    units: 'm/s²',
    variables: {
      'a': 'acceleration',
      'Δv': 'change in velocity',
      'Δt': 'change in time'
    }
  },
  {
    id: 'displacement',
    name: 'Displacement',
    formula: 's = v₀t + ½at²',
    description: 'The change in position of an object',
    realLifeUse: 'Used in navigation systems, robotics, and motion planning',
    meaning: 'Displacement is the straight-line distance from start to finish position',
    topic: 'Mechanics',
    subtopic: 'Kinematics',
    units: 'm',
    variables: {
      's': 'displacement',
      'v₀': 'initial velocity',
      't': 'time',
      'a': 'acceleration'
    }
  },
  {
    id: 'free-fall',
    name: 'Free Fall Distance',
    formula: 'h = ½gt²',
    description: 'Distance fallen under gravity from rest',
    realLifeUse: 'Used in skydiving, bungee jumping, and amusement park rides',
    meaning: 'This formula describes how objects accelerate when falling under gravity',
    topic: 'Mechanics',
    subtopic: 'Kinematics',
    units: 'm',
    variables: {
      'h': 'height fallen',
      'g': 'acceleration due to gravity (9.8 m/s²)',
      't': 'time'
    }
  },
  {
    id: 'projectile-range',
    name: 'Projectile Range',
    formula: 'R = (v₀²sin(2θ))/g',
    description: 'Maximum horizontal distance of a projectile',
    realLifeUse: 'Used in artillery, sports (golf, baseball), and fireworks displays',
    meaning: 'This gives the maximum distance a projectile can travel horizontally',
    topic: 'Mechanics',
    subtopic: 'Kinematics',
    units: 'm',
    variables: {
      'R': 'range',
      'v₀': 'initial velocity',
      'θ': 'launch angle',
      'g': 'acceleration due to gravity'
    }
  },

  // MECHANICS - DYNAMICS
  {
    id: 'newton-second',
    name: 'Newton\'s Second Law',
    formula: 'F = ma',
    description: 'Force equals mass times acceleration',
    realLifeUse: 'Used in car crash testing, rocket propulsion, and sports equipment design',
    meaning: 'This fundamental law relates force to the motion it produces',
    topic: 'Mechanics',
    subtopic: 'Dynamics',
    units: 'N (kg·m/s²)',
    variables: {
      'F': 'force',
      'm': 'mass',
      'a': 'acceleration'
    }
  },
  {
    id: 'weight',
    name: 'Weight',
    formula: 'W = mg',
    description: 'The gravitational force on an object',
    realLifeUse: 'Used in scales, elevators, and weight measurement devices',
    meaning: 'Weight is the force of gravity acting on an object\'s mass',
    topic: 'Mechanics',
    subtopic: 'Dynamics',
    units: 'N',
    variables: {
      'W': 'weight',
      'm': 'mass',
      'g': 'acceleration due to gravity'
    }
  },
  {
    id: 'friction',
    name: 'Friction Force',
    formula: 'f = μN',
    description: 'Friction force equals coefficient of friction times normal force',
    realLifeUse: 'Used in brake systems, tire design, and walking surfaces',
    meaning: 'Friction opposes motion and depends on the surfaces in contact',
    topic: 'Mechanics',
    subtopic: 'Dynamics',
    units: 'N',
    variables: {
      'f': 'friction force',
      'μ': 'coefficient of friction',
      'N': 'normal force'
    }
  },
  {
    id: 'centripetal-force',
    name: 'Centripetal Force',
    formula: 'F = mv²/r',
    description: 'Force required for circular motion',
    realLifeUse: 'Used in roller coasters, car turning, and satellite orbits',
    meaning: 'This force keeps objects moving in a circular path',
    topic: 'Mechanics',
    subtopic: 'Dynamics',
    units: 'N',
    variables: {
      'F': 'centripetal force',
      'm': 'mass',
      'v': 'velocity',
      'r': 'radius of circular path'
    }
  },

  // MECHANICS - ENERGY
  {
    id: 'kinetic-energy',
    name: 'Kinetic Energy',
    formula: 'KE = ½mv²',
    description: 'Energy of motion',
    realLifeUse: 'Used in car crash analysis, wind turbines, and sports impact studies',
    meaning: 'Kinetic energy represents the energy an object has due to its motion',
    topic: 'Mechanics',
    subtopic: 'Energy',
    units: 'J',
    variables: {
      'KE': 'kinetic energy',
      'm': 'mass',
      'v': 'velocity'
    }
  },
  {
    id: 'potential-energy',
    name: 'Gravitational Potential Energy',
    formula: 'PE = mgh',
    description: 'Energy due to height in a gravitational field',
    realLifeUse: 'Used in hydroelectric dams, roller coasters, and weight lifting',
    meaning: 'Potential energy represents stored energy due to position',
    topic: 'Mechanics',
    subtopic: 'Energy',
    units: 'J',
    variables: {
      'PE': 'potential energy',
      'm': 'mass',
      'g': 'acceleration due to gravity',
      'h': 'height'
    }
  },
  {
    id: 'work',
    name: 'Work',
    formula: 'W = Fd cos(θ)',
    description: 'Work equals force times displacement times cosine of angle',
    realLifeUse: 'Used in engines, muscles, and mechanical systems',
    meaning: 'Work is the energy transferred by a force acting through a distance',
    topic: 'Mechanics',
    subtopic: 'Energy',
    units: 'J',
    variables: {
      'W': 'work',
      'F': 'force',
      'd': 'displacement',
      'θ': 'angle between force and displacement'
    }
  },
  {
    id: 'power',
    name: 'Power',
    formula: 'P = W/t',
    description: 'Power equals work divided by time',
    realLifeUse: 'Used in engines, electrical devices, and human performance',
    meaning: 'Power measures how quickly energy is transferred or work is done',
    topic: 'Mechanics',
    subtopic: 'Energy',
    units: 'W (J/s)',
    variables: {
      'P': 'power',
      'W': 'work',
      't': 'time'
    }
  },

  // MECHANICS - MOMENTUM
  {
    id: 'momentum',
    name: 'Linear Momentum',
    formula: 'p = mv',
    description: 'Momentum equals mass times velocity',
    realLifeUse: 'Used in car crashes, sports collisions, and particle physics',
    meaning: 'Momentum is a measure of how difficult it is to stop an object',
    topic: 'Mechanics',
    subtopic: 'Momentum',
    units: 'kg·m/s',
    variables: {
      'p': 'momentum',
      'm': 'mass',
      'v': 'velocity'
    }
  },
  {
    id: 'impulse',
    name: 'Impulse',
    formula: 'J = FΔt',
    description: 'Impulse equals force times time',
    realLifeUse: 'Used in airbags, padding design, and sports equipment',
    meaning: 'Impulse is the change in momentum and relates to collision safety',
    topic: 'Mechanics',
    subtopic: 'Momentum',
    units: 'N·s',
    variables: {
      'J': 'impulse',
      'F': 'force',
      'Δt': 'time interval'
    }
  },

  // THERMODYNAMICS
  {
    id: 'ideal-gas-law',
    name: 'Ideal Gas Law',
    formula: 'PV = nRT',
    description: 'Pressure times volume equals moles times gas constant times temperature',
    realLifeUse: 'Used in engines, weather systems, and industrial processes',
    meaning: 'This law describes the relationship between pressure, volume, and temperature of gases',
    topic: 'Thermodynamics',
    subtopic: 'Gas Laws',
    units: 'Various',
    variables: {
      'P': 'pressure',
      'V': 'volume',
      'n': 'number of moles',
      'R': 'gas constant',
      'T': 'temperature'
    }
  },
  {
    id: 'heat-capacity',
    name: 'Heat Capacity',
    formula: 'Q = mcΔT',
    description: 'Heat equals mass times specific heat times temperature change',
    realLifeUse: 'Used in heating systems, cooking, and thermal management',
    meaning: 'This formula calculates the heat needed to change an object\'s temperature',
    topic: 'Thermodynamics',
    subtopic: 'Heat Transfer',
    units: 'J',
    variables: {
      'Q': 'heat',
      'm': 'mass',
      'c': 'specific heat capacity',
      'ΔT': 'temperature change'
    }
  },

  // ELECTROMAGNETISM
  {
    id: 'coulombs-law',
    name: 'Coulomb\'s Law',
    formula: 'F = k(q₁q₂)/r²',
    description: 'Electric force between two charges',
    realLifeUse: 'Used in electronics, static electricity, and particle accelerators',
    meaning: 'This law describes the force between electrically charged particles',
    topic: 'Electromagnetism',
    subtopic: 'Electric Fields',
    units: 'N',
    variables: {
      'F': 'electric force',
      'k': 'Coulomb\'s constant',
      'q₁, q₂': 'charges',
      'r': 'distance between charges'
    }
  },
  {
    id: 'ohms-law',
    name: 'Ohm\'s Law',
    formula: 'V = IR',
    description: 'Voltage equals current times resistance',
    realLifeUse: 'Used in electrical circuits, electronics, and power systems',
    meaning: 'This fundamental law relates voltage, current, and resistance in circuits',
    topic: 'Electromagnetism',
    subtopic: 'Electric Circuits',
    units: 'V',
    variables: {
      'V': 'voltage',
      'I': 'current',
      'R': 'resistance'
    }
  },
  {
    id: 'magnetic-force',
    name: 'Magnetic Force',
    formula: 'F = qvB sin(θ)',
    description: 'Magnetic force on a moving charge',
    realLifeUse: 'Used in electric motors, particle accelerators, and MRI machines',
    meaning: 'This force acts on charged particles moving through magnetic fields',
    topic: 'Electromagnetism',
    subtopic: 'Magnetic Fields',
    units: 'N',
    variables: {
      'F': 'magnetic force',
      'q': 'charge',
      'v': 'velocity',
      'B': 'magnetic field',
      'θ': 'angle between velocity and field'
    }
  },

  // WAVES AND OPTICS
  {
    id: 'wave-speed',
    name: 'Wave Speed',
    formula: 'v = fλ',
    description: 'Wave speed equals frequency times wavelength',
    realLifeUse: 'Used in sound systems, radio communications, and medical imaging',
    meaning: 'This relates the speed of a wave to its frequency and wavelength',
    topic: 'Waves and Optics',
    subtopic: 'Wave Properties',
    units: 'm/s',
    variables: {
      'v': 'wave speed',
      'f': 'frequency',
      'λ': 'wavelength'
    }
  },
  {
    id: 'doppler-effect',
    name: 'Doppler Effect',
    formula: 'f\' = f((v ± v₀)/(v ± vₛ))',
    description: 'Frequency change due to relative motion',
    realLifeUse: 'Used in radar, medical ultrasound, and astronomy',
    meaning: 'This effect explains why sound changes pitch when source and observer move',
    topic: 'Waves and Optics',
    subtopic: 'Wave Phenomena',
    units: 'Hz',
    variables: {
      'f\'': 'observed frequency',
      'f': 'source frequency',
      'v': 'wave speed',
      'v₀': 'observer velocity',
      'vₛ': 'source velocity'
    }
  },

  // MODERN PHYSICS
  {
    id: 'einstein-mass-energy',
    name: 'Einstein\'s Mass-Energy Equivalence',
    formula: 'E = mc²',
    description: 'Energy equals mass times speed of light squared',
    realLifeUse: 'Used in nuclear power, particle physics, and medical imaging',
    meaning: 'This famous equation shows that mass and energy are equivalent',
    topic: 'Modern Physics',
    subtopic: 'Relativity',
    units: 'J',
    variables: {
      'E': 'energy',
      'm': 'mass',
      'c': 'speed of light'
    }
  },
  {
    id: 'planck-energy',
    name: 'Photon Energy',
    formula: 'E = hf',
    description: 'Energy of a photon equals Planck\'s constant times frequency',
    realLifeUse: 'Used in lasers, solar cells, and quantum computing',
    meaning: 'This relates the energy of light particles to their frequency',
    topic: 'Modern Physics',
    subtopic: 'Quantum Physics',
    units: 'J',
    variables: {
      'E': 'energy',
      'h': 'Planck\'s constant',
      'f': 'frequency'
    }
  }
];

// Add more formulas to reach 344 total...
// This is a sample of key formulas. The complete list would include:
// - All mechanics formulas (kinematics, dynamics, energy, momentum, rotation)
// - All thermodynamics formulas (gas laws, heat transfer, entropy)
// - All electromagnetism formulas (electric fields, magnetic fields, circuits)
// - All waves and optics formulas (sound, light, interference, diffraction)
// - All modern physics formulas (relativity, quantum mechanics, nuclear physics)
// - All fluid mechanics formulas (pressure, buoyancy, flow)
// - All atomic and nuclear physics formulas
// - All astrophysics formulas

export const PHYSICS_TOPICS = [
  {
    name: 'Mechanics',
    subtopics: ['Kinematics', 'Dynamics', 'Energy', 'Momentum', 'Rotation', 'Fluids']
  },
  {
    name: 'Thermodynamics',
    subtopics: ['Gas Laws', 'Heat Transfer', 'Entropy', 'Engines']
  },
  {
    name: 'Electromagnetism',
    subtopics: ['Electric Fields', 'Magnetic Fields', 'Electric Circuits', 'Electromagnetic Waves']
  },
  {
    name: 'Waves and Optics',
    subtopics: ['Wave Properties', 'Sound', 'Light', 'Wave Phenomena']
  },
  {
    name: 'Modern Physics',
    subtopics: ['Relativity', 'Quantum Physics', 'Nuclear Physics', 'Particle Physics']
  },
  {
    name: 'Astrophysics',
    subtopics: ['Celestial Mechanics', 'Stellar Physics', 'Cosmology']
  }
]; 