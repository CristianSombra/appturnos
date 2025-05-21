import { Request, Response } from 'express';
import { Usuario, Profesional, Paciente, Especialidad } from '../models';

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

    if (!dni || !fecha_nacimiento) {
      return res.status(400).json({ mensaje: 'DNI y fecha de nacimiento son obligatorios' });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
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
      const nuevoPaciente = await Paciente.create({ usuario_id: nuevoUsuario.id });
      return res.status(201).json({ usuario: nuevoUsuario, paciente: nuevoPaciente });
    }

    return res.status(400).json({ mensaje: 'Tipo de usuario inválido' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const obtenerUsuarios = async (_req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const obtenerProfesionales = async (_req: Request, res: Response) => {
  try {
    const profesionales = await Profesional.findAll({
      include: [
        { model: Usuario, as: 'usuario' },
        { model: Especialidad, as: 'especialidad' }
      ]
    });

    const resultados = profesionales.map((p) => ({
      usuario: {
        id: p.usuario?.id,
        nombre: p.usuario?.nombre,
        apellido: p.usuario?.apellido,
        email: p.usuario?.email,
        telefono: p.usuario?.telefono,
        tipo_usuario: p.usuario?.tipo_usuario,
        fecha_nacimiento: p.usuario?.fecha_nacimiento,
        dni: p.usuario?.dni
      },
      profesional: {
        id: p.id,
        matricula: p.matricula,
        descripcion: p.descripcion
      },
      especialidad: {
        id: p.especialidad?.id,
        nombre: p.especialidad?.nombre
      }
    }));

    return res.status(200).json(resultados);
  } catch (error) {
    console.error('Error al obtener profesionales:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const obtenerPacientes = async (_req: Request, res: Response) => {
  try {
    const pacientes = await Paciente.findAll({
      include: [{ model: Usuario, as: 'usuario' }]
    });

    const resultados = pacientes.map((p) => ({
      usuario: {
        id: p.usuario?.id,
        nombre: p.usuario?.nombre,
        apellido: p.usuario?.apellido,
        email: p.usuario?.email,
        telefono: p.usuario?.telefono,
        tipo_usuario: p.usuario?.tipo_usuario,
        fecha_nacimiento: p.usuario?.fecha_nacimiento,
        dni: p.usuario?.dni
      },
      paciente: {
        id: p.id
      }
    }));

    return res.status(200).json(resultados);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};