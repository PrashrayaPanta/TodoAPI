const express = require("express");

const app = express();

const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

const router = require("./Routes/todo");
const errorHandler = require("./middleware/errHandler");

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://prashrayapanta33:75LQXbgv0TTSEY@todoapi.zguih.mongodb.net/"
  )
  .then(() => console.log("DB connected succesfully"))
  .catch((error) => console.log(error));

//!Middleware
app.use(express.json());

//! Routes

app.use("/", router);

app.use(errorHandler);
// FhTIbdCRtR8cPE1w

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
