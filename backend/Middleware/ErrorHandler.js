const { CustomError } = require("./CustomError");

module.exports = (err, req, res, next) => {
  if (err?.message === "invalid token") {
    //token validation failed
    err = new CustomError("Authentication failed, login again!", 401);
  }
  return res.status(err?.status || 500).json({
    message: err?.message || "Internal Server Error",
    status: false,
  });
};
