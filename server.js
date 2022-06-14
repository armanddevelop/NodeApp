const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);
const bodyParse = require("body-parser");
const { connect } = require("./socket");
const { connectDb } = require("./db");
const router = require("./network/routers");
const { dbUrl, port: PORT, publicRoute } = require("./config");

//conexion to database
connectDb(dbUrl);
app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
connect(server);

router(app);
//here is where the static files are enable for the aplication
app.use(publicRoute, express.static("public"));

server.listen(PORT, () => {
  console.log("the app is listen in port ", PORT);
});
