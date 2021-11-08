const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//Models
const { User } = require("../db/models");

exports.localStrategy = new localStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username: username },
    });

    const passwordMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    return done(null, passwordMatch ? user : false); // this attach user to req.user
    //coustum =>
  } catch (error) {
    done(error);
  }
});

//coustum message
// if (passwordMatch) {
//   return done(null, user); // this attach user to req.user
// } else {
//   return done({ status: 401, message: "Incorrect Username or Password" });
// }
