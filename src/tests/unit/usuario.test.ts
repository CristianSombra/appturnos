import { Usuario, initUsuarioModel } from '../../models';
import { sequelize } from '../../config/database';

describe('Modelo Usuario', () => {
  beforeAll(async () => {
    initUsuarioModel(sequelize);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

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

  it('no debería permitir emails duplicados', async () => {
    await Usuario.create({
      nombre: 'Ana',
      apellido: 'López',
      email: 'duplicado@example.com',
      password_hash: '123',
      telefono: '999',
      tipo_usuario: 'paciente',
      fecha_creacion: new Date()
    });

    await expect(
      Usuario.create({
        nombre: 'Carlos',
        apellido: 'Ruiz',
        email: 'duplicado@example.com',
        password_hash: '456',
        telefono: '888',
        tipo_usuario: 'profesional',
        fecha_creacion: new Date()
      })
    ).rejects.toThrow();
  });

  it('debería fallar al crear usuario sin email', async () => {
    await expect(
      Usuario.create({
        nombre: 'SinEmail',
        apellido: 'Test',
        password_hash: 'abc',
        telefono: '111',
        tipo_usuario: 'paciente',
        fecha_creacion: new Date()
      } as any)
    ).rejects.toThrow();
  });
});
