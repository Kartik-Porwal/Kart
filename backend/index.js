const express = require("express");
const cors = require("cors");
const path = require('path');
const cookieParser = require("cookie-parser");
require('dotenv').config({path:'.env'});
const UserRouter = require("./Routes/UserRouter");
const ProductRoute = require("./Routes/ProductRoute");
const CategoryRoute = require("./Routes/CategoryRoute");

const port = process.env.PORT || 5000;
const DB = process.env.DATABASE;
const app = express();
require('./Config/db');
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }));
  app.use(cookieParser());
app.use(express.json())
const { config } = require("dotenv");
app.use('/api/user', UserRouter);
app.use('/api/product', ProductRoute);
//app.use('/api/category', CategoryRoute);
app.listen(port, () => {
    console.log("Server Started at Port " + port)
})