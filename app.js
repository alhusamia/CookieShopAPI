const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");

//Routes
const cookiesRouter = require("./routs/cookie");
const shopsRouter = require("./routs/shop");
const userRouter = require("./routs/user");

//Create App Instance
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
//Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);

//Using the Routes
app.use("/cookies", cookiesRouter);
app.use("/shops", shopsRouter);
app.use(userRouter);
app.use("/media", express.static("media"));

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

const run = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection to the database successful!");
    await app.listen(PORT, () => {
      console.log(`The application is running on localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
