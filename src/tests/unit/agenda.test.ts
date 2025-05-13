import { sequelize } from '../../config/database';
import { Usuario, initUsuarioModel } from '../../models/usuario.model';
import { Especialidad, initEspecialidadModel } from '../../models/especialidades.model';
import { Profesional, initProfesionalModel } from '../../models/profesional.model';
import { Agenda, initAgendaModel } from '../../models/agenda.model';

beforeAll(async () => {
  initUsuarioModel(sequelize);
  initEspecialidadModel(sequelize);
  initProfesionalModel(sequelize);
  initAgendaModel(sequelize);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo Agenda', () => {
  it('debería crear una agenda asociada a un profesional', async () => {
    const usuario = await Usuario.create({
      nombre: 'Laura',
      apellido: 'Fernández',
      email: 'laura@example.com',
      password_hash: 'clave123',
      telefono: '222222222',
      tipo_usuario: 'profesional',
      fecha_creacion: new Date()
    });

    const especialidad = await Especialidad.create({ nombre: 'Dermatología' });

    const profesional = await Profesional.create({
      usuario_id: usuario.id,
      matricula: 'DERM001',
      especialidad_id: especialidad.id,
      descripcion: 'Dermatóloga certificada'
    });

    const agenda = await Agenda.create({
      id_profesional: profesional.id,
      dia_semana: 2,
      hora_inicio: '08:00',
      hora_fin: '12:00',
      duracion_turno_min: 30
    });

    expect(agenda.id).toBeDefined();
    expect(agenda.id_profesional).toBe(profesional.id);
  });
});
