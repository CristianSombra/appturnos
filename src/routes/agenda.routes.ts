import { Router } from 'express';
import { crearAgenda, obtenerAgendas } from '../controllers/agenda.controller';

const router = Router();

router.post('/', crearAgenda);
router.get('/', obtenerAgendas);

export default router;
