const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//Models
const { User } = require("../db/models");

exports.localStrategy = new localStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username: username },
    });

    let passwordMatch;
    if (user) {
      passwordMatch = await bcrypt.compare(password, user.password);
    }

    if (passwordMatch) {
      done(null, user); // this attach user to req.user
    } else {
      done({ status: 401, message: "Incorrect Password" });
    }
  } catch (error) {
    done(error);
  }
});
