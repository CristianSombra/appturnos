import { Request, Response } from 'express';
import { Usuario, Profesional, Paciente } from '../models';

//valida si el email ya existe y crea el usuario
export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      apellido,
      email,
      password_hash,
      telefono,
      tipo_usuario,
      matricula,
      especialidad_id,
      descripcion,
      fecha_nacimiento,
      dni
    } = req.body;

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

    if (tipo_usuario === 'profesional') {
      if (!matricula || !especialidad_id || !descripcion) {
        return res.status(400).json({ mensaje: 'Faltan datos del profesional' });
      }

      const nuevoProfesional = await Profesional.create({
        usuario_id: nuevoUsuario.id,
        matricula,
        especialidad_id,
        descripcion
      });

      return res.status(201).json({ usuario: nuevoUsuario, profesional: nuevoProfesional });
    }

    if (tipo_usuario === 'paciente') {
      if (!fecha_nacimiento || !dni) {
        return res.status(400).json({ mensaje: 'Faltan datos del paciente' });
      }

      const nuevoPaciente = await Paciente.create({
        usuario_id: nuevoUsuario.id,
        fecha_nacimiento,
        dni
      });

      return res.status(201).json({ usuario: nuevoUsuario, paciente: nuevoPaciente });
    }

    return res.status(400).json({ mensaje: 'Tipo de usuario inválido' });

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
