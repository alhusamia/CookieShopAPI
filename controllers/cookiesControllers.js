const slugify = require("slugify");
const { Cookie } = require("../db/models");

exports.cookieCreate = async (req, res) => {
  try {
    const slug = slugify(req.body.name, { lower: true });
    const newData = { slug, ...req.body };
    const newCookie = await Cookie.create(newData);

    res.status(201).json(newCookie);
  } catch (error) {
    res.status(500).json({ message: error.message ?? "Server Error" });
  }
};

exports.cookieList = async (req, res) => {
  const cookies = await Cookie.findAll();
  //findAll({attributes:["id","name","price"]}) ==> its return what i need
  //findAll({attribute:{exclude:["price"]}}) ==> return every thing exept this
  res.json(cookies);
};

exports.cookieDetail = async (req, res) => {
  try {
    const { cookieId } = req.params;
    const foundCookie = await Cookie.findByPk(cookieId);
    if (foundCookie) {
      res.json(foundCookie);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message ?? "Server Error" });
  }
};

exports.cookieDelete = async (req, res) => {
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
    res.status(500).json({ message: error.message ?? "Server Error" });
  }
};
