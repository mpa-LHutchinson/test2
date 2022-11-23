/*********************************************************************************
* BTI325 – Test 3
* I declare that this test is my own work in accordance with Seneca Academic Policy.
* No part of this test has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Liam Hutchinson Student ID: 184017218 Date: 11/23/2022
*
* Online (Cyclic) URL:
* https://lonely-pig-tank-top.cyclic.app/
*
********************************************************************************/ 
var express = require("express");
var app = express();
var path = require("path");
var data = require("./test2_moduleB.js");
var exphbs = require("express-handlebars");
const {engine} = require("express-handlebars");

var HTTP_PORT = process.env.PORT || 8080;

app.engine('.hbs', engine({ extname: '.hbs', helpers: {

  navLink: function(url, options){
    return '<li' +
    ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
    '><a href=" ' + url + ' ">' + options.fn(this) + '</a></li>';
   },
   
   equal: function (lvalue, rvalue, options) {
    if (arguments.length < 3)
    throw new Error("Handlebars Helper equal needs 2 parameters");
    if (lvalue != rvalue) {
    return options.inverse(this);
    } else {
    return options.fn(this);
    }
   } 
   
}, defaultLayout: 'main'}));
app.set('view engine', '.hbs');

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));

app.get("/", function(req,res){
  res.render('home');
});

app.get("/allStudents", function(req,res){
  data.getAllStudents()
    .then((data) => { res.render("students", {students: data})})
    .catch((err) => { res.render({message: "no results"})  });
});

app.get("/allStudents/BSD", function(req,res){
  data.getBSDStudents()
    .then((data) => { res.render("students", {students: data})})
    .catch((err) => { res.render({message: "no results"})  });
});

app.get("/CPA", function(req,res){
  data.getCPA()
  .then((data) => { res.json(data) })
  .catch((err) => { res.json({message: err}) });
});

app.get("/highGPA", function(req,res){
  data.highGPA()
  .then((data) => { res.render("student",{student: data}) })
  .catch((err) => { res.render({message: "no results"})  });
});

app.get("*", function(req,res){
  res.send("Error 404: Page not found.");
});

data.prepare()

.then(() => {app.listen(HTTP_PORT, onHttpStart)})

.catch(function(reason){
  console.log(reason);
});