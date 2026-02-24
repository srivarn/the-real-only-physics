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
    description: 'The rate of change of displacement with respect to time, representing how fast an object is moving and in what direction. Velocity is a vector quantity that combines speed and direction.',
    realLifeUse: 'Used extensively in speedometers, GPS navigation systems, sports analysis for tracking athlete performance, traffic monitoring and control systems, weather forecasting for wind speed calculations, and automotive safety systems including collision detection and automatic braking.',
    meaning: 'Velocity tells us not only how fast an object is moving but also in what direction. It is the fundamental quantity that describes motion in physics, serving as the basis for understanding acceleration, momentum, and kinetic energy.',
    topic: 'Mechanics',
    subtopic: 'Kinematics',
    units: 'm/s',
    variables: {
      'v': 'velocity (vector quantity)',
      'Δx': 'change in displacement (vector)',
      'Δt': 'change in time (scalar)'
    }
  },
  {
    id: 'acceleration',
    name: 'Acceleration',
    formula: 'a = Δv/Δt',
    description: 'The rate of change of velocity with respect to time, indicating how quickly an object\'s speed or direction is changing. Acceleration can be positive (speeding up), negative (slowing down), or zero (constant velocity).',
    realLifeUse: 'Critical in car safety systems for airbag deployment and seatbelt tensioning, roller coaster design and safety testing, sports performance analysis for training optimization, aircraft design and flight control systems, and earthquake detection and measurement.',
    meaning: 'Acceleration measures the change in motion over time. It is the second derivative of position and the first derivative of velocity, making it fundamental to understanding dynamics and forces in physics.',
    topic: 'Mechanics',
    subtopic: 'Kinematics',
    units: 'm/s²',
    variables: {
      'a': 'acceleration (vector quantity)',
      'Δv': 'change in velocity (vector)',
      'Δt': 'change in time (scalar)'
    }
  },
  {
    id: 'displacement',
    name: 'Displacement',
    formula: 's = v₀t + ½at²',
    description: 'The change in position of an object from its initial position to its final position, taking into account both distance and direction. This is the most general equation for displacement under constant acceleration.',
    realLifeUse: 'Essential in navigation systems for route planning and GPS positioning, robotics for motion planning and path optimization, autonomous vehicle navigation, missile guidance systems, and sports analytics for tracking player movements.',
    meaning: 'Displacement is the straight-line distance from start to finish position, regardless of the actual path taken. It is a vector quantity that represents the net change in position and is fundamental to understanding motion.',
    topic: 'Mechanics',
    subtopic: 'Kinematics',
    units: 'm',
    variables: {
      's': 'displacement (vector quantity)',
      'v₀': 'initial velocity (vector)',
      't': 'time elapsed (scalar)',
      'a': 'acceleration (vector, constant)'
    }
  },
  {
    id: 'free-fall',
    name: 'Free Fall Distance',
    formula: 'h = ½gt²',
    description: 'The distance an object falls under the influence of gravity alone, starting from rest. This equation describes the vertical motion of objects in free fall, neglecting air resistance.',
    realLifeUse: 'Used in skydiving calculations for safe landing zones, bungee jumping design and safety testing, amusement park ride design and safety analysis, construction safety for falling object calculations, and sports like cliff diving.',
    meaning: 'This formula describes how objects accelerate when falling under gravity. It shows that the distance fallen increases with the square of time, demonstrating the constant acceleration nature of gravity.',
    topic: 'Mechanics',
    subtopic: 'Kinematics',
    units: 'm',
    variables: {
      'h': 'height fallen (scalar)',
      'g': 'acceleration due to gravity (9.8 m/s² on Earth)',
      't': 'time elapsed (scalar)'
    }
  },
  {
    id: 'projectile-range',
    name: 'Projectile Range',
    formula: 'R = (v₀²sin(2θ))/g',
    description: 'The maximum horizontal distance a projectile can travel when launched at an angle θ with initial velocity v₀. This formula gives the optimal range for projectile motion under ideal conditions.',
    realLifeUse: 'Applied in artillery and missile systems for targeting calculations, sports analysis for golf, baseball, and football trajectory optimization, fireworks display planning, and military applications for weapon systems.',
    meaning: 'This gives the maximum distance a projectile can travel horizontally. The formula shows that maximum range occurs at 45 degrees and that range depends on the square of initial velocity.',
    topic: 'Mechanics',
    subtopic: 'Kinematics',
    units: 'm',
    variables: {
      'R': 'range (horizontal distance)',
      'v₀': 'initial velocity (scalar)',
      'θ': 'launch angle (scalar)',
      'g': 'acceleration due to gravity'
    }
  },

  // MECHANICS - DYNAMICS
  {
    id: 'newton-second',
    name: 'Newton\'s Second Law',
    formula: 'F = ma',
    description: 'The fundamental law that relates force to the motion it produces. Force equals mass times acceleration, establishing the relationship between forces acting on an object and the resulting motion.',
    realLifeUse: 'Essential in car crash testing and safety design, rocket propulsion and space vehicle design, sports equipment design for safety and performance, structural engineering for building design, and medical applications like impact analysis.',
    meaning: 'This fundamental law relates force to the motion it produces. It shows that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.',
    topic: 'Mechanics',
    subtopic: 'Dynamics',
    units: 'N (kg·m/s²)',
    variables: {
      'F': 'net force (vector)',
      'm': 'mass (scalar)',
      'a': 'acceleration (vector)'
    }
  },
  {
    id: 'weight',
    name: 'Weight',
    formula: 'W = mg',
    description: 'The gravitational force acting on an object\'s mass. Weight is the force with which gravity pulls an object toward the center of the Earth or other celestial body.',
    realLifeUse: 'Used in scales and weighing devices, elevator design and safety systems, weight measurement in medical applications, aerospace engineering for spacecraft design, and sports science for athlete monitoring.',
    meaning: 'Weight is the force of gravity acting on an object\'s mass. Unlike mass, weight can vary depending on the gravitational field strength, making it different on different planets or in space.',
    topic: 'Mechanics',
    subtopic: 'Dynamics',
    units: 'N',
    variables: {
      'W': 'weight (force due to gravity)',
      'm': 'mass (scalar)',
      'g': 'acceleration due to gravity'
    }
  },
  {
    id: 'friction',
    name: 'Friction Force',
    formula: 'f = μN',
    description: 'The force that opposes the relative motion of two surfaces in contact. Friction depends on the nature of the surfaces and the normal force pressing them together.',
    realLifeUse: 'Critical in brake systems for vehicle safety, tire design for optimal grip, walking surface design for safety, machine design for power transmission, and sports equipment design for performance.',
    meaning: 'Friction opposes motion and depends on the surfaces in contact. The coefficient of friction varies with surface materials and conditions, making it crucial for understanding real-world motion.',
    topic: 'Mechanics',
    subtopic: 'Dynamics',
    units: 'N',
    variables: {
      'f': 'friction force (vector)',
      'μ': 'coefficient of friction (scalar)',
      'N': 'normal force (vector)'
    }
  },
  {
    id: 'centripetal-force',
    name: 'Centripetal Force',
    formula: 'F = mv²/r',
    description: 'The force required to keep an object moving in a circular path at constant speed. This force is always directed toward the center of the circular path and is responsible for the object\'s curved motion.',
    realLifeUse: 'Essential in roller coaster design and safety, car turning and cornering analysis, satellite orbit calculations, centrifuge design for medical and industrial applications, and sports analysis for curved motion.',
    meaning: 'This force keeps objects moving in a circular path. Without centripetal force, objects would move in straight lines according to Newton\'s first law. The force increases with mass, velocity squared, and decreases with radius.',
    topic: 'Mechanics',
    subtopic: 'Dynamics',
    units: 'N',
    variables: {
      'F': 'centripetal force (vector)',
      'm': 'mass (scalar)',
      'v': 'velocity (scalar)',
      'r': 'radius of circular path (scalar)'
    }
  },

  // MECHANICS - ENERGY
  {
    id: 'kinetic-energy',
    name: 'Kinetic Energy',
    formula: 'KE = ½mv²',
    description: 'The energy an object possesses due to its motion. Kinetic energy depends on both the mass and the square of the velocity, making high-speed objects particularly energetic.',
    realLifeUse: 'Used in car crash analysis and safety design, wind turbine design for energy production, sports impact studies for equipment design, bullet and projectile analysis, and transportation safety calculations.',
    meaning: 'Kinetic energy represents the energy an object has due to its motion. The square dependence on velocity means that doubling speed quadruples kinetic energy, making high-speed collisions particularly dangerous.',
    topic: 'Mechanics',
    subtopic: 'Energy',
    units: 'J',
    variables: {
      'KE': 'kinetic energy (scalar)',
      'm': 'mass (scalar)',
      'v': 'velocity (scalar)'
    }
  },
  {
    id: 'potential-energy',
    name: 'Gravitational Potential Energy',
    formula: 'PE = mgh',
    description: 'The energy an object possesses due to its position in a gravitational field. This energy represents the work that could be done by gravity if the object were allowed to fall.',
    realLifeUse: 'Applied in hydroelectric dam design and operation, roller coaster design for energy conservation, weight lifting and exercise equipment, elevator and escalator design, and renewable energy systems.',
    meaning: 'Potential energy represents stored energy due to position. It can be converted to kinetic energy as the object falls, demonstrating the principle of energy conservation in gravitational systems.',
    topic: 'Mechanics',
    subtopic: 'Energy',
    units: 'J',
    variables: {
      'PE': 'potential energy (scalar)',
      'm': 'mass (scalar)',
      'g': 'acceleration due to gravity',
      'h': 'height above reference point (scalar)'
    }
  },
  {
    id: 'work',
    name: 'Work',
    formula: 'W = Fd cos(θ)',
    description: 'The energy transferred to or from an object by means of a force acting through a distance. Work is done when a force causes a displacement in the direction of the force component.',
    realLifeUse: 'Used in engine design and efficiency calculations, muscle physiology and biomechanics, mechanical systems design, power generation and transmission, and sports performance analysis.',
    meaning: 'Work is the energy transferred by a force acting through a distance. The cosine factor accounts for the angle between force and displacement, showing that only the component of force in the direction of motion does work.',
    topic: 'Mechanics',
    subtopic: 'Energy',
    units: 'J',
    variables: {
      'W': 'work done (scalar)',
      'F': 'force (vector)',
      'd': 'displacement (vector)',
      'θ': 'angle between force and displacement'
    }
  },
  {
    id: 'power',
    name: 'Power',
    formula: 'P = W/t',
    description: 'The rate at which work is done or energy is transferred. Power measures how quickly energy is transferred or work is performed, making it crucial for understanding system performance.',
    realLifeUse: 'Essential in engine design and performance analysis, electrical device design and efficiency, human performance and exercise physiology, industrial machinery design, and renewable energy system optimization.',
    meaning: 'Power measures how quickly energy is transferred or work is done. High power means energy is transferred rapidly, while low power means the same amount of work takes longer to complete.',
    topic: 'Mechanics',
    subtopic: 'Energy',
    units: 'W (J/s)',
    variables: {
      'P': 'power (scalar)',
      'W': 'work done (scalar)',
      't': 'time elapsed (scalar)'
    }
  },

  // MECHANICS - MOMENTUM
  {
    id: 'momentum',
    name: 'Linear Momentum',
    formula: 'p = mv',
    description: 'The product of an object\'s mass and velocity, representing the quantity of motion. Momentum is a vector quantity that is conserved in isolated systems.',
    realLifeUse: 'Used in car crash analysis and safety design, sports collision analysis, particle physics experiments, rocket propulsion systems, and impact analysis for engineering applications.',
    meaning: 'Momentum is a measure of how difficult it is to stop an object. It combines both mass and velocity, showing that both heavy objects and fast objects have significant momentum.',
    topic: 'Mechanics',
    subtopic: 'Momentum',
    units: 'kg·m/s',
    variables: {
      'p': 'momentum (vector)',
      'm': 'mass (scalar)',
      'v': 'velocity (vector)'
    }
  },
  {
    id: 'impulse',
    name: 'Impulse',
    formula: 'J = FΔt',
    description: 'The change in momentum of an object when a force acts on it for a time interval. Impulse equals the change in momentum and is crucial for understanding collisions.',
    realLifeUse: 'Applied in airbag design and safety systems, padding design for sports equipment, collision analysis for vehicle safety, sports impact studies, and medical applications for impact protection.',
    meaning: 'Impulse is the change in momentum and relates to collision safety. By increasing the time over which a force acts, the peak force can be reduced, making collisions safer.',
    topic: 'Mechanics',
    subtopic: 'Momentum',
    units: 'N·s',
    variables: {
      'J': 'impulse (vector)',
      'F': 'force (vector)',
      'Δt': 'time interval (scalar)'
    }
  },

  // THERMODYNAMICS
  {
    id: 'ideal-gas-law',
    name: 'Ideal Gas Law',
    formula: 'PV = nRT',
    description: 'The fundamental equation that relates pressure, volume, temperature, and amount of gas. This law describes the behavior of ideal gases under various conditions.',
    realLifeUse: 'Used in engine design and performance analysis, weather systems and atmospheric modeling, industrial processes and chemical engineering, refrigeration and air conditioning systems, and medical applications like respiratory therapy.',
    meaning: 'This law describes the relationship between pressure, volume, and temperature of gases. It shows how these variables are interconnected and how changes in one affect the others.',
    topic: 'Thermodynamics',
    subtopic: 'Gas Laws',
    units: 'Various (P in Pa, V in m³, n in mol, T in K)',
    variables: {
      'P': 'pressure (scalar)',
      'V': 'volume (scalar)',
      'n': 'number of moles (scalar)',
      'R': 'gas constant (8.314 J/mol·K)',
      'T': 'temperature in Kelvin (scalar)'
    }
  },
  {
    id: 'heat-capacity',
    name: 'Heat Capacity',
    formula: 'Q = mcΔT',
    description: 'The amount of heat required to change the temperature of a substance. This formula relates heat transfer to temperature change through the substance\'s specific heat capacity.',
    realLifeUse: 'Applied in heating and cooling system design, cooking and food processing, thermal management in electronics, climate control systems, and medical applications like hyperthermia treatment.',
    meaning: 'This formula calculates the heat needed to change an object\'s temperature. Different materials have different specific heat capacities, explaining why some materials heat up faster than others.',
    topic: 'Thermodynamics',
    subtopic: 'Heat Transfer',
    units: 'J',
    variables: {
      'Q': 'heat transferred (scalar)',
      'm': 'mass (scalar)',
      'c': 'specific heat capacity (scalar)',
      'ΔT': 'temperature change (scalar)'
    }
  },

  // ELECTROMAGNETISM
  {
    id: 'coulombs-law',
    name: 'Coulomb\'s Law',
    formula: 'F = k(q₁q₂)/r²',
    description: 'The fundamental law that describes the electrostatic force between two charged particles. The force is proportional to the product of charges and inversely proportional to the square of distance.',
    realLifeUse: 'Used in electronics design and circuit analysis, static electricity control in industrial processes, particle accelerator design, electrostatic precipitators for air pollution control, and medical applications like electrostatic therapy.',
    meaning: 'This law describes the force between electrically charged particles. Like charges repel, opposite charges attract, and the force decreases rapidly with distance due to the inverse square relationship.',
    topic: 'Electromagnetism',
    subtopic: 'Electric Fields',
    units: 'N',
    variables: {
      'F': 'electric force (vector)',
      'k': 'Coulomb\'s constant (8.99×10⁹ N·m²/C²)',
      'q₁, q₂': 'charges (scalar)',
      'r': 'distance between charges (scalar)'
    }
  },
  {
    id: 'ohms-law',
    name: 'Ohm\'s Law',
    formula: 'V = IR',
    description: 'The fundamental relationship between voltage, current, and resistance in electrical circuits. This law is the foundation of electrical engineering and circuit analysis.',
    realLifeUse: 'Essential in electrical circuit design and analysis, power distribution systems, electronic device design, automotive electrical systems, and medical device design and safety.',
    meaning: 'This fundamental law relates voltage, current, and resistance in circuits. It shows that current is directly proportional to voltage and inversely proportional to resistance.',
    topic: 'Electromagnetism',
    subtopic: 'Electric Circuits',
    units: 'V',
    variables: {
      'V': 'voltage (scalar)',
      'I': 'current (scalar)',
      'R': 'resistance (scalar)'
    }
  },
  {
    id: 'magnetic-force',
    name: 'Magnetic Force',
    formula: 'F = qvB sin(θ)',
    description: 'The force exerted on a moving charged particle by a magnetic field. This force is perpendicular to both the velocity and magnetic field directions.',
    realLifeUse: 'Used in electric motor design and operation, particle accelerator design, MRI machine design and operation, magnetic levitation systems, and plasma physics applications.',
    meaning: 'This force acts on charged particles moving through magnetic fields. The force is maximum when velocity is perpendicular to the field and zero when parallel, explaining circular motion in magnetic fields.',
    topic: 'Electromagnetism',
    subtopic: 'Magnetic Fields',
    units: 'N',
    variables: {
      'F': 'magnetic force (vector)',
      'q': 'charge (scalar)',
      'v': 'velocity (vector)',
      'B': 'magnetic field strength (vector)',
      'θ': 'angle between velocity and field'
    }
  },

  // WAVES AND OPTICS
  {
    id: 'wave-speed',
    name: 'Wave Speed',
    formula: 'v = fλ',
    description: 'The relationship between wave speed, frequency, and wavelength. This fundamental equation applies to all types of waves including sound, light, and water waves.',
    realLifeUse: 'Applied in sound system design and acoustics, radio communications and broadcasting, medical imaging technologies like ultrasound, fiber optic communications, and musical instrument design.',
    meaning: 'This relates the speed of a wave to its frequency and wavelength. Higher frequency waves have shorter wavelengths, and the product equals the wave speed.',
    topic: 'Waves and Optics',
    subtopic: 'Wave Properties',
    units: 'm/s',
    variables: {
      'v': 'wave speed (scalar)',
      'f': 'frequency (scalar)',
      'λ': 'wavelength (scalar)'
    }
  },
  {
    id: 'doppler-effect',
    name: 'Doppler Effect',
    formula: 'f\' = f((v ± v₀)/(v ± vₛ))',
    description: 'The change in frequency of a wave due to relative motion between the source and observer. This effect explains why sound changes pitch when source and observer move relative to each other.',
    realLifeUse: 'Used in radar systems for speed detection, medical ultrasound for blood flow measurement, astronomy for measuring stellar motion, police speed detection devices, and weather radar systems.',
    meaning: 'This effect explains why sound changes pitch when source and observer move. Approaching sources have higher frequency, receding sources have lower frequency.',
    topic: 'Waves and Optics',
    subtopic: 'Wave Phenomena',
    units: 'Hz',
    variables: {
      'f\'': 'observed frequency (scalar)',
      'f': 'source frequency (scalar)',
      'v': 'wave speed (scalar)',
      'v₀': 'observer velocity (scalar)',
      'vₛ': 'source velocity (scalar)'
    }
  },

  // MODERN PHYSICS - RELATIVITY
  {
    id: 'einstein-mass-energy',
    name: 'Einstein\'s Mass-Energy Equivalence',
    formula: 'E = mc²',
    description: 'The famous equation that shows the equivalence of mass and energy. This revolutionary concept from special relativity shows that mass can be converted to energy and vice versa.',
    realLifeUse: 'Fundamental to nuclear power generation and nuclear weapons, particle physics experiments and accelerators, medical imaging techniques like PET scans, and understanding stellar energy production.',
    meaning: 'This famous equation shows that mass and energy are equivalent. The speed of light squared is a huge number, meaning even small amounts of mass contain enormous amounts of energy.',
    topic: 'Modern Physics',
    subtopic: 'Relativity',
    units: 'J',
    variables: {
      'E': 'energy (scalar)',
      'm': 'mass (scalar)',
      'c': 'speed of light (3×10⁸ m/s)'
    }
  },
  {
    id: 'time-dilation',
    name: 'Time Dilation',
    formula: 't = t₀/√(1 - v²/c²)',
    description: 'The phenomenon where time passes more slowly for objects moving at high speeds relative to an observer. This is a key prediction of special relativity.',
    realLifeUse: 'Critical in GPS satellite systems for accurate positioning, particle accelerator experiments, space travel planning, and understanding high-speed phenomena in astrophysics.',
    meaning: 'Time passes more slowly for moving objects. This effect becomes significant only at speeds approaching the speed of light, but is measurable in GPS satellites and particle accelerators.',
    topic: 'Modern Physics',
    subtopic: 'Relativity',
    units: 's',
    variables: {
      't': 'time measured by moving observer',
      't₀': 'proper time (time in rest frame)',
      'v': 'relative velocity',
      'c': 'speed of light'
    }
  },
  {
    id: 'length-contraction',
    name: 'Length Contraction',
    formula: 'L = L₀√(1 - v²/c²)',
    description: 'The phenomenon where objects appear shorter in the direction of motion when moving at high speeds. This is another key prediction of special relativity.',
    realLifeUse: 'Important in particle physics experiments, space travel calculations, understanding high-speed phenomena, and theoretical physics research.',
    meaning: 'Objects appear shorter when moving at high speeds. This effect, like time dilation, becomes significant only at relativistic speeds but is fundamental to understanding space-time.',
    topic: 'Modern Physics',
    subtopic: 'Relativity',
    units: 'm',
    variables: {
      'L': 'contracted length',
      'L₀': 'proper length (length in rest frame)',
      'v': 'relative velocity',
      'c': 'speed of light'
    }
  },

  // MODERN PHYSICS - QUANTUM MECHANICS
  {
    id: 'planck-energy',
    name: 'Photon Energy',
    formula: 'E = hf',
    description: 'The energy of a photon is directly proportional to its frequency. This fundamental relationship connects the particle and wave nature of light.',
    realLifeUse: 'Used in laser design and applications, solar cell technology, medical imaging like X-rays, spectroscopy for chemical analysis, and quantum computing research.',
    meaning: 'This relates the energy of light particles to their frequency. Higher frequency light (like blue) has more energy than lower frequency light (like red).',
    topic: 'Modern Physics',
    subtopic: 'Quantum Physics',
    units: 'J',
    variables: {
      'E': 'photon energy (scalar)',
      'h': 'Planck\'s constant (6.626×10⁻³⁴ J·s)',
      'f': 'frequency (scalar)'
    }
  },
  {
    id: 'de-broglie-wavelength',
    name: 'De Broglie Wavelength',
    formula: 'λ = h/p',
    description: 'The wavelength associated with a particle\'s momentum. This equation shows the wave-particle duality of matter, connecting particle properties to wave properties.',
    realLifeUse: 'Applied in electron microscopy, quantum tunneling devices, nanotechnology research, particle physics experiments, and understanding atomic structure.',
    meaning: 'All particles have wave-like properties. The wavelength decreases as momentum increases, making wave effects more noticeable for small, slow particles.',
    topic: 'Modern Physics',
    subtopic: 'Quantum Physics',
    units: 'm',
    variables: {
      'λ': 'de Broglie wavelength',
      'h': 'Planck\'s constant',
      'p': 'momentum'
    }
  },
  {
    id: 'heisenberg-uncertainty',
    name: 'Heisenberg Uncertainty Principle',
    formula: 'ΔxΔp ≥ ℏ/2',
    description: 'The fundamental limit on the precision with which position and momentum can be simultaneously known. This is a core principle of quantum mechanics.',
    realLifeUse: 'Important in quantum computing, nanotechnology, precision measurement systems, understanding atomic and molecular behavior, and fundamental physics research.',
    meaning: 'There is a fundamental limit to how precisely we can know both position and momentum. This is not due to measurement limitations but is a property of nature itself.',
    topic: 'Modern Physics',
    subtopic: 'Quantum Physics',
    units: 'J·s',
    variables: {
      'Δx': 'uncertainty in position',
      'Δp': 'uncertainty in momentum',
      'ℏ': 'reduced Planck constant (h/2π)'
    }
  },

  // NUCLEAR PHYSICS
  {
    id: 'nuclear-binding-energy',
    name: 'Nuclear Binding Energy',
    formula: 'E = Δmc²',
    description: 'The energy equivalent of the mass defect in a nucleus. This energy represents the work needed to separate the nucleus into its constituent nucleons.',
    realLifeUse: 'Fundamental to nuclear power generation, nuclear weapons design, understanding stellar fusion processes, medical applications like radiation therapy, and nuclear waste management.',
    meaning: 'The mass of a nucleus is less than the sum of its individual nucleons. This mass difference is converted to binding energy that holds the nucleus together.',
    topic: 'Nuclear Physics',
    subtopic: 'Nuclear Structure',
    units: 'J',
    variables: {
      'E': 'binding energy',
      'Δm': 'mass defect',
      'c': 'speed of light'
    }
  },
  {
    id: 'radioactive-decay',
    name: 'Radioactive Decay Law',
    formula: 'N = N₀e^(-λt)',
    description: 'The exponential decay law that describes how the number of radioactive nuclei decreases over time. This is fundamental to understanding radioactive processes.',
    realLifeUse: 'Used in nuclear medicine for treatment planning, carbon dating for archaeology, nuclear power plant safety, radiation protection, and understanding natural radioactivity.',
    meaning: 'Radioactive decay follows an exponential pattern. The number of nuclei decreases exponentially with time, with the rate determined by the decay constant.',
    topic: 'Nuclear Physics',
    subtopic: 'Radioactivity',
    units: 'dimensionless',
    variables: {
      'N': 'number of nuclei remaining',
      'N₀': 'initial number of nuclei',
      'λ': 'decay constant',
      't': 'time elapsed'
    }
  },
  {
    id: 'half-life',
    name: 'Half-Life',
    formula: 'T₁/₂ = ln(2)/λ',
    description: 'The time required for half of the radioactive nuclei in a sample to decay. This is a key concept in radioactive decay and nuclear physics.',
    realLifeUse: 'Essential in nuclear medicine for treatment planning, carbon dating for determining age of artifacts, nuclear waste management, and understanding natural radioactive processes.',
    meaning: 'Half-life is the time for half the nuclei to decay. After one half-life, half remain; after two half-lives, one-quarter remain, and so on.',
    topic: 'Nuclear Physics',
    subtopic: 'Radioactivity',
    units: 's',
    variables: {
      'T₁/₂': 'half-life',
      'λ': 'decay constant',
      'ln(2)': 'natural logarithm of 2'
    }
  },
  {
    id: 'fission-energy',
    name: 'Nuclear Fission Energy',
    formula: 'E = (m₁ + m₂ - m₃)c²',
    description: 'The energy released when a heavy nucleus splits into lighter nuclei. This is the energy source for nuclear power plants and atomic bombs.',
    realLifeUse: 'Fundamental to nuclear power generation, nuclear weapons, understanding stellar processes, nuclear waste analysis, and nuclear safety calculations.',
    meaning: 'When a heavy nucleus splits, the total mass of the products is less than the original nucleus. This mass difference is converted to energy.',
    topic: 'Nuclear Physics',
    subtopic: 'Nuclear Reactions',
    units: 'J',
    variables: {
      'E': 'energy released',
      'm₁, m₂': 'masses of fission products',
      'm₃': 'mass of original nucleus',
      'c': 'speed of light'
    }
  },
  {
    id: 'fusion-energy',
    name: 'Nuclear Fusion Energy',
    formula: 'E = (m₁ + m₂ - m₃)c²',
    description: 'The energy released when light nuclei combine to form a heavier nucleus. This is the energy source for stars and potential future power plants.',
    realLifeUse: 'Fundamental to understanding stellar energy production, fusion power research, hydrogen bomb design, and astrophysical processes.',
    meaning: 'When light nuclei fuse, the resulting nucleus has less mass than the original nuclei. This mass difference is converted to energy.',
    topic: 'Nuclear Physics',
    subtopic: 'Nuclear Reactions',
    units: 'J',
    variables: {
      'E': 'energy released',
      'm₁, m₂': 'masses of original nuclei',
      'm₃': 'mass of fusion product',
      'c': 'speed of light'
    }
  },

  // ASTROPHYSICS
  {
    id: 'kepler-third',
    name: 'Kepler\'s Third Law',
    formula: 'T² = (4π²/GM)r³',
    description: 'The relationship between the orbital period and the semi-major axis of an orbit. This law applies to any two bodies orbiting each other under gravitational attraction.',
    realLifeUse: 'Used in satellite orbit calculations, planetary motion analysis, binary star system studies, exoplanet detection, and space mission planning.',
    meaning: 'The square of the orbital period is proportional to the cube of the semi-major axis. This law applies to planets, moons, satellites, and any orbiting bodies.',
    topic: 'Astrophysics',
    subtopic: 'Celestial Mechanics',
    units: 's²',
    variables: {
      'T': 'orbital period',
      'G': 'gravitational constant',
      'M': 'mass of central body',
      'r': 'semi-major axis'
    }
  },
  {
    id: 'escape-velocity',
    name: 'Escape Velocity',
    formula: 'v = √(2GM/r)',
    description: 'The minimum velocity needed for an object to escape the gravitational field of a massive body. This is crucial for space travel and understanding orbital mechanics.',
    realLifeUse: 'Essential in rocket design and space mission planning, understanding planetary atmospheres, satellite launch calculations, and astrophysical phenomena.',
    meaning: 'Escape velocity is the speed needed to overcome gravity. It depends on the mass of the central body and the distance from its center.',
    topic: 'Astrophysics',
    subtopic: 'Celestial Mechanics',
    units: 'm/s',
    variables: {
      'v': 'escape velocity',
      'G': 'gravitational constant',
      'M': 'mass of central body',
      'r': 'distance from center'
    }
  },
  {
    id: 'stellar-luminosity',
    name: 'Stellar Luminosity',
    formula: 'L = 4πR²σT⁴',
    description: 'The total energy radiated by a star per unit time. This fundamental relationship connects a star\'s size, temperature, and energy output.',
    realLifeUse: 'Used in stellar classification, understanding stellar evolution, exoplanet detection, cosmology research, and astronomical observations.',
    meaning: 'A star\'s luminosity depends on its radius squared and temperature to the fourth power. This explains why small, hot stars can be very luminous.',
    topic: 'Astrophysics',
    subtopic: 'Stellar Physics',
    units: 'W',
    variables: {
      'L': 'luminosity',
      'R': 'stellar radius',
      'σ': 'Stefan-Boltzmann constant',
      'T': 'surface temperature'
    }
  },
  {
    id: 'redshift',
    name: 'Cosmological Redshift',
    formula: 'z = (λ₀ - λₑ)/λₑ',
    description: 'The increase in wavelength of light due to the expansion of the universe. This is a key tool for measuring cosmic distances and understanding cosmology.',
    realLifeUse: 'Fundamental to cosmology research, measuring cosmic distances, understanding the expansion of the universe, and studying the early universe.',
    meaning: 'Redshift measures how much the universe has expanded since light was emitted. Higher redshift means the light was emitted when the universe was smaller.',
    topic: 'Astrophysics',
    subtopic: 'Cosmology',
    units: 'dimensionless',
    variables: {
      'z': 'redshift',
      'λ₀': 'observed wavelength',
      'λₑ': 'emitted wavelength'
    }
  },
  {
    id: 'hubble-law',
    name: 'Hubble\'s Law',
    formula: 'v = H₀d',
    description: 'The relationship between the recessional velocity of galaxies and their distance from us. This law provides evidence for the expansion of the universe.',
    realLifeUse: 'Used in measuring cosmic distances, understanding the expansion of the universe, cosmology research, and determining the age of the universe.',
    meaning: 'Galaxies are moving away from us at speeds proportional to their distance. This is evidence that the universe is expanding.',
    topic: 'Astrophysics',
    subtopic: 'Cosmology',
    units: 'km/s',
    variables: {
      'v': 'recessional velocity',
      'H₀': 'Hubble constant',
      'd': 'distance'
    }
  },
  {
    id: 'black-hole-radius',
    name: 'Schwarzschild Radius',
    formula: 'Rₛ = 2GM/c²',
    description: 'The radius of the event horizon of a black hole. This is the boundary beyond which nothing, not even light, can escape the black hole\'s gravity.',
    realLifeUse: 'Used in black hole research, understanding gravitational waves, cosmology studies, and theoretical physics research.',
    meaning: 'The Schwarzschild radius is the size a mass would need to be compressed to form a black hole. It depends only on the mass of the object.',
    topic: 'Astrophysics',
    subtopic: 'Black Holes',
    units: 'm',
    variables: {
      'Rₛ': 'Schwarzschild radius',
      'G': 'gravitational constant',
      'M': 'mass of black hole',
      'c': 'speed of light'
    }
  },

  // MECHANICS - ROTATION
  {
    id: 'angular-velocity',
    name: 'Angular Velocity',
    formula: 'ω = Δθ/Δt',
    description: 'The rate of change of angular displacement with respect to time. Angular velocity describes how fast an object rotates.',
    realLifeUse: 'Used in motor design, turbine engineering, gyroscope applications, robotics, and sports analysis for spinning objects.',
    meaning: 'Angular velocity measures how fast something rotates. It is analogous to linear velocity but for rotational motion.',
    topic: 'Mechanics',
    subtopic: 'Rotation',
    units: 'rad/s',
    variables: {
      'ω': 'angular velocity',
      'Δθ': 'change in angle',
      'Δt': 'change in time'
    }
  },
  {
    id: 'moment-of-inertia',
    name: 'Moment of Inertia',
    formula: 'I = mr²',
    description: 'The rotational equivalent of mass. It measures an object\'s resistance to changes in rotational motion.',
    realLifeUse: 'Applied in flywheel design, figure skating analysis, mechanical engineering, and understanding rotational dynamics.',
    meaning: 'Moment of inertia is the rotational equivalent of mass. Objects with mass farther from the axis are harder to rotate.',
    topic: 'Mechanics',
    subtopic: 'Rotation',
    units: 'kg·m²',
    variables: {
      'I': 'moment of inertia',
      'm': 'mass',
      'r': 'distance from axis'
    }
  },
  {
    id: 'torque',
    name: 'Torque',
    formula: 'τ = rF sin(θ)',
    description: 'The rotational equivalent of force. Torque causes angular acceleration and is crucial for understanding rotational motion.',
    realLifeUse: 'Essential in engine design, wrench and tool design, door hinge design, and mechanical systems.',
    meaning: 'Torque is the rotational force. It depends on the force magnitude, distance from axis, and angle of application.',
    topic: 'Mechanics',
    subtopic: 'Rotation',
    units: 'N·m',
    variables: {
      'τ': 'torque',
      'r': 'distance from axis',
      'F': 'force',
      'θ': 'angle'
    }
  },
  {
    id: 'angular-momentum',
    name: 'Angular Momentum',
    formula: 'L = Iω',
    description: 'The rotational equivalent of linear momentum. Angular momentum is conserved in isolated systems.',
    realLifeUse: 'Used in gyroscope design, figure skating analysis, satellite stabilization, and understanding planetary motion.',
    meaning: 'Angular momentum is the rotational equivalent of momentum. It is conserved, explaining why spinning objects maintain their orientation.',
    topic: 'Mechanics',
    subtopic: 'Rotation',
    units: 'kg·m²/s',
    variables: {
      'L': 'angular momentum',
      'I': 'moment of inertia',
      'ω': 'angular velocity'
    }
  },

  // MECHANICS - FLUIDS
  {
    id: 'pressure',
    name: 'Pressure',
    formula: 'P = F/A',
    description: 'The force per unit area applied perpendicular to a surface. Pressure is fundamental to understanding fluid behavior.',
    realLifeUse: 'Used in hydraulic systems, tire pressure monitoring, weather forecasting, diving calculations, and medical blood pressure measurement.',
    meaning: 'Pressure is force distributed over an area. The same force over a smaller area creates higher pressure.',
    topic: 'Mechanics',
    subtopic: 'Fluids',
    units: 'Pa',
    variables: {
      'P': 'pressure',
      'F': 'force',
      'A': 'area'
    }
  },
  {
    id: 'buoyancy',
    name: 'Buoyant Force (Archimedes)',
    formula: 'F_b = ρVg',
    description: 'The upward force exerted by a fluid on an immersed object. This force equals the weight of the displaced fluid.',
    realLifeUse: 'Applied in ship design, submarine operation, hot air balloon design, and understanding why objects float or sink.',
    meaning: 'Buoyancy is the upward force on objects in fluids. Objects float when buoyant force equals their weight.',
    topic: 'Mechanics',
    subtopic: 'Fluids',
    units: 'N',
    variables: {
      'F_b': 'buoyant force',
      'ρ': 'fluid density',
      'V': 'displaced volume',
      'g': 'gravity'
    }
  },
  {
    id: 'continuity-equation',
    name: 'Continuity Equation',
    formula: 'A₁v₁ = A₂v₂',
    description: 'The principle of mass conservation in fluid flow. The product of cross-sectional area and velocity remains constant.',
    realLifeUse: 'Used in pipe design, blood flow analysis, river flow calculations, and aerodynamic design.',
    meaning: 'Fluid flows faster through narrow sections and slower through wide sections to conserve mass.',
    topic: 'Mechanics',
    subtopic: 'Fluids',
    units: 'm³/s',
    variables: {
      'A₁, A₂': 'cross-sectional areas',
      'v₁, v₂': 'fluid velocities'
    }
  },
  {
    id: 'bernoulli-equation',
    name: 'Bernoulli\'s Equation',
    formula: 'P + ½ρv² + ρgh = constant',
    description: 'The principle of energy conservation in fluid flow. The sum of pressure, kinetic, and potential energy per unit volume is constant.',
    realLifeUse: 'Applied in airplane wing design, venturi meter design, blood flow analysis, and understanding fluid dynamics.',
    meaning: 'In flowing fluids, pressure decreases as velocity increases. This explains how airplane wings generate lift.',
    topic: 'Mechanics',
    subtopic: 'Fluids',
    units: 'Pa',
    variables: {
      'P': 'pressure',
      'ρ': 'fluid density',
      'v': 'velocity',
      'g': 'gravity',
      'h': 'height'
    }
  },

  // THERMODYNAMICS - ENTROPY
  {
    id: 'entropy-change',
    name: 'Entropy Change',
    formula: 'ΔS = Q/T',
    description: 'The change in entropy when heat is transferred at constant temperature. Entropy measures disorder in a system.',
    realLifeUse: 'Used in refrigeration design, heat engine analysis, chemical process engineering, and understanding thermodynamic efficiency.',
    meaning: 'Entropy measures disorder. Heat transfer increases entropy, and natural processes tend to increase total entropy.',
    topic: 'Thermodynamics',
    subtopic: 'Entropy',
    units: 'J/K',
    variables: {
      'ΔS': 'entropy change',
      'Q': 'heat transferred',
      'T': 'temperature'
    }
  },
  {
    id: 'carnot-efficiency',
    name: 'Carnot Efficiency',
    formula: 'η = 1 - T_c/T_h',
    description: 'The maximum theoretical efficiency of a heat engine operating between two temperatures. No real engine can exceed this efficiency.',
    realLifeUse: 'Used in power plant design, engine efficiency analysis, refrigeration system design, and thermodynamic optimization.',
    meaning: 'The Carnot efficiency sets the theoretical limit for heat engine efficiency. Real engines are always less efficient.',
    topic: 'Thermodynamics',
    subtopic: 'Engines',
    units: 'dimensionless',
    variables: {
      'η': 'efficiency',
      'T_c': 'cold reservoir temperature',
      'T_h': 'hot reservoir temperature'
    }
  },
  {
    id: 'heat-engine-work',
    name: 'Heat Engine Work',
    formula: 'W = Q_h - Q_c',
    description: 'The work output of a heat engine equals the difference between heat absorbed and heat rejected.',
    realLifeUse: 'Applied in power plant design, car engine analysis, refrigeration systems, and energy conversion systems.',
    meaning: 'Heat engines convert heat to work. The work output is the difference between heat input and heat output.',
    topic: 'Thermodynamics',
    subtopic: 'Engines',
    units: 'J',
    variables: {
      'W': 'work output',
      'Q_h': 'heat absorbed',
      'Q_c': 'heat rejected'
    }
  },

  // WAVES - SOUND
  {
    id: 'sound-intensity',
    name: 'Sound Intensity',
    formula: 'I = P/A',
    description: 'The power per unit area carried by a sound wave. Intensity determines how loud a sound appears.',
    realLifeUse: 'Used in speaker design, noise pollution measurement, hearing protection, acoustic engineering, and audio system design.',
    meaning: 'Sound intensity measures the energy flow per unit area. Higher intensity means louder sound.',
    topic: 'Waves and Optics',
    subtopic: 'Sound',
    units: 'W/m²',
    variables: {
      'I': 'intensity',
      'P': 'power',
      'A': 'area'
    }
  },
  {
    id: 'sound-level',
    name: 'Sound Level (Decibels)',
    formula: 'β = 10 log(I/I₀)',
    description: 'The logarithmic measure of sound intensity in decibels. This scale matches human perception of loudness.',
    realLifeUse: 'Used in noise measurement, hearing protection standards, audio engineering, and environmental noise assessment.',
    meaning: 'The decibel scale is logarithmic. A 10 dB increase represents a 10-fold increase in intensity.',
    topic: 'Waves and Optics',
    subtopic: 'Sound',
    units: 'dB',
    variables: {
      'β': 'sound level',
      'I': 'intensity',
      'I₀': 'reference intensity'
    }
  },

  // WAVES - LIGHT
  {
    id: 'snells-law',
    name: 'Snell\'s Law',
    formula: 'n₁ sin(θ₁) = n₂ sin(θ₂)',
    description: 'The law of refraction describing how light bends when passing between different media.',
    realLifeUse: 'Used in lens design, fiber optics, eyeglass design, camera optics, and understanding atmospheric refraction.',
    meaning: 'Light bends when entering a different medium. The amount of bending depends on the refractive indices.',
    topic: 'Waves and Optics',
    subtopic: 'Light',
    units: 'dimensionless',
    variables: {
      'n₁, n₂': 'refractive indices',
      'θ₁, θ₂': 'angles from normal'
    }
  },
  {
    id: 'lens-equation',
    name: 'Thin Lens Equation',
    formula: '1/f = 1/d_o + 1/d_i',
    description: 'The relationship between focal length, object distance, and image distance for thin lenses.',
    realLifeUse: 'Applied in camera design, eyeglass prescription, microscope design, telescope design, and optical instruments.',
    meaning: 'This equation relates object position, image position, and focal length for lenses.',
    topic: 'Waves and Optics',
    subtopic: 'Light',
    units: 'm⁻¹',
    variables: {
      'f': 'focal length',
      'd_o': 'object distance',
      'd_i': 'image distance'
    }
  },

  // ELECTROMAGNETISM - ELECTROMAGNETIC WAVES
  {
    id: 'em-wave-speed',
    name: 'Electromagnetic Wave Speed',
    formula: 'c = 1/√(ε₀μ₀)',
    description: 'The speed of electromagnetic waves in vacuum, derived from electric and magnetic constants.',
    realLifeUse: 'Fundamental to understanding light, radio waves, telecommunications, and electromagnetic theory.',
    meaning: 'The speed of light is determined by fundamental electromagnetic properties of space.',
    topic: 'Electromagnetism',
    subtopic: 'Electromagnetic Waves',
    units: 'm/s',
    variables: {
      'c': 'speed of light',
      'ε₀': 'permittivity of free space',
      'μ₀': 'permeability of free space'
    }
  },
  {
    id: 'em-energy-density',
    name: 'EM Energy Density',
    formula: 'u = ½(ε₀E² + B²/μ₀)',
    description: 'The energy per unit volume stored in electromagnetic fields.',
    realLifeUse: 'Used in antenna design, electromagnetic shielding, microwave engineering, and understanding electromagnetic radiation.',
    meaning: 'Electromagnetic waves carry energy in both electric and magnetic fields.',
    topic: 'Electromagnetism',
    subtopic: 'Electromagnetic Waves',
    units: 'J/m³',
    variables: {
      'u': 'energy density',
      'E': 'electric field',
      'B': 'magnetic field',
      'ε₀, μ₀': 'fundamental constants'
    }
  },

  // PARTICLE PHYSICS
  {
    id: 'rest-energy',
    name: 'Rest Energy',
    formula: 'E₀ = m₀c²',
    description: 'The energy equivalent of an object\'s rest mass. This is the energy an object has when at rest.',
    realLifeUse: 'Used in particle physics experiments, nuclear reactions, and understanding matter-antimatter annihilation.',
    meaning: 'Every particle has energy even when at rest, equal to its mass times the speed of light squared.',
    topic: 'Modern Physics',
    subtopic: 'Particle Physics',
    units: 'J',
    variables: {
      'E₀': 'rest energy',
      'm₀': 'rest mass',
      'c': 'speed of light'
    }
  },
  {
    id: 'relativistic-energy',
    name: 'Relativistic Total Energy',
    formula: 'E = γm₀c²',
    description: 'The total energy of a particle moving at relativistic speeds, including rest energy and kinetic energy.',
    realLifeUse: 'Essential in particle accelerator design, cosmic ray studies, and high-energy physics experiments.',
    meaning: 'At high speeds, energy increases dramatically due to relativistic effects.',
    topic: 'Modern Physics',
    subtopic: 'Particle Physics',
    units: 'J',
    variables: {
      'E': 'total energy',
      'γ': 'Lorentz factor',
      'm₀': 'rest mass',
      'c': 'speed of light'
    }
  },
  {
    id: 'compton-scattering',
    name: 'Compton Wavelength Shift',
    formula: 'Δλ = (h/m_e c)(1 - cos(θ))',
    description: 'The change in wavelength when a photon scatters off an electron. This demonstrates the particle nature of light.',
    realLifeUse: 'Used in X-ray analysis, medical imaging, material science, and understanding photon-matter interactions.',
    meaning: 'Photons transfer momentum to electrons when scattering, changing the photon wavelength.',
    topic: 'Modern Physics',
    subtopic: 'Particle Physics',
    units: 'm',
    variables: {
      'Δλ': 'wavelength shift',
      'h': 'Planck constant',
      'm_e': 'electron mass',
      'c': 'speed of light',
      'θ': 'scattering angle'
    }
  }
];

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
    subtopics: ['Celestial Mechanics', 'Stellar Physics', 'Cosmology', 'Black Holes']
  }
]; 