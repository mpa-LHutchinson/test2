/*********************************************************************************
* BTI325 – Test 2
* I declare that this test is my own work in accordance with Seneca Academic Policy.
* No part of this test has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Liam Hutchinson Student ID: 184017218 Date: 10/19/2022
*
* Online (Cyclic) URL:
* https://lonely-pig-tank-top.cyclic.app/
*
********************************************************************************/ 
var studentList = [];

exports.prepare = function(){
    const fs = require('node:fs');

    fs.readFile('./students.json',(err,data)=>{
        if (err) reject("Failure to read file students.json");
        studentList = JSON.parse(data);
    });

    return new Promise(function(resolve, reject){
        console.log("prepare called");
        resolve("Data succesfully initialized!");
    });
}

exports.getAllStudents = function(){
    return new Promise(function(resolve, reject){
            console.log("getAllStudents called");

            resolve(studentList);
            reject(reason);
    });
}

exports.getBSDStudents = function(){
    return new Promise(function(resolve, reject){
            console.log("getBSDStudents called");
            var bsdList = [];

            for (student of studentList){
                if(student.program == "BSD"){
                    bsdList.push(student);
                }
            }

            resolve(bsdList);
            reject(reason);
    });
}

exports.getCPA = function(){
    return new Promise(function(resolve, reject){
            console.log("getCPA called");

            resolve(studentList);
            reject(reason);
    });
}

exports.highGPA = function(){
    return new Promise(function(resolve, reject){
        console.log("highGPA called");
        var highestStudent = {
            "studId": 0,
            "name": "dummy",
            "program": "dummy",
            "gpa": 0
        };

        for(student of studentList){
            if(student.gpa > highestStudent.gpa){
                highestStudent = student;
            }
        }

        resolve(highestStudent);
        reject(reason);
    });
}