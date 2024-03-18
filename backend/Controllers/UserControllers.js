const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../Models/UserModels");
const { CustomError } = require("../Middleware/CustomError");
const AsynErrorHandler = require("../Middleware/AsyncErrorHandler");

const userSignup = AsynErrorHandler(async (req, res, next) => {
  const { password, email } = req.body;
  if (!email || !password || password === "" || email === "") {
    next(new CustomError("Allfields are required", 400));
    return;
  }
  const duplicateUser = await Users.findOne({ email });
  if (duplicateUser) {
    next(new CustomError("User already registered!", 400));
    return;
  }
  const salt = await bcrypt.genSalt(16);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new Users({
    password: hashedPassword,
    email,
  });
  await user.save();
  return res.json({ message: "User registered!", status: true, user });
});

const userLogin = AsynErrorHandler(async (req, res, next) => {
  const { password, email } = req.body;
  if (!email || !password || password === "" || email === "") {
    next(new CustomError("Allfields are required", 400));
    return;
  }
  const user = await Users.findOne({ email });
  if (!user) {
    next(new CustomError("No account found!", 401));
    return;
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    next(new CustomError("Invalid email or password !", 401));
    return;
  }
  const token = await jwt.sign({ id: user._id }, process.env.JWT_TOKEN_KEY, {
    expiresIn: "1d",
  });
  await res.cookie("authtoken", token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60), //60 mins
    sameSite: "lax",
    httpOnly: true,
    secure: true,
  });
  return res.json({ message: "Logged in successfully", status: true });
});

const cookieValidation = AsynErrorHandler(async (req, res, next) => {
  const cookie = req?.headers?.cookie;
  if (!cookie) {
    next(new CustomError("No cookie has found!", 401));
    return;
  }
  const token = cookie.split("authtoken=")[1];
  if (!token) {
    next(new CustomError("No valid token has found!", 401));
    return;
  }
  const { id } = await jwt.verify(token, process.env.JWT_TOKEN_KEY);
  req.id = id;
  next();
});

const test = AsynErrorHandler(async (req, res, next) => {
  return res.json({ message: "Success!" });
});

const logout = AsynErrorHandler(async (req, res) => {
  res.clearCookie("authtoken");
  return res.status(200).json({ status: true, message: "logged out" });
});

module.exports = { userSignup, userLogin, cookieValidation, test, logout };
