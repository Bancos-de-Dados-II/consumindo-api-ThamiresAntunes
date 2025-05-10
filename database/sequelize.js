import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

//new Sequelize('nome-banco', 'usuario', 'senha', ...
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres'
});

async function conectar() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    
}
conectar();

export default sequelize;