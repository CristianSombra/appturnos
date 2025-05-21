import { Router, Request, Response } from 'express';
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerProfesionales,
  obtenerPacientes,
  obtenerUsuarioPorDni
} from '../controllers/usuario.controller';

const router = Router();

router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);
router.get('/profesionales', obtenerProfesionales);
router.get('/pacientes', obtenerPacientes);
router.get('/dni/:dni', obtenerUsuarioPorDni);

export default router;
