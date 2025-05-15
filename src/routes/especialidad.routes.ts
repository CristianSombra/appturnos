import { Router } from 'express';
import { listarEspecialidades } from '../controllers/especialidad.controller';

const especialidadRoutes = Router();

especialidadRoutes.get('/', listarEspecialidades);

export default especialidadRoutes;