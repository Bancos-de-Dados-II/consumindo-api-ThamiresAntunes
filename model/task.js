import sequelize from "../database/sequelize.js";
import { DataTypes } from "sequelize";

//modelo para criar a tabela Task no banco de dados
const Task = sequelize.define(
  'Task',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING
    },
    dataHora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    tipo: {
      type: DataTypes.ENUM('Pessoal', 'Profissional'),
      allowNull: false
    }
  },
  {
    // Other model options go here
  },
);

//cria a tabela no banco de dados
Task.sync();
//exportando
export default Task;

