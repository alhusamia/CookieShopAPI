module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("Shop", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  });
  return Shop;
};
