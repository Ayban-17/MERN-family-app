const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const memberRouter = require("./route/members");
require("dotenv").config();

// instantiation
const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

// middleware
app.use(cors());
app.use(express.json());

//route
app.use("/api/v1/family", memberRouter);

//Database connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("Datase connected");
    //listening
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  })
  .catch((err) => console.log("Error " + err));
