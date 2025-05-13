import { sequelize } from '../../config/database';
import { Especialidad, initEspecialidadModel } from '../../models/especialidades.model';

beforeAll(async () => {
  initEspecialidadModel(sequelize);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Modelo Especialidad', () => {
  it('debería crear una especialidad correctamente', async () => {
    const esp = await Especialidad.create({ nombre: 'Cardiología' });

    expect(esp.id).toBeDefined();
    expect(esp.nombre).toBe('Cardiología');
  });
});
