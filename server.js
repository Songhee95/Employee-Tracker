const express = require('express');
const mysql = require("mysql");
const inquirer = require("inquirer");
const app = express();
const PORT = process.env.PORT || 8080;
const Queries = require("./source/queries.js");
const promptQ = require("./source/prompts.js");

var view = new Queries;
var viewAll = view.viewAll(); 
var viewDepartment = view.tableDepartment();
var viewRole = view.tableRole();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dmwm9191@A",
    database: "employee_data"
  });
  let roles=[];
  let depart = [];
  let manager = [];
  let employee = [];
  let departId =[];

connection.connect(function(err){
    if(err) throw err;
        startDisplay();
});

function getData(){
    roles = [];
    depart = [];
    manager = [];
    employee = [];
    departId =[];
    connection.query(viewDepartment, function(err, res){
        if(err) throw err;
        res.map(data =>{
            var departmentName = data.department;
            var depId = data.id;
            depart.push(departmentName);
            var obj ={};
            obj.department= departmentName;
            obj.id = depId;
            departId.push(obj);
        })
    })
    connection.query(viewRole, function(err, res){
        if(err) throw err;
        res.map(data =>{
            roles.push(data.title)
        })
    })
    connection.query(viewAll, function(err,res){
        if(err) throw err;
        res.map(data => {
            var employeeName = data.first_name +" "+data.last_name;
            employee.push(employeeName);
            if(manager.indexOf(data.manager_name) == -1 && data.manager_name != null){
                var str = data.manager_name;
                manager.push(str);
            }
        })
})};
function managerAndID(data){
    for(var i=0; i< roles.length; i++){
        if(data == manager[i]){
            return i+1;
        }
    }
}
function roleInDepartment(data){
    for(var i=0; i<roles.length; i++){
        if(data === roles[i]){
            return i+1;
        }
    }
}
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
        "Update Employee Role or Manager",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "View All Departments",
        "Add Department"
    ]
}
function startDisplay(){
    getData();
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
                delEmployee();
            break;
            case("Update Employee Role or Manager"):
                updateEmployee();
            break;
            case("View All Roles"):
                console.table(roles);
                startDisplay();
            break;
            case("Add Role"):
                addRoles();
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
        var byDepartment = new Queries(["employee.id , employee.first_name, employee.last_name, role.title"]
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
    .then(function(res){
        var manager = "'" + res.manager +"'";
        var byManager= new Queries(["employee.first_name, employee.last_name, role.title, manager.manager_name"]
        , ["role, employee, manager"], 
        ["role.id = employee.role_id AND employee.manager_id = manager.manager_id AND manager.manager_name="+manager]).selectedView();
        console.log(byManager);
        connection.query(byManager, function(err, res){
            if(err) throw err;
            console.table(res);
            startDisplay();
        })
    })
}
var addEmployee = function(){
    var addEmployeeQ = new promptQ;
    var question = addEmployeeQ.addEmpQuestion(roles, manager);
    inquirer.prompt(question)
    .then(function(res){
        var role = res.role;
        var manager = res.manager;
        var first = "'"+res.first_name.trim()+"'";
        var last = "'"+res.last_name.trim()+"'";
        var department = roleInDepartment(role);
        var manager = managerAndID(manager);
        var insEmployee = new Queries(["first_name, last_name, role_id, manager_id"], [first, last, department, manager]).insertEmployee();
        connection.query(insEmployee, function(err, res){
            if (err) throw err;
            console.table(res);
            startDisplay();
        })
    })
}
var delEmployee = function(){
    var delQ = new promptQ;
    var delEmployeeQ = delQ.delEmployeeQuestion(employee);
    inquirer.prompt(delEmployeeQ)
    .then(res =>{
        var splitName = res.employee.split(" ");
        var delView = new Queries("'"+splitName[0]+"'","'"+splitName[1]+"'");
        var delEmployee = delView.deleteEmployee();
        if(res.confirm){
            connection.query(delEmployee, function(err, res){
                if(err) throw err;
                console.table(res);
                startDisplay();
            })
        }else{
            startDisplay();
        }
    })
}
var updateEmployee = function(){
    var updateQ = new promptQ;
    var updateEmployeeQ = updateQ.updateEmployeeQuestion(employee);
    var updateTitleQ = updateQ.displayTitle(roles);
    var updateManagerQ = updateQ.displayManager(manager);
    inquirer.prompt(updateEmployeeQ)
    .then(res =>{
        var name = res.employee.split(" ");
        var first = '"'+name[0]+'"';
        var last = '"'+name[1]+'"';
        if(res.updateSection ==="role"){
            inquirer.prompt(updateTitleQ)
            .then(res => {
                var result = roleInDepartment(res.title);
                var updateView = new Queries("role_id="+result ,first,last);
                var UpdateView = updateView.updateData();
                connection.query(UpdateView, function(err, res){
                    if(err) throw err;
                    console.table(res);
                    startDisplay();
                })
            })
        }else{
            inquirer.prompt(updateManagerQ)
            .then(res =>{
                var managerId = managerAndID(res.managerName);
                var updateView = new Queries("manager_id="+managerId, first,last);
                var UpdateView = updateView.updateData();
                connection.query(UpdateView, function(err, res){
                    if(err) throw err;
                    console.table(res);
                    startDisplay();
                })
            })
        }
    })
}
function addRoles(){
    var addRoleQuestion = new promptQ;
    var addRole = addRoleQuestion.addRole(depart);
    inquirer.prompt(addRole)
    .then(res=>{
        var department = 0;
        for(var i=0; i<departId.length; i++){
            if(departId[i].department === res.department){
                var department = departId[i].id;
            }
        }
        var addRoleQuery = new Queries(res.title, res.salary, department);
        var query = addRoleQuery.addRole(); 
        connection.query(query, (err, res)=>{
            if(err) throw err;
            console.table(res);
            startDisplay();
        })
    })
}
app.listen(PORT, function(){
    console.log("app is listening on port :" + PORT);
})
