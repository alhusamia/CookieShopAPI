module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("Shop", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Shop, { source: ["name"] });
  return Shop;
};
