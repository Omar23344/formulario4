import cors from 'cors';
import express, { Request, Response } from 'express';
import { connectDB } from './database/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json()); // Middleware para parsear JSON

// Ruta: Consultar todos los registros
app.get('/api/estacionamientos', async (req: Request, res: Response) => {
  const db = await connectDB();
  const [rows] = await db.execute('SELECT * FROM estacionamientos');
  res.json(rows);
});

// Ruta: Agregar un nuevo registro
app.post('/api/estacionamientos', async (req: Request, res: Response) => {
  const { placa, horas, tarifa } = req.body;
  const db = await connectDB();
  const [result] = await db.execute(
    'INSERT INTO estacionamientos (placa, horas, tarifa) VALUES (?, ?, ?)',
    [placa, horas, tarifa]
  );
  res.json({ id: (result as any).insertId });
});

// Ruta: Editar un registro
app.put('/api/estacionamientos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { placa, horas, tarifa } = req.body;
  const db = await connectDB();
  await db.execute(
    'UPDATE estacionamientos SET placa = ?, horas = ?, tarifa = ? WHERE id = ?',
    [placa, horas, tarifa, id]
  );
  res.sendStatus(200);
});

// Ruta: Eliminar un registro
app.delete('/api/estacionamientos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await connectDB();
  await db.execute('DELETE FROM estacionamientos WHERE id = ?', [id]);
  res.sendStatus(200);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});