import request from 'supertest';
import app from '../../../src/app';
import { sequelize } from '../../../src/config/database';
import { initModels, Usuario } from '../../../src/models';

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await initModels();
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

describe('POST /usuarios', () => {
  it('debería crear un nuevo usuario y devolver 201', async () => {
    const nuevoUsuario = {
      nombre: 'Test',
      apellido: 'User',
      email: 'testuser@example.com',
      password_hash: 'hashedpassword123',
      telefono: '123456789',
      tipo_usuario: 'paciente',
    };

    const response = await request(app)
      .post('/usuarios')
      .send(nuevoUsuario);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(nuevoUsuario.email);
  });
});

describe('GET /usuarios', () => {
  it('debería devolver lista de usuarios con status 200', async () => {
    const res = await request(app).get('/usuarios');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('email');
  });
});