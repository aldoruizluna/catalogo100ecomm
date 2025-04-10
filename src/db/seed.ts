import db from '.';
import { courses } from './schema';
import { existsSync, mkdirSync } from 'fs';

// Ensure db directory exists
const dbDir = './src/db';
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

// Updated sample data based on provided HTML (Fabricación Sostenible section)
const sampleCourses = [
  {
    name: 'Fundamentos de Fabricación Sostenible',
    category: 'Fabricación Sostenible',
    description:
      'Comprender los principios fundamentales de la fabricación sostenible y su aplicación en entornos industriales modernos.',
    duration: 40,
    instructor: 'Ing. Sofia Reyes',
  },
  {
    name: 'Diseño de Productos Ecológicos',
    category: 'Fabricación Sostenible',
    description:
      'Desarrollar competencias para diseñar productos con mínimo impacto ambiental manteniendo funcionalidad y estética.',
    duration: 60,
    instructor: 'Dra. Laura Gómez',
  },
  {
    name: 'Energías Renovables en Procesos Industriales',
    category: 'Fabricación Sostenible',
    description:
      'Capacitar en la implementación de sistemas de energía renovable para procesos industriales optimizando eficiencia y rentabilidad.',
    duration: 50,
    instructor: 'Mtro. Javier Peña',
  },
  {
    name: 'Gestión de Residuos Industriales',
    category: 'Fabricación Sostenible',
    description:
      'Desarrollar competencias para implementar sistemas de gestión integral de residuos industriales bajo principios de economía circular.',
    duration: 45,
    instructor: 'Biol. Ricardo Morales',
  },
  {
    name: 'Producción Más Limpia (P+L)',
    category: 'Fabricación Sostenible',
    description:
      'Capacitar en estrategias preventivas para reducir impactos ambientales y optimizar recursos en procesos productivos.',
    duration: 55,
    instructor: 'Dra. Elena Martínez', // Re-using one from old seed
  },
];

async function seed() {
  try {
    console.log('⏳ Seeding database...');

    // Clear existing data
    await db.delete(courses).run();

    // Insert sample data
    await db.insert(courses).values(sampleCourses).run();

    console.log('✅ Database seeded successfully');
    return true;
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return false;
  }
}

seed().then((success) => {
  process.exit(success ? 0 : 1);
});
