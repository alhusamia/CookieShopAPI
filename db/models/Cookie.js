module.exports = (sequelize, DataTypes) =>
  sequelize.define("Cookie", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
    price: {
      type: DataTypes.INTEGER,
      default: 5,
      validate: { min: 3, max: 20 },
    },
    image: { type: DataTypes.STRING },
  });
