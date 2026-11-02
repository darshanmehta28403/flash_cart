const express = require("express");
require("dotenv").config();
const userRoutes = require("./src/modules/user/user.routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req, res)=>{
  res.send("Hello");
});

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("connected");
});


