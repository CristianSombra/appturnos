import { Router } from "express";
import {
    crearTurno,
    obtenerTurnos,
    actualizarTurno,
    eliminarTurno
} from '../controllers/turno.controller';

const router = Router();

router.post('/', crearTurno);
router.get('/', obtenerTurnos);
router.put('/:id', actualizarTurno);
router.delete('/:id', eliminarTurno);

export default router;