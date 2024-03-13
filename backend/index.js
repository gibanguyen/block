const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config();
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
