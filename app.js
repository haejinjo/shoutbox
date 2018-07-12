const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let route = require("./routes.js");

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
  })
);

app.use("/", route);

app.listen(3000, () => console.log("App listening on port 3000!"));
