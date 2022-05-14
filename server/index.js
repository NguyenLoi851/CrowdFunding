require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fuwrj.mongodb.net/CrowdFunding?retryWrites=true&w=majority`
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
