const express = require("express");
//Routes
const cookiesRouter = require("./routs/cookies");

//Create App Instance
const app = express();

//Middle ware
app.use(express.json());

//Using the Routes
app.use("/cookies", cookiesRouter);

const PORT = 8000;
app.listen(PORT, (req, res) => {
  console.log(`we are listing to port ${PORT}`);
});
