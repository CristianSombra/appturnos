import express from 'express';
import dotenv from 'dotenv';
import usuariosRoutes from './routes/usuario.routes';
import especialidadRoutes from './routes/especialidad.routes';
import agendaRoutes from './routes/agenda.routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();
const app = express();

app.use(express.json());

//Rutas de usuario
app.use('/usuarios', usuariosRoutes)

//Rutas de especialidades
app.use('/especialidades', especialidadRoutes)

//Rutas de agenda
app.use('/agendas', agendaRoutes);

app.get("/", (_req, res) => {
    res.send("Api Turnos médicos funcionando ✅")
});

app.use(errorHandler);

export default app;