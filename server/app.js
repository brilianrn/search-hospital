require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const router = require('./routers');

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log("server running on port:", port);
});