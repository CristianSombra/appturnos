import { sequelize } from '../../config/database';
import { Usuario, initUsuarioModel } from '../../models/usuario.model';
import { Especialidad, initEspecialidadModel } from '../../models/especialidades.model';
import { Profesional, initProfesionalModel } from '../../models/profesional.model';

beforeAll(async () => {
  initUsuarioModel(sequelize);
  initEspecialidadModel(sequelize);
  initProfesionalModel(sequelize);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo Profesional', () => {
  it('debería crear un profesional con usuario y especialidad asociados', async () => {
    const usuario = await Usuario.create({
      nombre: 'Carlos',
      apellido: 'López',
      email: 'carlos@example.com',
      password_hash: 'hash123',
      telefono: '111111111',
      tipo_usuario: 'profesional',
      fecha_creacion: new Date()
    });

    const especialidad = await Especialidad.create({ nombre: 'Neurología' });

    const profesional = await Profesional.create({
      usuario_id: usuario.id,
      matricula: 'ABC123',
      especialidad_id: especialidad.id,
      descripcion: 'Especialista en neurología infantil'
    });

    expect(profesional.id).toBeDefined();
    expect(profesional.usuario_id).toBe(usuario.id);
    expect(profesional.especialidad_id).toBe(especialidad.id);
  });
});
