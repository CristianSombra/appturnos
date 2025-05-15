import { sequelize } from '../../config/database';
import { initUsuarioModel, Usuario } from '../../models/usuario.model';
import { initPacienteModel, Paciente } from '../../models/paciente.model';

describe('Modelo Paciente', () => {
  beforeAll(async () => {
    initUsuarioModel(sequelize);
    initPacienteModel(sequelize);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('debería crear un paciente con usuario asociado', async () => {
    const usuario = await Usuario.create({
      nombre: 'Ana',
      apellido: 'Gómez',
      email: 'ana@example.com',
      password_hash: 'clave123',
      telefono: '987654321',
      tipo_usuario: 'paciente',
      fecha_creacion: new Date()
    });

    const paciente = await Paciente.create({
      usuario_id: usuario.id,
      fecha_nacimiento: new Date('1990-01-01'),
      dni: '30222111'
    });

    expect(paciente.id).toBeDefined();
    expect(paciente.usuario_id).toBe(usuario.id);
  });

  it('debería fallar al crear paciente sin dni', async () => {
    const usuario = await Usuario.create({
      nombre: 'Pedro',
      apellido: 'Martínez',
      email: 'pedro@example.com',
      password_hash: 'clave456',
      telefono: '123123123',
      tipo_usuario: 'paciente',
      fecha_creacion: new Date()
    });

    await expect(
      Paciente.create({
        usuario_id: usuario.id,
        fecha_nacimiento: new Date('1985-07-15')
      } as any)
    ).rejects.toThrow();
  });

  it('no debería permitir dni duplicado', async () => {
    const user1 = await Usuario.create({
      nombre: 'Luis',
      apellido: 'Fernández',
      email: 'luis@example.com',
      password_hash: 'clave789',
      telefono: '444444444',
      tipo_usuario: 'paciente',
      fecha_creacion: new Date()
    });

    const user2 = await Usuario.create({
      nombre: 'Mario',
      apellido: 'Rojas',
      email: 'mario@example.com',
      password_hash: 'clave987',
      telefono: '555555555',
      tipo_usuario: 'paciente',
      fecha_creacion: new Date()
    });

    await Paciente.create({
      usuario_id: user1.id,
      fecha_nacimiento: new Date('1992-03-12'),
      dni: '30123456'
    });

    await expect(
      Paciente.create({
        usuario_id: user2.id,
        fecha_nacimiento: new Date('1993-05-22'),
        dni: '30123456' // duplicado
      })
    ).rejects.toThrow();
  });
});
