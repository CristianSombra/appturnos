import { sequelize } from "../config/database";
import { Usuario, initUsuarioModel } from "./usuario.model";

export const initModels = async () => {
    initUsuarioModel(sequelize);
    await sequelize.sync();
}

export {
    Usuario
};