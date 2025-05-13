import { Usuario, initUsuarioModel } from '../../models';
import { sequelize } from '../../config/database';

beforeAll(async () => {
    initUsuarioModel(sequelize)
  await sequelize.sync({ force: true }); // Limpiar y recrear tablas
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo Usuario', () => {
  it('debería crear un usuario correctamente', async () => {
    const usuario = await Usuario.create({
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@example.com',
      password_hash: 'hashed_password',
      telefono: '123456789',
      tipo_usuario: 'paciente',
      fecha_creacion: new Date()
    });

    expect(usuario.id).toBeDefined();
    expect(usuario.email).toBe('juan@example.com');
  });
});
