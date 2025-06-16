import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Artifact } from './artifacts/artifact.entity'; // ajusta la ruta según tu estructura
import * as dotenvFlow from 'dotenv-flow';

dotenvFlow.config(); // Carga automáticamente .env, .env.development, etc.

//import * as dotenv from 'dotenv';

// dotenv.config(); // para cargar variables de entorno .env
// dotenv.config({ path: '.env.development' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'db',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Artifact],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

console.log('Conectando con:', {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD, // temporal, para verificar
  database: process.env.POSTGRES_DB,
});