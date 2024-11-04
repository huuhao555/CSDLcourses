const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const ConnectDB = require("./config/db");
ConnectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const coursesRouter = require("./routers/coursesRouter");
const userRouter = require("./routers/usersRouter");
app.use("/api/course", coursesRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
