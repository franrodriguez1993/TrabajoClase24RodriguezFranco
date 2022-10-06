const express = require("express");
require("dotenv").config();
const app = express();
const { create } = require("express-handlebars");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Session:
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongo = require("connect-mongo");
//para mongo-atlas:
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoStore = mongo.create({
  mongoUrl: process.env.MONGO_URI,
  mongoOptions: advancedOptions,
  ttl: 600,
});

app.use(cookieParser());
app.use(
  session({
    store: mongoStore,
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: false,
  })
);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Motor de plantillas:
const hbs = create({
  extname: ".hbs",
  partialsDir: ["views/components"],
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/productos.routes"));

const PORT = 8080;

app.listen(PORT, () => {
  console.log("App en http://localhost:" + PORT);
});
