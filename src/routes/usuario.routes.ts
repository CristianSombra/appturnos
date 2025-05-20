import { Router, Request, Response } from 'express';
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerProfesionales,
  obtenerPacientes
} from '../controllers/usuario.controller';

const router = Router();

router.post('/', (req: Request, res: Response) => void crearUsuario(req, res));
router.get('/', (req: Request, res: Response) => void obtenerUsuarios(req, res));
router.get('/profesionales', (req: Request, res: Response) => void obtenerProfesionales(req, res));
router.get('/pacientes', (req: Request, res: Response) => void obtenerPacientes(req, res));

export default router;
