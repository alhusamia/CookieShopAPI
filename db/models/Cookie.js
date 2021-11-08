const SequelizeSlugify = require("sequelize-slugify");
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

  //Realations
  Cookie.associate = (models) => {
    //Shop has many cookies
    models.Shop.hasMany(Cookie, {
      foreignKey: "shopId", // change the colomn name from the ShopId => shopId
      as: "cookies", // the alias of the relations
      allowNull: false,
    });
    // to show the shop detail in each cookie
    // Cookie.belongTo(models.Shop, {
    //   foreignKey: "shopId",
    //   as: "shop",
    // });
  };
  return Cookie;
};
