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
var roles=[];

connection.connect(function(err){
    if(err) throw err;
    connection.query("SELECT title FROM role", function(err,res){
        if(err) throw err;
        res.map(role => {
            roles.push(role.title);
        })
    })

    inquirer.prompt(start)
    .then(res => {
        let answer = res.start;
        switch(answer){
            case("View All Employees"):
                viewAll();
            break;
            case("View All Employees By Department"):

            break;
            case("View All Employees By Manager"):

            break;
            case("Add Employee"):
                addEmployee();
            break;
            case("Remove Employee"):

            break;
            case("Update Employee Role"):

            break;
            case("Update Employee Manager"):

            break;
            case("View All Roles"):

            break;
            case("Add Role"):

            break;
            case("Remove Role"):

            break;
            case("View All Departments"):

            break;
            case("Add Department"):

            break;
        }
    })
})

var viewAll = function(){
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department_list.department, role.salary, employee.manager_id ";
    query+= "FROM employee, role, department_list ";
    query+= 'WHERE role.id = employee.role_id AND department_list.id = role.department_id ';
    
    connection.query(query, function(err, res){
        if(err) throw err;
        console.table(res);
    })
};
var addEmployee = function(){
    var question = [
        {
            name: "first_name",
            type: "input",
            message:"What is the employee's first name?",
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employees' last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What it the employee's role?",
            choices: roles
        },
        {
            name: "manager",
            type: "input",
            message: "Who is the employee's manager?"
        }
    ];
    inquirer.prompt(question)
    .then(function(res){
        var first = res.first_name;
        var last = res.last_name;
        var role =function(){
            if(res.role === "Sales Lead" || "Salesperson"){
                return 1;
            }else if(res.role === "Lead Engineer"||"Software Engineer"){
                return 2;
            }else if(res.role === "Account Manager" || "Accountant"){
                return 3;
            }else if(res.role === "Legal Team Lead" || "Lawyer"){
                return 4;
            }
        }
        var manager = res.manager;
        connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)", 
        [first, last, role(), manager], function(err, res){
            if (err) throw err;
            console.table(res);
        })
    })
}

app.listen(PORT, function(){
    console.log("app is listening on port :" + PORT);
})

var start = {
    name: "start",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "View All Departments",
        "Add Department"
    ]
}
