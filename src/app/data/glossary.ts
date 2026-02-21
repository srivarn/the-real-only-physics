export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example: string;
  tags: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { id: 'acceleration', term: 'Acceleration', definition: 'How quickly velocity changes over time.', example: 'A falling apple speeds up because gravity gives it acceleration.', tags: ['mechanics'] },
  { id: 'amplitude', term: 'Amplitude', definition: 'The maximum distance from the middle position in a wave or oscillation.', example: 'A louder sound usually has a larger amplitude.', tags: ['waves'] },
  { id: 'capacitance', term: 'Capacitance', definition: 'How much electric charge a capacitor can store per volt.', example: 'A phone flash circuit uses a capacitor to store charge.', tags: ['electromagnetism'] },
  { id: 'diffraction', term: 'Diffraction', definition: 'The bending and spreading of waves around edges or through gaps.', example: 'You can hear someone behind a door because sound diffracts.', tags: ['waves'] },
  { id: 'entropy', term: 'Entropy', definition: 'A measure of disorder or energy spreading in a system.', example: 'Ice melting in warm air increases entropy.', tags: ['thermodynamics'] },
  { id: 'force', term: 'Force', definition: 'A push or pull that can change an object’s motion.', example: 'Kicking a ball applies a force.', tags: ['mechanics'] },
  { id: 'inertia', term: 'Inertia', definition: 'The tendency of objects to resist changes in motion.', example: 'Passengers lurch forward when a car stops suddenly.', tags: ['mechanics'] },
  { id: 'momentum', term: 'Momentum', definition: 'The quantity of motion, equal to mass times velocity.', example: 'A heavy moving truck has large momentum.', tags: ['mechanics'] },
  { id: 'photon', term: 'Photon', definition: 'A tiny packet of light energy.', example: 'Solar panels absorb photons to generate electricity.', tags: ['quantum'] },
  { id: 'voltage', term: 'Voltage', definition: 'Electric potential difference that pushes charge through a circuit.', example: 'A AA battery provides about 1.5 volts.', tags: ['electromagnetism'] }
];
