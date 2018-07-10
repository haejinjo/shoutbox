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

  // if (req.body.hobo !== "") {
  //   fs.appendFile("db.txt", "<br>" + req.body.hobo, function(err) {
  //     if (err) throw err;
  //     else console.log("Wrote to db.txt");
  //   });
  // }
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
    console.log(allMsgs);
    res.send(allMsgs);
  });
});

module.exports = router; // important puzzle piece!



// router.get("/", function(req, res) {
//   res.status(200).sendFile(path.join(__dirname, "./views", "index.html"));

// fs.readFile("./db.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   res.status(200).send(
//     `
//     <!DOCTYPE HTML>
//     <html>
//       <head>
//       <title>Shoutbox</title>
//       <script>
//       function injectDBTxt() {
//         document.getElementById(\'box\').innerHTML = \'` +
//       dbContents +
//       `\' }
//         function buttonPressed() {
//           let words = document.getElementById(\'input\').value;
//           let http = new XMLHttpRequest();
//           let url = \'/\';
//           let params = \'hobo=\' + words;
//           http.open(\'POST\', url, true);
//           http.setRequestHeader(\'Content-type\', \'application/x-www-form-urlencoded\');
//           http.onreadystatechange = function() {
//             if(http.readyState === 4 && http.status === 200) {
//               console.log('Got successful response');
//             }
//           }
//           http.send(params);
//           document.getElementById(\'input\').value = '';
//           if (words.length) {
//             document.getElementById(\'box\').innerHTML +=  \'<br>\' + words;
//           }
//         }
//       </script>
//         </head>
//         <body onload=\'injectDBTxt()\'>
//           <div id=\'container\'>
//             <header>
//               <a href=\'/ghanoush\'>Baba1</a>
//               <a href=\'/blacksheep\'>Baba2</a>
//             </header>
//             <div id=\'box-container\'>
//               <div id=\'box\'> </div>
//               <input type=\'text\' id=\'input\' name=\'hobo\'>
//               <button onclick=\'buttonPressed()\'> Submit </button>
//             </div>
//             <footer></footer>
//           </div>
//         </body>
//     </html>

//         <style>
//           #container {
//             display: flex;
//             justify-content:
//             center;
//           }
//           #box-container {
//             display: grid;
//             grid-template-rows: 300px 50px;
//             grid-template-columns: 100px 100px 100px;
//             grid-gap: 5px;
//           }
//             #box {
//               border: 5px dotted pink;
//               overflow: scroll;
//               grid-column: 1/4;
//               grid-row: 1;
//               padding: 10px;
//               font-family: \'Helvetica\';
//             }
//             h4 {
//               color: darkgray;
//               position: fixed;
//             }
//             input {
//               grid-column: 1/2;
//               grid-row: 2;
//             }

//             button {
//               grid-column: 2/3;
//               grid-row: 2;
//             }
//           </style>
//           `
//   );
// });
// });