module.exports = (sequelize, DataTypes) => {
  const Cookie = sequelize.define("Cookie", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
    price: {
      type: DataTypes.INTEGER,
      default: 5,
      validate: { min: 3, max: 20 },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Cookie, { source: ["name"] });
  return Cookie;
};
