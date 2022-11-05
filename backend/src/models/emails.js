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
      emails.belongsTo(models.usuarios, {foreignKey: "idusuarios"});
      console.log(models)
      // define association here
    }
  }

  emails.init({
    idemails: {type:DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true,unique: true},
    texto: DataTypes.STRING,
    fecha: DataTypes.DATE,
    destinatario: DataTypes.STRING,
    recibido: DataTypes.BOOLEAN,
    remitente: DataTypes.STRING,
    enviado: DataTypes.BOOLEAN,
    idusuarios: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'emails',
    timestamps:false
  });
  return emails;
};