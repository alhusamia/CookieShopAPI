const express = require("express");
const db = require("./db/models");
//Routes
const cookiesRouter = require("./routs/cookies");

//Create App Instance
const app = express();

//Middleware
app.use(express.json());

//Using the Routes
app.use("/cookies", cookiesRouter);

//Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found" });
});

//Error Middleware ====> Any where that middleware send an argument with next() it will go here
app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" });
});

const PORT = 8000;

db.sequelize.sync();
// db.sequelize.sync({ alert: true }); // ==> add the new changes in the model
// db.sequelize.sync({force:true}); //==> delete all the data in the data base

app.listen(PORT, (req, res) => {
  console.log(`we are listing to port ${PORT}`);
});
