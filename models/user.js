"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {}
  }
  user.init(
    {
      user_name: DataTypes.STRING,
      email: DataTypes.STRING,
      name: DataTypes.STRING,    
      password: DataTypes.STRING,
      jenis_kelamin: DataTypes.STRING,
      tinggi_badan: DataTypes.STRING,
      no_hp: DataTypes.STRING,
      
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "user",
    }
  );
  return user;
};
