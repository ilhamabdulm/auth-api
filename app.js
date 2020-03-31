require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

const routes = require("./routes/user");
const errorHandler = require("./middlewares/errorHandler");

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.log("Error", err);
  });

app.use("/", routes).use(errorHandler);

app.listen(PORT, () => {
  console.log("Server listening on PORT", PORT);
});
