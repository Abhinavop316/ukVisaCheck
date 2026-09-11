const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let uri = (process.env.MONGO_URI || "").trim();

    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    // Strip trailing slash
    uri = uri.replace(/\/+$/, "");

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Database connected successfully to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to database:", error.message || error);
  }
};

module.exports = connectDB;