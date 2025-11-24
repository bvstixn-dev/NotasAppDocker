import pkg from 'pg';
const { Pool } = pkg;

// Usa variables de entorno si existen, si no, valores por defecto para correr local
const pool = new Pool({
  host: process.env.PGHOST || 'db',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'notas_db',
  port: process.env.PGPORT || 5432,
});

export default pool;

