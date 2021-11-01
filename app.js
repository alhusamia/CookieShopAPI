const express = require("express");
const db = require("./db/models");
//Routes
const cookiesRouter = require("./routs/cookies");

//Create App Instance
const app = express();

//Middle ware
app.use(express.json());

//Using the Routes
app.use("/cookies", cookiesRouter);

const PORT = 8000;

db.sequelize.sync();
// db.sequelize.sync({ alert: true }); // ==> add the new changes in the model
// db.sequelize.sync({force:true}); //==> delete all the data in the data base

app.listen(PORT, (req, res) => {
  console.log(`we are listing to port ${PORT}`);
});
