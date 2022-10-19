/*********************************************************************************
* BTI325 – Test 2
* I declare that this test is my own work in accordance with Seneca Academic Policy.
* No part of this test has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Liam Hutchinson Student ID: 184017218 Date: 10/19/2022
*
* Online (Cyclic) URL:
* 
*
********************************************************************************/ 
var express = require("express");
var app = express();
var path = require("path");
var data = require("./test2_moduleB.js");

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));

app.get("/", function(req,res){
    res.send("<h2>Declaration</h2><br />I acknowledge the colleges academic integrity policy - and my own integrity - remain in effect whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with my classmates... even when no one is watching. I declare I woll not break that trust.<br /><br /> Name: Liam Hutchinson <br /><br /> Student number: 184017218 <br /><br /><a href='/CPA'>Click to visit CPA students</a><br /><br /><a href='/highGPA'>Click to see who has the highest GPA</a>");
});

app.get("/CPA", function(req,res){
  data.getCPA()
  .then((data) => { res.json(data) })
  .catch((err) => { res.json({message: err}) });
});

app.get("/highGPA", function(req,res){
  data.highGPA()
  .then((data) => { res.send(data) })
  .catch((err) => { res.json({message: err}) });
});

app.get("*", function(req,res){
  res.send("Error 404: Page not found.");
});

data.prepare()

.then(() => {app.listen(HTTP_PORT, onHttpStart)})

.catch(function(reason){
  console.log(reason);
});