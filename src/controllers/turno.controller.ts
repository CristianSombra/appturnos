import { Request, Response } from 'express';
import { Turno, Profesional, Paciente } from '../models';

export const crearTurno = async (req: Request, res: Response) => {
  try {
    const { id_paciente, id_profesional, fecha, hora, estado, motivo } = req.body;

    if (!id_paciente || !id_profesional || !fecha || !hora || !estado || !motivo) {
      return res.status(400).json({ mensaje: 'Datos incompletos para crear turno' });
    }

    const turno = await Turno.create({ id_paciente, id_profesional, fecha, hora, estado, motivo });
    return res.status(201).json(turno);
  } catch (error) {
    console.error('Error al crear turno:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const obtenerTurnos = async (_req: Request, res: Response) => {
  try {
    const turnos = await Turno.findAll({ 
    include: [
      { model: Profesional, as: 'profesional' },
      { model: Paciente, as: 'paciente' }
  ]
     });
    return res.status(200).json(turnos);
  } catch (error) {
    console.error('Error al obtener turnos:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const actualizarTurno = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fecha, hora, estado, motivo } = req.body;

    const turno = await Turno.findByPk(id);
    if (!turno) return res.status(404).json({ mensaje: 'Turno no encontrado' });

    await turno.update({
      fecha: fecha ?? turno.fecha,
      hora: hora ?? turno.hora,
      estado: estado ?? turno.estado,
      motivo: motivo ?? turno.motivo
    });

    return res.status(200).json({ mensaje: 'Turno actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar turno:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const eliminarTurno = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findByPk(id);

    if (!turno) return res.status(404).json({ mensaje: 'Turno no encontrado' });

    await turno.destroy();
    return res.status(200).json({ mensaje: 'Turno eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar turno:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
