import { sequelize } from '../../config/database';
import { Usuario, initUsuarioModel } from '../../models/usuario.model';
import { Paciente, initPacienteModel } from '../../models/paciente.model';
import { Profesional, initProfesionalModel } from '../../models/profesional.model';
import { Especialidad, initEspecialidadModel } from '../../models/especialidades.model';
import { Turno, initTurnoModel } from '../../models/turno.model';

beforeAll(async () => {
  initUsuarioModel(sequelize);
  initPacienteModel(sequelize);
  initEspecialidadModel(sequelize);
  initProfesionalModel(sequelize);
  initTurnoModel(sequelize);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo Turno', () => {
  it('debería crear un turno entre paciente y profesional', async () => {
    const pacienteUser = await Usuario.create({
      nombre: 'Marcela',
      apellido: 'Ibáñez',
      email: 'marcela@example.com',
      password_hash: '123456',
      telefono: '123123123',
      tipo_usuario: 'paciente',
      fecha_creacion: new Date()
    });

    const paciente = await Paciente.create({
      usuario_id: pacienteUser.id,
      fecha_nacimiento: new Date('1980-05-20'),
      dni: '30222333'
    });

    const profesionalUser = await Usuario.create({
      nombre: 'Andrés',
      apellido: 'Suárez',
      email: 'andres@example.com',
      password_hash: 'abc123',
      telefono: '555555555',
      tipo_usuario: 'profesional',
      fecha_creacion: new Date()
    });

    const especialidad = await Especialidad.create({ nombre: 'Traumatología' });

    const profesional = await Profesional.create({
      usuario_id: profesionalUser.id,
      matricula: 'TRAU456',
      especialidad_id: especialidad.id,
      descripcion: 'Traumatólogo deportivo'
    });

    const turno = await Turno.create({
      id_paciente: paciente.id,
      id_profesional: profesional.id,
      fecha: new Date('2025-06-01'),
      hora: '09:30',
      estado: 'pendiente',
      motivo: 'Dolor en rodilla'
    });

    expect(turno.id).toBeDefined();
    expect(turno.id_paciente).toBe(paciente.id);
    expect(turno.id_profesional).toBe(profesional.id);
  });
});
