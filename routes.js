// Route module
var express = require("express");
var router = express.Router();
let fs = require("fs");
let mysql = require("mysql");
let path = require("path");
let dbContents = "";

//created a connection object
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "controle",
  database: "hj_test"
});

router.get("/", function (req, res) {
  let allMsgs = "";

  res.status(200).sendFile(path.join(__dirname, "./views", "index.html"));
});

router.post("/", function (req, res) {
  // read what has been posted
  // write it to database
  if (req.body.hobo !== "") {
    con.query(
      "INSERT INTO messages (content) VALUES(\'" + String(req.body.hobo) + "\')",
      function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
      }
    );
  }
});

router.get("/ghanoush", function (req, res) {
  res.send(
    "A Syrian dish consisting of mashed eggplant mixed with tahina, olive oil, and various seasonings"
  );
});

router.get("/blacksheep", function (req, res) {
  let allMsgs = "";
  con.query("SELECT * FROM messages;", function (err, rows) {
    if (err) throw err;
    for (obj of rows) {
      allMsgs += obj.content + "<br>";
    }
    res.send(allMsgs);
  });
});

module.exports = router; // important puzzle piece!