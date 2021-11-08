module.exports = {
  JWT_SECRET: process.env.JWT_SECRET, // this ur super seceret key
  JWT_EXPIRATION_MS: 3 * 24 * 60 * 60 * 1000, //its mean three days in ms
};
