export const FORMULAS = [
  {
    topic: 'Mechanics',
    subtopics: [
      {
        title: 'Velocity',
        path: 'velocity',
        formula: 'v = dx/dt',
        explanation: 'Velocity is the rate of change of displacement with respect to time. It describes how fast an object changes its position and in which direction. Velocity is a vector quantity, meaning it has both magnitude and direction, which distinguishes it from speed.',
        meanings: 'v: velocity, dx: change in displacement, dt: change in time',
        realLifeApplication: 'Calculating the speed and direction of a car moving along a road, which is essential for navigation and safety systems.'
      },
      {
        title: 'Acceleration',
        path: 'acceleration',
        formula: 'a = dv/dt',
        explanation: 'Acceleration is the rate of change of velocity with respect to time. It indicates how quickly an object speeds up, slows down, or changes direction. Like velocity, acceleration is a vector quantity.',
        meanings: 'a: acceleration, dv: change in velocity, dt: change in time',
        realLifeApplication: 'Determining the acceleration of a rocket during launch to ensure it reaches the desired speed and trajectory.'
      },
      {
        title: 'Newton\'s Second Law',
        path: 'newtons-second-law',
        formula: 'F = ma',
        explanation: 'Newton\'s Second Law states that the force acting on an object is equal to its mass multiplied by its acceleration. This fundamental principle explains how the motion of an object changes when subjected to external forces.',
        meanings: 'F: force, m: mass, a: acceleration',
        realLifeApplication: 'Calculating the force required to push a heavy box across the floor, which helps in designing machinery and safety equipment.'
      },
      {
        title: 'Friction',
        path: 'friction',
        formula: 'f = μN',
        explanation: 'Friction is the force resisting the relative motion of solid surfaces, fluid layers, and material elements sliding against each other. It depends on the nature of the surfaces and the normal force pressing them together.',
        meanings: 'f: frictional force, μ: coefficient of friction, N: normal force',
        realLifeApplication: 'Understanding why it\'s harder to push a box on a rough surface than on a smooth one, which is important in material selection and safety.'
      },
      {
        title: 'Work',
        path: 'work',
        formula: 'W = Fd',
        explanation: 'Work is the product of the force applied to an object and the distance over which it is applied. It represents the energy transferred to or from an object via the application of force along a displacement.',
        meanings: 'W: work done, F: force, d: distance',
        realLifeApplication: 'Calculating the work done when lifting a weight, which is essential in engineering and physics problems.'
      },
      {
        title: 'Kinetic Energy',
        path: 'kinetic-energy',
        formula: 'KE = 0.5mv^2',
        explanation: 'Kinetic energy is the energy an object possesses due to its motion. It depends on the mass of the object and the square of its velocity.',
        meanings: 'KE: kinetic energy, m: mass, v: velocity',
        realLifeApplication: 'Calculating the energy of a moving car, which is important for safety analysis and vehicle design.'
      },
      {
        title: 'Potential Energy',
        path: 'potential-energy',
        formula: 'PE = mgh',
        explanation: 'Potential energy is the energy stored in an object due to its position relative to a reference point, typically the height above the ground in a gravitational field.',
        meanings: 'PE: potential energy, m: mass, g: acceleration due to gravity, h: height',
        realLifeApplication: 'Calculating the energy stored in a book placed on a shelf, which is useful in understanding energy conservation.'
      },
      {
        title: 'Power',
        path: 'power',
        formula: 'P = W/t',
        explanation: 'Power is the rate at which work is done or energy is transferred over time. It measures how quickly energy is used or produced.',
        meanings: 'P: power, W: work done, t: time',
        realLifeApplication: 'Calculating the power output of a light bulb to determine its energy consumption.'
      },
      {
        title: 'Momentum',
        path: 'momentum',
        formula: 'p = mv',
        explanation: 'Momentum is the product of an object\'s mass and its velocity. It is a vector quantity and is conserved in isolated systems.',
        meanings: 'p: momentum, m: mass, v: velocity',
        realLifeApplication: 'Understanding why a bowling ball is harder to stop than a tennis ball moving at the same speed, which is important in sports and safety.'
      },
      {
        title: 'Impulse',
        path: 'impulse',
        formula: 'J = FΔt',
        explanation: 'Impulse is the change in momentum of an object when a force is applied over a time interval. It explains how forces affect motion over time.',
        meanings: 'J: impulse, F: force, Δt: change in time',
        realLifeApplication: 'Understanding how airbags work in cars by reducing the force during collisions.'
      },
      {
        title: 'Torque',
        path: 'torque',
        formula: 'τ = rFsin(θ)',
        explanation: 'Torque is the rotational equivalent of force. It measures the tendency of a force to rotate an object about an axis.',
        meanings: 'τ: torque, r: lever arm distance, F: force, θ: angle between force and lever arm',
        realLifeApplication: 'Using a wrench to tighten a bolt, which involves applying torque.'
      },
      {
        title: 'Centripetal Force',
        path: 'centripetal-force',
        formula: 'Fc = mv^2/r',
        explanation: 'Centripetal force is the force that keeps an object moving in a circular path, directed towards the center of the circle.',
        meanings: 'Fc: centripetal force, m: mass, v: velocity, r: radius of circular path',
        realLifeApplication: 'A car turning a corner, where the friction provides the centripetal force.'
      },
      {
        title: 'Angular Momentum',
        path: 'angular-momentum',
        formula: 'L = Iω',
        explanation: 'Angular momentum is the rotational equivalent of linear momentum. It depends on the moment of inertia and angular velocity of an object.',
        meanings: 'L: angular momentum, I: moment of inertia, ω: angular velocity',
        realLifeApplication: 'A spinning ice skater pulling in their arms to spin faster, conserving angular momentum.'
      }
    ]
  },
  {
    topic: 'Gravitation',
    subtopics: [
      {
        title: 'Newton\'s Law of Universal Gravitation',
        path: 'newtons-law-of-universal-gravitation',
        formula: 'F = Gm1m2/r^2',
        explanation: 'Newton\'s Law of Universal Gravitation states that every point mass attracts every other point mass with a force proportional to the product of their masses and inversely proportional to the square of the distance between them.',
        meanings: 'F: gravitational force, G: gravitational constant, m1 and m2: masses, r: distance between masses',
        realLifeApplication: 'Understanding why the planets orbit the sun due to gravitational attraction.'
      },
      {
        title: 'Gravitational Field Strength',
        path: 'gravitational-field-strength',
        formula: 'g = GM/r^2',
        explanation: 'Gravitational field strength is the force per unit mass experienced by a small test mass placed in a gravitational field.',
        meanings: 'g: gravitational field strength, G: gravitational constant, M: mass creating the field, r: distance from the mass',
        realLifeApplication: 'Calculating the acceleration due to gravity on different planets.'
      },
      {
        title: 'Gravitational Potential Energy',
        path: 'gravitational-potential-energy',
        formula: 'U = -Gm1m2/r',
        explanation: 'Gravitational potential energy is the energy an object possesses due to its position in a gravitational field, typically negative because the force is attractive.',
        meanings: 'U: gravitational potential energy, G: gravitational constant, m1 and m2: masses, r: distance between masses',
        realLifeApplication: 'Calculating the energy required to launch a satellite into orbit.'
      },
      {
        title: 'Escape Velocity',
        path: 'escape-velocity',
        formula: 'v_e = sqrt(2GM/r)',
        explanation: 'Escape velocity is the minimum speed an object must have to break free from the gravitational attraction of a massive body without further propulsion.',
        meanings: 'v_e: escape velocity, G: gravitational constant, M: mass of the body, r: distance from the center of mass',
        realLifeApplication: 'Calculating the speed a rocket needs to leave Earth\'s gravity.'
      },
      {
        title: 'Kepler\'s Third Law',
        path: 'keplers-third-law',
        formula: 'T^2 = (4π^2/GM)r^3',
        explanation: 'Kepler\'s Third Law relates the square of the orbital period of a planet to the cube of the semi-major axis of its orbit around the sun.',
        meanings: 'T: orbital period, G: gravitational constant, M: mass of the sun, r: semi-major axis',
        realLifeApplication: 'Calculating the orbital period of a satellite.'
      }
    ]
  },
  {
    topic: 'Optics',
    subtopics: [
      {
        title: 'Snell\'s Law',
        path: 'snells-law',
        formula: 'n1sin(θ1) = n2sin(θ2)',
        explanation: 'Snell\'s Law describes how light bends when it passes from one medium to another, relating the angles of incidence and refraction to the indices of refraction of the two media.',
        meanings: 'n1 and n2: indices of refraction, θ1: angle of incidence, θ2: angle of refraction',
        realLifeApplication: 'Understanding how lenses work in glasses and cameras.'
      },
      {
        title: 'Thin Lens Equation',
        path: 'thin-lens-equation',
        formula: '1/f = 1/do + 1/di',
        explanation: 'The Thin Lens Equation relates the focal length of a lens to the distances of the object and the image from the lens.',
        meanings: 'f: focal length, do: object distance, di: image distance',
        realLifeApplication: 'Designing lenses for glasses and cameras.'
      },
      {
        title: 'Magnification',
        path: 'magnification',
        formula: 'M = -di/do',
        explanation: 'Magnification is the ratio of the height of the image to the height of the object, indicating how much larger or smaller the image is compared to the object.',
        meanings: 'M: magnification, di: image distance, do: object distance',
        realLifeApplication: 'Understanding how magnifying glasses work.'
      },
      {
        title: 'Index of Refraction',
        path: 'index-of-refraction',
        formula: 'n = c/v',
        explanation: 'The Index of Refraction of a material describes how much light slows down when passing through it compared to the speed of light in a vacuum.',
        meanings: 'n: index of refraction, c: speed of light in vacuum, v: speed of light in material',
        realLifeApplication: 'Understanding why a straw in a glass of water looks bent.'
      },
      {
        title: 'Diffraction Grating',
        path: 'diffraction-grating',
        formula: 'dsin(θ) = mλ',
        explanation: 'A Diffraction Grating is an optical component with a periodic structure that splits and diffracts light into several beams traveling in different directions.',
        meanings: 'd: spacing between grating lines, θ: diffraction angle, m: order of diffraction, λ: wavelength',
        realLifeApplication: 'Used in spectrometers to analyze light.'
      }
    ]
  },
  {
    topic: 'Thermodynamics',
    subtopics: [
      {
        title: 'Ideal Gas Law',
        path: 'ideal-gas-law',
        formula: 'PV = nRT',
        explanation: 'The Ideal Gas Law describes the relationship between the pressure, volume, temperature, and number of moles of an ideal gas.',
        meanings: 'P: pressure, V: volume, n: number of moles, R: ideal gas constant, T: temperature',
        realLifeApplication: 'Calculating the pressure inside a tire.'
      },
      {
        title: 'First Law of Thermodynamics',
        path: 'first-law-of-thermodynamics',
        formula: 'ΔU = Q - W',
        explanation: 'The First Law of Thermodynamics states that the change in internal energy of a system is equal to the heat added to the system minus the work done by the system.',
        meanings: 'ΔU: change in internal energy, Q: heat added, W: work done',
        realLifeApplication: 'Understanding how engines work.'
      },
      {
        title: 'Second Law of Thermodynamics',
        path: 'second-law-of-thermodynamics',
        formula: 'ΔS ≥ 0',
        explanation: 'The Second Law of Thermodynamics states that the total entropy of an isolated system can only increase over time.',
        meanings: 'ΔS: change in entropy',
        realLifeApplication: 'Explaining why heat flows from hot to cold objects.'
      },
      {
        title: 'Heat Transfer',
        path: 'heat-transfer',
        formula: 'Q = mcΔT',
        explanation: 'This formula calculates the amount of heat transferred to or from an object when its temperature changes.',
        meanings: 'Q: heat transferred, m: mass, c: specific heat capacity, ΔT: change in temperature',
        realLifeApplication: 'Calculating how much energy is needed to boil water.'
      },
      {
        title: 'Carnot Efficiency',
        path: 'carnot-efficiency',
        formula: 'η = 1 - Tc/Th',
        explanation: 'Carnot Efficiency is the maximum possible efficiency of a heat engine operating between two temperatures.',
        meanings: 'η: efficiency, Tc: temperature of cold reservoir, Th: temperature of hot reservoir',
        realLifeApplication: 'Designing efficient power plants.'
      }
    ]
  },
  {
    topic: 'Electromagnetism',
    subtopics: [
      {
        title: 'Coulomb\'s Law',
        path: 'coulombs-law',
        formula: 'F = kq1q2/r^2',
        explanation: 'Coulomb\'s Law describes the electrostatic force of attraction or repulsion between two charged particles.',
        meanings: 'F: electrostatic force, k: Coulomb\'s constant, q1 and q2: charges, r: distance between charges',
        realLifeApplication: 'Understanding how static electricity works.'
      },
      {
        title: 'Electric Field',
        path: 'electric-field',
        formula: 'E = F/q',
        explanation: 'An Electric Field is a region around a charged particle or object within which a force would be exerted on other charged particles or objects.',
        meanings: 'E: electric field, F: force, q: charge',
        realLifeApplication: 'Designing electronic devices.'
      },
      {
        title: 'Ohm\'s Law',
        path: 'ohms-law',
        formula: 'V = IR',
        explanation: 'Ohm\'s Law states that the current through a conductor between two points is directly proportional to the voltage across the two points.',
        meanings: 'V: voltage, I: current, R: resistance',
        realLifeApplication: 'Calculating the current in a circuit.'
      },
      {
        title: 'Magnetic Force on a Moving Charge',
        path: 'magnetic-force-on-a-moving-charge',
        formula: 'F = qvBsin(θ)',
        explanation: 'This formula describes the force experienced by a charged particle moving in a magnetic field.',
        meanings: 'F: magnetic force, q: charge, v: velocity, B: magnetic field strength, θ: angle between velocity and magnetic field',
        realLifeApplication: 'Understanding how particle accelerators work.'
      },
      {
        title: 'Faraday\'s Law of Induction',
        path: 'faradays-law-of-induction',
        formula: 'ε = -dΦB/dt',
        explanation: 'Faraday\'s Law of Induction states that a changing magnetic flux through a circuit induces an electromotive force (voltage).',
        meanings: 'ε: electromotive force, ΦB: magnetic flux, t: time',
        realLifeApplication: 'Generating electricity in power plants.'
      }
    ]
  },
  {
    topic: 'Waves',
    subtopics: [
      {
        title: 'Wave Speed',
        path: 'wave-speed',
        formula: 'v = fλ',
        explanation: 'This formula relates the speed of a wave to its frequency and wavelength.',
        meanings: 'v: wave speed, f: frequency, λ: wavelength',
        realLifeApplication: 'Calculating the speed of sound.'
      },
      {
        title: 'Doppler Effect',
        path: 'doppler-effect',
        formula: 'f\' = f(v ± vo)/(v ∓ vs)',
        explanation: 'The Doppler Effect is the change in frequency of a wave in relation to an observer who is moving relative to the wave source.',
        meanings: 'f\': observed frequency, f: source frequency, v: wave speed, vo: observer velocity, vs: source velocity',
        realLifeApplication: 'The changing pitch of a siren as it passes by.'
      },
      {
        title: 'Simple Harmonic Motion (Position)',
        path: 'simple-harmonic-motion-position',
        formula: 'x(t) = Acos(ωt + φ)',
        explanation: 'This formula describes the position of an object undergoing simple harmonic motion.',
        meanings: 'x(t): position at time t, A: amplitude, ω: angular frequency, t: time, φ: phase angle',
        realLifeApplication: 'Modeling the motion of a pendulum.'
      },
      {
        title: 'Simple Harmonic Motion (Velocity)',
        path: 'simple-harmonic-motion-velocity',
        formula: 'v(t) = -Aωsin(ωt + φ)',
        explanation: 'This formula describes the velocity of an object undergoing simple harmonic motion.',
        meanings: 'v(t): velocity at time t, A: amplitude, ω: angular frequency, t: time, φ: phase angle',
        realLifeApplication: 'Modeling the motion of a mass on a spring.'
      },
      {
        title: 'Simple Harmonic Motion (Acceleration)',
        path: 'simple-harmonic-motion-acceleration',
        formula: 'a(t) = -Aω^2cos(ωt + φ)',
        explanation: 'This formula describes the acceleration of an object undergoing simple harmonic motion.',
        meanings: 'a(t): acceleration at time t, A: amplitude, ω: angular frequency, t: time, φ: phase angle',
        realLifeApplication: 'Modeling the motion of a vibrating string.'
      }
    ]
  },
  {
    topic: 'Modern Physics',
    subtopics: [
      {
        title: 'Mass-Energy Equivalence',
        path: 'mass-energy-equivalence',
        formula: 'E = mc^2',
        explanation: 'This formula, from Einstein\'s theory of special relativity, states that mass and energy are equivalent and can be converted into each other.',
        meanings: 'E: energy, m: mass, c: speed of light',
        realLifeApplication: 'Nuclear power and nuclear weapons.'
      },
      {
        title: 'Photoelectric Effect',
        path: 'photoelectric-effect',
        formula: 'Kmax = hf - φ',
        explanation: 'The Photoelectric Effect is the emission of electrons when light shines on a material.',
        meanings: 'Kmax: maximum kinetic energy of emitted electrons, h: Planck\'s constant, f: frequency of light, φ: work function',
        realLifeApplication: 'Solar panels.'
      },
      {
        title: 'de Broglie Wavelength',
        path: 'de-broglie-wavelength',
        formula: 'λ = h/p',
        explanation: 'The de Broglie Wavelength is the wavelength associated with a particle, demonstrating the wave-particle duality of matter.',
        meanings: 'λ: wavelength, h: Planck\'s constant, p: momentum',
        realLifeApplication: 'Electron microscopes.'
      },
      {
        title: 'Heisenberg Uncertainty Principle',
        path: 'heisenberg-uncertainty-principle',
        formula: 'ΔxΔp ≥ h/4π',
        explanation: 'The Heisenberg Uncertainty Principle states that it is impossible to simultaneously know the exact position and momentum of a particle.',
        meanings: 'Δx: uncertainty in position, Δp: uncertainty in momentum, h: Planck\'s constant',
        realLifeApplication: 'Understanding the behavior of particles at the quantum level.'
      },
      {
        title: 'Time Dilation',
        path: 'time-dilation',
        formula: 'Δt\' = γΔt',
        explanation: 'Time Dilation is a difference in the elapsed time measured by two observers, either due to a velocity difference relative to each other, or by being differently situated relative to a gravitational field.',
        meanings: 'Δt\': dilated time, γ: Lorentz factor, Δt: proper time',
        realLifeApplication: 'GPS satellites.'
      }
    ]
  },
  {
    topic: 'Nuclear Physics',
    subtopics: [
        {
            title: 'Binding Energy',
            path: 'binding-energy',
            formula: 'E = Δmc^2',
            explanation: 'The energy that holds a nucleus together, equivalent to the mass defect.',
            meanings: 'E: binding energy, Δm: mass defect, c: speed of light',
            realLifeApplication: 'Nuclear power generation.'
        },
        {
            title: 'Radioactive Decay',
            path: 'radioactive-decay',
            formula: 'N(t) = N0 * e^(-λt)',
            explanation: 'Describes the exponential decay of radioactive substances.',
            meanings: 'N(t): number of particles at time t, N0: initial number of particles, λ: decay constant',
            realLifeApplication: 'Carbon dating.'
        },
        {
            title: 'Half-Life',
            path: 'half-life',
            formula: 'T_half = ln(2)/λ',
            explanation: 'The time required for half of the radioactive nuclei to decay.',
            meanings: 'T_half: half-life, λ: decay constant',
            realLifeApplication: 'Medical imaging.'
        },
        {
            title: 'Nuclear Radius',
            path: 'nuclear-radius',
            formula: 'R = R0 * A^(1/3)',
            explanation: 'Approximates the radius of a nucleus based on its mass number.',
            meanings: 'R: nuclear radius, R0: empirical constant, A: mass number',
            realLifeApplication: 'Particle physics experiments.'
        },
        {
            title: 'Q-value of a Reaction',
            path: 'q-value',
            formula: 'Q = (m_initial - m_final) * c^2',
            explanation: 'The energy released or absorbed in a nuclear reaction.',
            meanings: 'Q: Q-value, m_initial: initial mass, m_final: final mass',
            realLifeApplication: 'Designing nuclear reactors.'
        }
    ]
},
{
    topic: 'Quantum Physics',
    subtopics: [
        {
            title: 'Schrödinger Equation',
            path: 'schrodinger-equation',
            formula: 'Hψ = Eψ',
            explanation: 'A fundamental equation in quantum mechanics that describes how the quantum state of a physical system changes over time.',
            meanings: 'H: Hamiltonian operator, ψ: wave function, E: energy',
            realLifeApplication: 'Quantum computing.'
        },
        {
            title: 'Wave Function',
            path: 'wave-function',
            formula: 'ψ(x, t)',
            explanation: 'A mathematical description of the quantum state of an isolated quantum system.',
            meanings: 'ψ: wave function, x: position, t: time',
            realLifeApplication: 'Predicting the behavior of electrons in an atom.'
        },
        {
            title: 'Expectation Value',
            path: 'expectation-value',
            formula: '<A> = ∫ψ* A ψ dx',
            explanation: 'The probabilistic expected value of the result of an experiment.',
            meanings: '<A>: expectation value of observable A, ψ: wave function',
            realLifeApplication: 'Calculating average properties of quantum systems.'
        },
        {
            title: 'Commutation Relations',
            path: 'commutation-relations',
            formula: '[X, P] = iħ',
            explanation: 'Fundamental relations between position and momentum operators.',
            meanings: 'X: position operator, P: momentum operator, ħ: reduced Planck constant',
            realLifeApplication: 'Foundation of quantum mechanics.'
        },
        {
            title: 'Quantum Tunneling',
            path: 'quantum-tunneling',
            formula: 'T ≈ e^(-2∫sqrt(2m(V(x)-E))/ħ dx)',
            explanation: 'The quantum mechanical phenomenon where a particle tunnels through a barrier that it classically cannot surmount.',
            meanings: 'T: transmission coefficient, V(x): potential barrier, E: energy',
            realLifeApplication: 'Scanning tunneling microscopes.'
        }
    ]
},
{
    topic: 'Advanced Quantum Physics',
    subtopics: [
        {
            title: 'Dirac Equation',
            path: 'dirac-equation',
            formula: '(iħγ^μ ∂_μ - mc)ψ = 0',
            explanation: 'A relativistic wave equation that describes electrons and other spin-1/2 particles.',
            meanings: 'γ^μ: gamma matrices, ∂_μ: four-gradient, m: mass, c: speed of light, ψ: wave function',
            realLifeApplication: 'Quantum electrodynamics.'
        },
        {
            title: 'Quantum Field Theory (QFT)',
            path: 'qft',
            formula: 'L = ψ(iγ^μ ∂_μ - m)ψ - (1/4)F_μν F^μν',
            explanation: 'A theoretical framework that combines classical field theory, special relativity, and quantum mechanics.',
            meanings: 'L: Lagrangian density, F_μν: electromagnetic field tensor',
            realLifeApplication: 'Standard Model of particle physics.'
        },
        {
            title: 'Feynman Path Integral',
            path: 'feynman-path-integral',
            formula: 'K(a,b) = ∫e^(iS/ħ) D[x(t)]',
            explanation: 'A formulation of quantum mechanics that sums over all possible trajectories a particle can take.',
            meanings: 'K(a,b): propagator, S: action, D[x(t)]: path integral measure',
            realLifeApplication: 'Quantum gravity research.'
        },
        {
            title: 'Quantum Entanglement',
            path: 'quantum-entanglement',
            formula: '|ψ> = (1/√2)(|01> - |10>)',
            explanation: 'A physical phenomenon that occurs when pairs or groups of particles are generated in such a way that the quantum state of each particle cannot be described independently of the others.',
            meanings: '|ψ>: entangled state',
            realLifeApplication: 'Quantum cryptography.'
        },
        {
            title: 'Quantum Chromodynamics (QCD)',
            path: 'qcd',
            formula: 'L_QCD = -1/4 G^a_μν G_a^μν + Σ_f ψ_f(iγ^μ D_μ - m_f)ψ_f',
            explanation: 'The theory of the strong interaction between quarks and gluons.',
            meanings: 'G^a_μν: gluon field strength tensor, D_μ: covariant derivative',
            realLifeApplication: 'Understanding the structure of protons and neutrons.'
        },
        {
            title: 'Spontaneous Symmetry Breaking',
            path: 'spontaneous-symmetry-breaking',
            formula: 'V(φ) = -μ^2|φ|^2 + λ|φ|^4',
            explanation: 'A phenomenon where a system in a symmetric state ends up in an asymmetric state.',
            meanings: 'V(φ): Higgs potential, φ: Higgs field',
            realLifeApplication: 'Explaining the origin of mass (Higgs mechanism).'
        },
        {
            title: 'Anomalous Magnetic Moment',
            path: 'anomalous-magnetic-moment',
            formula: 'a_e = (g-2)/2',
            explanation: 'A measure of the deviation of the magnetic moment of a particle from the value predicted by the Dirac equation.',
            meanings: 'a_e: anomalous magnetic moment of the electron, g: g-factor',
            realLifeApplication: 'Precision tests of QED.'
        },
        {
            title: 'Berry Phase',
            path: 'berry-phase',
            formula: 'γ_n(C) = i∮<ψ_n(R)|∇_R|ψ_n(R)> dR',
            explanation: 'A phase acquired by a quantum system when it is subjected to cyclic adiabatic processes.',
            meanings: 'γ_n(C): Berry phase, ψ_n(R): eigenstate',
            realLifeApplication: 'Topological insulators.'
        },
        {
            title: 'Aharonov-Bohm Effect',
            path: 'aharonov-bohm-effect',
            formula: 'Δφ = (q/ħ)∮A ⋅ dl',
            explanation: 'A quantum mechanical phenomenon in which an electrically charged particle is affected by an electromagnetic potential, despite being confined to a region in which both the magnetic field and electric field are zero.',
            meanings: 'Δφ: phase shift, A: vector potential',
            realLifeApplication: 'Quantum computing and nanotechnology.'
        },
        {
            title: 'Casimir Effect',
            path: 'casimir-effect',
            formula: 'F/A = -ħcπ^2 / (240d^4)',
            explanation: 'A physical force acting on the macroscopic boundaries of a confined space which arises from the quantum fluctuations of the field.',
            meanings: 'F/A: force per unit area, d: distance between plates',
            realLifeApplication: 'Microelectromechanical systems (MEMS).'
        },
        {
            title: 'Hawking Radiation',
            path: 'hawking-radiation',
            formula: 'T_H = ħc^3 / (8πGMk_B)',
            explanation: 'Black-body radiation that is predicted to be released by black holes, due to quantum effects near the event horizon.',
            meanings: 'T_H: Hawking temperature, M: mass of the black hole',
            realLifeApplication: 'Theoretical astrophysics.'
        },
        {
            title: 'Unruh Effect',
            path: 'unruh-effect',
            formula: 'T_U = ħa / (2πck_B)',
            explanation: 'The prediction that an accelerating observer will observe black-body radiation where an inertial observer would observe none.',
            meanings: 'T_U: Unruh temperature, a: acceleration',
            realLifeApplication: 'Quantum field theory in curved spacetime.'
        },
        {
            title: 'Klein-Gordon Equation',
            path: 'klein-gordon-equation',
            formula: '(∂^μ ∂_μ + (mc/ħ)^2)ψ = 0',
            explanation: 'A relativistic wave equation, related to the Schrödinger equation, which describes spin-0 particles.',
            meanings: 'ψ: wave function, m: mass',
            realLifeApplication: 'Meson physics.'
        },
        {
            title: 'Majorana Fermion',
            path: 'majorana-fermion',
            formula: 'ψ = ψ^c',
            explanation: 'A fermion that is its own antiparticle.',
            meanings: 'ψ: Majorana fermion field, ψ^c: charge conjugate field',
            realLifeApplication: 'Topological quantum computing.'
        },
        {
            title: 'Wheeler-DeWitt Equation',
            path: 'wheeler-dewitt-equation',
            formula: 'H|ψ> = 0',
            explanation: 'An equation that attempts to combine quantum mechanics and general relativity, forming a theory of quantum gravity.',
            meanings: 'H: Hamiltonian constraint, |ψ>: wave function of the universe',
            realLifeApplication: 'Quantum cosmology.'
        },
        {
            title: 'AdS/CFT Correspondence',
            path: 'ads-cft-correspondence',
            formula: 'Z_AdS = Z_CFT',
            explanation: 'A conjectured relationship between two kinds of physical theories: Anti-de Sitter spaces (AdS) and conformal field theories (CFT).',
            meanings: 'Z: partition function',
            realLifeApplication: 'String theory and condensed matter physics.'
        },
        {
            title: 'Gell-Mann-Nishijima Formula',
            path: 'gell-mann-nishijima-formula',
            formula: 'Q = I_3 + (B+S)/2',
            explanation: 'Relates the electric charge of a hadron to its isospin, baryon number, and strangeness.',
            meanings: 'Q: charge, I_3: isospin projection, B: baryon number, S: strangeness',
            realLifeApplication: 'Particle classification.'
        },
        {
            title: 'CPT Theorem',
            path: 'cpt-theorem',
            formula: 'CPT = 1',
            explanation: 'States that the fundamental physical laws are invariant under the combined transformation of charge conjugation (C), parity inversion (P), and time reversal (T).',
            meanings: 'C, P, T: symmetry operators',
            realLifeApplication: 'Foundation of quantum field theory.'
        },
        {
            title: 'Goldstone\'s Theorem',
            path: 'goldstones-theorem',
            formula: 'N_symmetries > N_generators => N_Goldstone_bosons > 0',
            explanation: 'In a theory with a spontaneously broken continuous symmetry, there must exist massless particles called Goldstone bosons.',
            meanings: 'N: number',
            realLifeApplication: 'Particle physics and condensed matter.'
        },
        {
            title: 'Wigner-Eckart Theorem',
            path: 'wigner-eckart-theorem',
            formula: '<j,m|T^k_q|j\',m\'> = <j\'m\'kq|j\'kjm> <j||T^k||j\'>',
            explanation: 'A theorem in representation theory that simplifies the calculation of matrix elements of spherical tensor operators.',
            meanings: 'T^k_q: spherical tensor operator, <...>: Clebsch-Gordan coefficients',
            realLifeApplication: 'Atomic and nuclear spectroscopy.'
        },
        {
            title: 'No-Hair Theorem',
            path: 'no-hair-theorem',
            formula: 'Black Hole = (M, J, Q)',
            explanation: 'Postulates that a stable black hole is completely characterized by only three externally observable classical parameters: mass (M), angular momentum (J), and electric charge (Q).',
            meanings: 'M: mass, J: angular momentum, Q: charge',
            realLifeApplication: 'Black hole physics.'
        },
        {
            title: 'Bekenstein-Hawking Entropy',
            path: 'bekenstein-hawking-entropy',
            formula: 'S_BH = (k_B A c^3) / (4Għ)',
            explanation: 'The entropy of a black hole is proportional to the area of its event horizon.',
            meanings: 'S_BH: black hole entropy, A: horizon area',
            realLifeApplication: 'Black hole thermodynamics.'
        },
        {
            title: 'Hartle-Hawking State',
            path: 'hartle-hawking-state',
            formula: 'Ψ_HH[g_ij] = ∫D[g]e^(-S_E[g])',
            explanation: 'A proposal for the wave function of the universe, calculated via a path integral over all possible Euclidean metrics.',
            meanings: 'Ψ_HH: Hartle-Hawking wave function, S_E: Euclidean action',
            realLifeApplication: 'Quantum cosmology.'
        },
        {
            title: 'Caldeira-Leggett Model',
            path: 'caldeira-leggett-model',
            formula: 'H = p^2/(2M) + V(q) + Σ_i [p_i^2/(2m_i) + 1/2 m_i ω_i^2 (x_i - c_i q / (m_i ω_i^2))^2]',
            explanation: 'A model for quantum dissipation that describes a quantum system coupled to a bath of harmonic oscillators.',
            meanings: 'H: Hamiltonian, q: system coordinate, x_i: bath coordinates',
            realLifeApplication: 'Quantum decoherence and open quantum systems.'
        }
    ]
}
];
