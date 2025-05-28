import { Router } from 'express';
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerProfesionales,
  obtenerPacientes,
  obtenerUsuarioPorDni,
  actualizarUsuario,
  eliminarUsuario 
} from '../controllers/usuario.controller';

const router = Router();

router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);
router.get('/profesionales', obtenerProfesionales);
router.get('/pacientes', obtenerPacientes);
router.get('/dni/:dni', obtenerUsuarioPorDni);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

export default router;
