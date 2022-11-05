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
    idusuarios: {type:DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true,unique: true},
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    pais: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    usuario: {type:DataTypes.STRING, unique:true},
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
    timestamps:false
  });
  return usuarios;
};