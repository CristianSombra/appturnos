import { sequelize } from "../config/database";
import { Usuario, initUsuarioModel } from "./usuario.model";
import { Paciente, initPacienteModel } from "./paciente.model"
import { Profesional, initProfesionalModel } from "./profesional.model";
import { Especialidad, initEspecialidadModel } from "./especialidades.model";
import { Agenda, initAgendaModel } from "./agenda.model";
import { Turno, initTurnoModel } from "./turno.model";

export const initModels = async () => {
     // Inicializamos todos los modelos primero
    initUsuarioModel(sequelize);
    initPacienteModel(sequelize)
    initProfesionalModel(sequelize)
    initEspecialidadModel(sequelize)
    initAgendaModel(sequelize)
    initTurnoModel(sequelize)


    //Establecemos las relaciones después de inicializar modelos
    Paciente.belongsTo(Usuario, { foreignKey: 'usuario_id', as:'usuario' });
    Usuario.hasOne(Paciente, { foreignKey: 'usuario_id', as:'paciente' });

    Profesional.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    Usuario.hasOne(Profesional, { foreignKey: 'usuario_id', as:'profesional' });
    
    Profesional.belongsTo(Especialidad, { foreignKey: 'especialidad_id', as:'especialidad' });

    Agenda.belongsTo(Profesional, { foreignKey: 'id_profesional', as: 'profesional' });
    Profesional.hasMany(Agenda, { foreignKey: 'id_profesional', as: 'profesional' });

    Turno.belongsTo(Profesional, { foreignKey: 'id_profesional' });
    Profesional.hasMany(Turno, { foreignKey: 'id_profesional' });

};

export {
    Usuario,
    initUsuarioModel,
    Paciente,
    Profesional,
    Especialidad,
    Agenda,
    Turno
};