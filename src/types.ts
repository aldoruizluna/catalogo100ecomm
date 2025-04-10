// Centralized type definitions

export interface Course {
  id: number;
  name: string;
  category: string;
  description: string | null;
  duration: number | null;
  instructor: string | null;
  createdAt?: Date | null; // Allow null based on schema, make optional if not always present
}
