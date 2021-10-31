let data = require("../cookiesData");
const slugify = require("slugify");

exports.cookieCreate = (req, res) => {
  const id = data[data.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newData = { id, slug, ...req.body };

  data.push(newData);
  res.status(201).json(newData);
};

exports.cookieList = (req, res) => {
  res.status(200).json(data);
};

exports.cookieDetail = (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = data.find((cookie) => cookie.id == +cookieId);

  if (foundCookie) {
    res.json(foundCookie);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
};

exports.cookieDelete = (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = data.find((cookie) => cookie.id === +cookieId);
  if (foundCookie) {
    data = data.filter((cookie) => cookie !== foundCookie);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
};
