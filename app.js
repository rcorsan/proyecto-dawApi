const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const mongoose = require("mongoose");
app.use(bodyParser.json());

//IMPORTAR RUTAS
const pruebaRuta = require("./routes/prueba");

//BASE DE DATOS
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("conectado a la base de datos"))
  .catch((err) => console.error(err));

//MIDDLEWARES
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", pruebaRuta);

//SETTINGS
app.set("port", process.env.PORT || 3000);

//SERVER
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
