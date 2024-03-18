const mongoose = require("mongoose");

const mongooseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
  } catch (err) {
    console.log("Mongodb connection error: ", err);
  }
};

module.exports = {
  mongooseConnection,
};
