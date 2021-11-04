const { Cookie, Shop } = require("../db/models");

exports.featchCookie = async (cookieId, next) => {
  try {
    return await Cookie.findByPk(cookieId);
  } catch (error) {
    next(error);
  }
};

exports.cookieList = async (req, res, next) => {
  try {
    const cookies = await Cookie.findAll({
      attribute: { exclude: ["createdAt", "updatedAt", "shopId"] },
      include: [
        {
          model: Shop,
          as: "library",
          attribute: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    //findAll({attributes:["id","name","price"]}) ==> its return what i need
    res.json(cookies);
  } catch (error) {
    next(error);
  }
};

exports.cookieDetail = async (req, res) => {
  res.json(req.cookie);
};

exports.cookieDelete = async (req, res) => {
  try {
    await req.cookie.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.cookieUpdate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.cookie.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
