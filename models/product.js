"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {}
  }
  product.init(
    {
      kode_produk: DataTypes.STRING,
      nama_produk: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      image_produk: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "product",
    }
  );
  return product;
};
