import { Router, Request, Response } from 'express';
import { crearUsuario, obtenerUsuarios } from '../controllers/usuario.controller';

const router = Router();

router.post('/', (req:Request, res:Response) => void crearUsuario(req, res));
router.get('/', (req:Request, res:Response) => void obtenerUsuarios(req, res));

export default router;
