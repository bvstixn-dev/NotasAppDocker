import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from './db.js';
const esperarDB = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🟢 Crear tabla si no existe
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notas (
        id SERIAL PRIMARY KEY,
        titulo TEXT NOT NULL,
        contenido TEXT
      );
    `);
    console.log("Tabla 'notas' verificada");
  } catch (err) {
    console.error("Error al crear/verificar la tabla:", err.message);
  }
};

createTable();

// 🟢 GET todas las notas
app.get('/notas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notas ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 POST nueva nota
app.post('/notas', async (req, res) => {
  try {
    const { titulo, contenido } = req.body;
    const result = await pool.query(
      'INSERT INTO notas (titulo, contenido) VALUES ($1, $2) RETURNING *',
      [titulo, contenido]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 DELETE una nota
app.delete('/notas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM notas WHERE id = $1', [id]);
    res.json({ message: 'Nota eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Servidor
const PORT = process.env.PORT || 3000;
await esperarDB(2000); // Espera 2 segundos
app.listen(PORT, () => console.log(`🚀 Backend escuchando en puerto ${PORT}`));
