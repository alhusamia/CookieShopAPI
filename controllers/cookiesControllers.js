const slugify = require("slugify");
const { Cookie } = require("../db/models");

exports.cookieCreate = async (req, res, next) => {
  try {
    const slug = slugify(req.body.name, { lower: true });
    const newData = { slug, ...req.body };
    const newCookie = await Cookie.create(newData);

    res.status(201).json(newCookie);
  } catch (error) {
    next(error);
  }
};

exports.cookieList = async (req, res, next) => {
  try {
    const cookies = await Cookie.findAll({
      attribute: { exclude: ["createdAt", "updatedAt"] },
    });
    //findAll({attributes:["id","name","price"]}) ==> its return what i need
    res.json(cookies);
  } catch (error) {
    next(error);
  }
};

exports.cookieDetail = async (req, res, next) => {
  try {
    const { cookieId } = req.params;
    const foundCookie = await Cookie.findByPk(cookieId);
    if (foundCookie) {
      res.json(foundCookie);
    } else {
      next({ status: 404, message: "Cookie Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.cookieDelete = async (req, res, next) => {
  try {
    const { cookieId } = req.params;
    const foundCookie = await Cookie.findByPk(cookieId);
    if (foundCookie) {
      await foundCookie.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Cookie not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.cookieUpdate = async (req, res, next) => {
  try {
    const { cookieId } = req.params;
    const foundCookie = await Cookie.findByPk(cookieId);
    if (foundCookie) {
      await foundCookie.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Cookie not found" });
    }
  } catch (error) {
    next(error);
  }
};
