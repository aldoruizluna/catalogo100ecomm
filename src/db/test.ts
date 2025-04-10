import db from '.';
import { courses } from './schema';

async function testConnection() {
  try {
    const result = await db.select().from(courses).all();
    console.log('✅ Database connection successful');
    console.log(`📊 Found ${result.length} courses`);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

testConnection().then(success => {
  process.exit(success ? 0 : 1);
});
