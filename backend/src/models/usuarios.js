'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuarios.hasMany(models.emails, {foreignKey: "idusuarios"});
      // define association here
    }
  }

  usuarios.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    idusuarios: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    pais: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    usuario: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
    timestamps:false
  });
  return usuarios;
};