import { Request, Response } from 'express';
import { Especialidad } from '../models';

export const listarEspecialidades = async (_req: Request, res: Response) => {
  const especialidades = await Especialidad.findAll();
  res.status(200).json(especialidades);
};
