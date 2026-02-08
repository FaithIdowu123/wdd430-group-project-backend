const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Use const to declare the connection
    const database = await mongoose.connect(process.env.MONGODB_URI);

    console.log('Database Connected');
    return database;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
