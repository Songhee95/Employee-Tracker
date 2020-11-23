const express = require('express');
const mysql = require("mysql");
const inquirer = require("inquirer");
const app = express();
const PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dmwm9191@A",
    database: "employee_data"
  });

connection.connect(function(err){
    if(err) throw err;
    
})


app.listen(PORT, function(){
    console.log("app is listening on port :" + PORT);
})

