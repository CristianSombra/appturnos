import { Router } from 'express';
import { crearAgenda, obtenerAgendas, actualizarAgenda, eliminarAgenda, obtenerAgendasPorProfesional } from '../controllers/agenda.controller';

const router = Router();

router.post('/', crearAgenda);
router.get('/', obtenerAgendas);
router.put('/:id', actualizarAgenda);
router.delete('/:id', eliminarAgenda);

router.get('/porprofesional', obtenerAgendasPorProfesional);

export default router;
