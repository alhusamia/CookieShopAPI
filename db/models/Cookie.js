module.exports = (sequelize, DataTypes) => {
  const Cookie = sequelize.define("Cookie", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
  });
  return Cookie;
};
