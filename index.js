const express = require("express");

const app = express();

const cors = require("cors");

const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const router = require("./Routes/todo");

app.use(cors());

mongoose
  .connect(
    process.env.Mongodb_URI ||
      "mongodb+srv://prashrayapanta33:75LQXbgv0TTSEY@todoapi.zguih.mongodb.net/"
  )
  .then(() => console.log("DB connected succesfully"))
  .catch((error) => console.log(error));

//!Middleware
app.use(express.json());

//! Routes

app.use("/", router);

// FhTIbdCRtR8cPE1w

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
