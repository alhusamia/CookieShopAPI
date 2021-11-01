module.exports = (sequelize, DataTypes) =>
  sequelize.define("Cookie", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    image: { type: DataTypes.STRING },
  });
