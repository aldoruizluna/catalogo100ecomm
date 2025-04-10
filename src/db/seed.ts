import db from '.';
import { courses } from './schema';
import { existsSync, mkdirSync } from 'fs';

// Ensure db directory exists
const dbDir = './src/db';
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

const sampleCourses = [
  {
    name: 'Manufactura Sostenible 101',
    category: 'Manufactura',
    description: 'Fundamentos de producción eco-amigable',
    duration: 20,
    instructor: 'Dra. Elena Martínez',
  },
  {
    name: 'Transformación Digital Avanzada',
    category: 'Digital',
    description: 'Tecnologías disruptivas para negocios',
    duration: 30,
    instructor: 'Ing. Carlos Fuentes',
  },
  {
    name: 'Principios Solarpunk',
    category: 'Sostenibilidad',
    description: 'Filosofía y aplicación práctica',
    duration: 15,
    instructor: 'Lic. Ana Solar',
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
