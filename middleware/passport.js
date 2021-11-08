const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");

const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

//Models
const { User } = require("../db/models");
//keys
const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
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

exports.jwtStrategy = new JWTStrategy(
  { jwtFromRequest: fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET },
  async (payload, done) => {
    if (Date.now() > payload.exp) {
      return done(false);
    }
    try {
      const user = await User.findByPk(payload.id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

//coustum message
// if (passwordMatch) {
//   return done(null, user); // this attach user to req.user
// } else {
//   return done({ status: 401, message: "Incorrect Username or Password" });
// }
