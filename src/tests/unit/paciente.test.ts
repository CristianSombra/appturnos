import { sequelize } from '../../config/database';
import { initUsuarioModel, Usuario } from '../../models/usuario.model';
import { initPacienteModel, Paciente } from '../../models/paciente.model';

beforeAll(async () => {
  initUsuarioModel(sequelize);
  initPacienteModel(sequelize);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo Paciente', () => {
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
});
