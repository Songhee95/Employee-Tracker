const express = require('express');
const mysql = require("mysql");
const inquirer = require("inquirer");
const app = express();
const PORT = process.env.PORT || 8080;
const ViewAll = require("./queries.js");
const promptQ = require("./prompts.js");

var view = new ViewAll;
var viewAll = view.viewAll(); 

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dmwm9191@A",
    database: "employee_data"
  });
var roles=[];
var depart = [];

connection.connect(function(err){
    if(err) throw err;
    connection.query(viewAll, function(err,res){
        if(err) throw err;
        res.map(role => {
            roles.push(role.title);
            if(depart.indexOf(role.department) == -1){
                depart.push(role.department);
            }
        })
        startDisplay();
    })
});
function startDisplay(){
    inquirer
    .prompt(start)
    .then(res => {
        let answer = res.start;
        switch(answer){
            case("View All Employees"):
                connection.query(viewAll, function(err,res){
                    console.table(res);
                    startDisplay();
                })
            break;
            case("View All Employees By Department"):
                employeeByDepartment();
            break;
            case("View All Employees By Manager"):
                employeeByManager();

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
}
var employeeByDepartment = function(){
    var viewEmpByDepQuestion = new promptQ;
    var question = viewEmpByDepQuestion.viewByDepQuestion(depart);
    inquirer.prompt(question)
    .then(function(res){
        var department = "'" + res.department +"'";
        var byDepartment = new ViewAll(["employee.id , employee.first_name, employee.last_name, role.title"]
        , ["department_list, role, employee"], 
        ["role.id = employee.role_id AND department_list.id = role.department_id AND department_list.department="+department]).selectedView();
        connection.query(byDepartment, function(err, res){
            if(err) throw err;
            console.table(res);
            startDisplay();
        })
    })
}
var employeeByManager = function(){
    var viewEmpByManager = new promptQ;
    var question = viewEmpByManager.viewByManagerQuestion(manager);
    inquirer.prompt(question)
    // .then(function(res){
    //     var department = "'" + res.department +"'";
    //     var byDepartment = new ViewAll(["employee.first_name, employee.last_name, role.title"]
    //     , ["department_list, role, employee"], 
    //     ["role.id = employee.role_id AND department_list.id = role.department_id AND department_list.department="+department]).viewAll();
    //     connection.query(byDepartment, function(err, res){
    //         if(err) throw err;
    //         console.table(res);
    //         startDisplay();
    //     })
    // })
}
var addEmployee = function(){
    var addEmployeeQ = new promptQ;
    var question = addEmployeeQ.addEmpQuestion(roles);
    inquirer.prompt(question)
    .then(function(res){
        var first = "'"+res.first_name+"'";
        var last = "'"+res.last_name+"'";
        var roleId = 0;
        switch(res.role){
            case ("Sales Lead"):
                roleId =1;
            break;
            case("SalesPerson"):
                roleId = 2;
            break;
            case("Lead Engineer"):
                roleId = 3;
            break;
            case("Software Engneer"):
                roleId = 4;
            break;
            case("Account Manager"):
                roleId = 5;
            break;
            case("Accountant"):
                roleId = 6;
            break;
            case("Legal Team Lead"):
                roleId = 7;
            break;
            case("Lawyer"):
                roleId = 8;
            break;
        }
        console.log(roleId);
        var manager = res.manager;
        var insEmployee = new ViewAll(["first_name, last_name, role_id, manager_id"], [first, last, roleId, manager]).insertEmployee();
        connection.query(insEmployee, function(err, res){
            if (err) throw err;
            console.table(res);
            startDisplay();
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
