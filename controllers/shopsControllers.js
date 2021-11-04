const slugify = require("slugify");
const { Shop, Cookie } = require("../db/models");

exports.featchShop = async (shopId, next) => {
  try {
    return await Shop.findByPk(shopId);
  } catch (error) {
    next(error);
  }
};

exports.cookieCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.shopId = req.shop.id;
    const slug = slugify(req.body.name, { lower: true });
    const newData = { slug, ...req.body };
    const newCookie = await Cookie.create(newData);

    res.status(201).json(newCookie);
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const slug = slugify(req.body.name, { lower: true });
    const newData = { slug, ...req.body };
    const newShop = await Shop.create(newData);

    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.ShopList = async (req, res, next) => {
  try {
    const Shops = await Shop.findAll({
      attribute: { exclude: ["createdAt", "updatedAt"] },
      // To show the list of cookies the shop have
      include: {
        model: Cookie,
        as: "cookies", // alias
        attribute: ["id"],
      },
    });
    res.json(Shops);
  } catch (error) {
    next(error);
  }
};

exports.shopDetail = async (req, res) => {
  res.json(req.shop);
};

exports.shopDelete = async (req, res) => {
  try {
    await req.shop.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.shopUpdate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.shop.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
