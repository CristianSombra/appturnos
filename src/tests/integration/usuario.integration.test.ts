import request from 'supertest';
import app from '../../../src/app';
import { sequelize } from '../../../src/config/database';
import { initModels, Usuario, Especialidad } from '../../../src/models';

describe('Integración Usuario', () => {
  beforeAll(async () => {
    await initModels();
    await sequelize.sync({ force: true });

    await Especialidad.bulkCreate([
      { nombre: 'Cardiología' },
      { nombre: 'Pediatría' },
      { nombre: 'Dermatología' },
      { nombre: 'Neurología' },
      { nombre: 'Traumatología' },
      { nombre: 'Clínica Médica' },
    ], { ignoreDuplicates: true });

    await Usuario.create({
      nombre: 'Carlos',
      apellido: 'Lopez',
      email: 'carlos@example.com',
      password_hash: 'hashed123',
      telefono: '1234567890',
      tipo_usuario: 'paciente',
      fecha_creacion: new Date(),
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('debería crear un nuevo usuario paciente y devolver 201', async () => {
    const nuevoUsuario = {
      nombre: 'Test',
      apellido: 'User',
      email: 'testuser@example.com',
      password_hash: 'hashedpassword123',
      telefono: '123456789',
      tipo_usuario: 'paciente',
      fecha_nacimiento: '1995-01-01',
      dni: '30333444'
    };

    const response = await request(app).post('/usuarios').send(nuevoUsuario);

    expect(response.status).toBe(201);
    expect(response.body.usuario).toBeDefined();
    expect(response.body.paciente).toBeDefined();
    expect(response.body.usuario.email).toBe(nuevoUsuario.email);
  });

  it('debería crear un nuevo profesional y devolver 201', async () => {
    const nuevoPro = {
      nombre: 'Pro',
      apellido: 'Fesional',
      email: 'pro@example.com',
      password_hash: 'clavepro',
      telefono: '222333444',
      tipo_usuario: 'profesional',
      matricula: 'MP9999',
      especialidad_id: 1,
      descripcion: 'Cardiólogo experto'
    };

    const res = await request(app).post('/usuarios').send(nuevoPro);

    expect(res.status).toBe(201);
    expect(res.body.usuario).toBeDefined();
    expect(res.body.profesional).toBeDefined();
    expect(res.body.usuario.email).toBe('pro@example.com');
  });

  it('debería rechazar creación si falta campo obligatorio en profesional', async () => {
    const incompleto = {
      nombre: 'Fallo',
      apellido: 'Test',
      email: 'fallo@example.com',
      password_hash: '123',
      telefono: '111',
      tipo_usuario: 'profesional',
      especialidad_id: 2 // falta matricula y descripcion
    };

    const res = await request(app).post('/usuarios').send(incompleto);
    expect(res.status).toBe(400);
    expect(res.body.mensaje).toMatch(/Faltan datos del profesional/);
  });

  it('debería rechazar email duplicado', async () => {
    const duplicado = {
      nombre: 'Repetido',
      apellido: 'Correo',
      email: 'carlos@example.com',
      password_hash: '123',
      telefono: '000',
      tipo_usuario: 'paciente',
      fecha_nacimiento: '1992-03-12',
      dni: '30999999'
    };

    const res = await request(app).post('/usuarios').send(duplicado);
    expect(res.status).toBe(400);
    expect(res.body.mensaje).toMatch(/ya está registrado/);
  });

  it('debería devolver lista de usuarios con status 200', async () => {
    const res = await request(app).get('/usuarios');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('email');
  });
});
