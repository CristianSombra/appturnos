import { Request, Response } from 'express';
import { Agenda, Profesional } from '../models';

export const crearAgenda = async (req: Request, res: Response) => {
  try {
    const { id_profesional, dia_semana, hora_inicio, hora_fin, duracion_turno_min } = req.body;

    if (!id_profesional || dia_semana === undefined || !hora_inicio || !hora_fin || !duracion_turno_min) {
      return res.status(400).json({ mensaje: 'Datos incompletos para crear agenda' });
    }

    const profesionalExiste = await Profesional.findByPk(id_profesional);
    if (!profesionalExiste) {
      return res.status(404).json({ mensaje: 'Profesional no encontrado' });
    }

    const agenda = await Agenda.create({
      id_profesional,
      dia_semana,
      hora_inicio,
      hora_fin,
      duracion_turno_min
    });

    return res.status(201).json(agenda);
  } catch (error) {
    console.error('Error al crear agenda:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const obtenerAgendas = async (_req: Request, res: Response) => {
  try {
    const agendas = await Agenda.findAll({ include: [{ model: Profesional, as: 'profesional' }] });
    return res.status(200).json(agendas);
  } catch (error) {
    console.error('Error al obtener agendas:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
