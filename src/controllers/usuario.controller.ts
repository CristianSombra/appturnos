import { Request, Response } from 'express';
import { Usuario } from '../models';

//valida si el email ya existe y crea el usuario
export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, email, password_hash, telefono, tipo_usuario } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      email,
      password_hash,
      telefono,
      tipo_usuario,
      fecha_creacion: new Date()
    });

    return res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

//lista todos los usuarios registrados
export const obtenerUsuarios = async (_req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
