'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  emails.init({
    idemails: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    texto: DataTypes.STRING,
    fecha: DataTypes.DATE,
    recibido: DataTypes.BOOLEAN,
    enviado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'emails',
    timestamps:false
  });
  return emails;
};