// Route module
var express = require("express");
var router = express.Router();
let fs = require("fs");
let dbContents = "";

router.get("/", function(req, res) {
  fs.readFile("./db.txt", "utf8", (e, data) => {
    if (e) throw e;
    dbContents = data;
    dbContents = dbContents.replace(/'/g, "\\'");
    res.status(200).send(
      `
      <!DOCTYPE HTML> 
      <html> 
        <head> 
        <title>Shoutbox</title> 
        <script>
        function injectDBTxt() { 
          document.getElementById(\'box\').innerHTML = \'` +
        dbContents +
        `\' } 
          function buttonPressed() { 
            let words = document.getElementById(\'input\').value; 
            let http = new XMLHttpRequest();
            let url = \'/\';
            let params = \'hobo=\' + words;
            http.open(\'POST\', url, true);
            http.setRequestHeader(\'Content-type\', \'application/x-www-form-urlencoded\');
            http.onreadystatechange = function() {
              if(http.readyState === 4 && http.status === 200) {
                console.log('Got successful response');
              }
            }
            http.send(params);
            document.getElementById(\'input\').value = '';
            if (words.length) { 
              document.getElementById(\'box\').innerHTML +=  \'<br>\' + words; 
            } 
          } 
        </script> 
          </head> 
          <body onload=\'injectDBTxt()\'> 
            <div id=\'container\'> 
              <header> 
                <a href=\'/ghanoush\'>Baba1</a> 
                <a href=\'/blacksheep\'>Baba2</a> 
              </header> 
              <div id=\'box-container\'> 
                <div id=\'box\'> </div> 
                <input type=\'text\' id=\'input\' name=\'hobo\'> 
                <button onclick=\'buttonPressed()\'> Submit </button> 
              </div> 
              <footer></footer> 
            </div> 
          </body> 
      </html> 
          
          <style> 
            #container { 
              display: flex; 
              justify-content: 
              center; 
            } 
            #box-container { 
              display: grid; 
              grid-template-rows: 300px 50px; 
              grid-template-columns: 100px 100px 100px; 
              grid-gap: 5px; 
            } 
              #box { 
                border: 5px dotted pink; 
                overflow: scroll; 
                grid-column: 1/4; 
                grid-row: 1; 
                padding: 10px; 
                font-family: \'Helvetica\'; 
              } 
              h4 { 
                color: darkgray; 
                position: fixed; 
              } 
              input { 
                grid-column: 1/2; 
                grid-row: 2; 
              } 
              
              button { 
                grid-column: 2/3; 
                grid-row: 2; 
              } 
            </style>
            `
    );
  });
});

router.post("/", function(req, res) {
  // read what has been posted
  // write it to db.txt
  if (req.body.hobo !== "") {
    fs.appendFile("db.txt", "<br>" + req.body.hobo, function(err) {
      if (err) throw err;
      else console.log("Wrote to db.txt");
    });
  }
  res.redirect("back");
});

router.get("/ghanoush", function(req, res) {
  res.send(
    "A Syrian dish consisting of mashed eggplant mixed with tahina, olive oil, and various seasonings"
  );
});

router.get("/blacksheep", function(req, res) {
  res.send("A nursery rhyme");
});

module.exports = router; // important puzzle piece!
