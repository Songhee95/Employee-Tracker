const express = require('express');
const inquirer = require("inquirer");
const connection = require("./source/connection.js");
const app = express();
const PORT = process.env.PORT || 8080;
const Queries = require("./source/queries.js");
const orm = require("./source/orm.js");
const getData = require('./source/getData');
const { query } = require('express');

let roles, depart, manager, employee, departAndId ,roleAndId, managerAndId; 
  
  startDisplay();

  async function startDisplay(){
    await getData.getDepart(res =>{
        depart =res.depart;
        departAndId=res.departAndId;
    });
    await getData.getRole(res =>{
        roles = res.roles;
        roleAndId = res.roleAndId;
    })
    await getData.getManager(res =>{
        manager = res.manager;
        managerAndId = res.managerAndId;
    })
    await getData.employee(res =>{
        employee = res;
    })
    orm.startPrompt(res =>{
        switch(res.start){
            case("View All Employees"):
                Queries.viewAll(res =>{
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
                removeRole();
            break;
            case("View All Departments"):
                console.table(depart);
                startDisplay();
            break;
            case("Add Department"):
                addDepartment();
            break;
    }})
};

function managerId(data){
    for(var i=0; i< managerAndId.length; i++){
        if(data === managerAndId[i].managerName){
            return managerAndId[i].id;
        }
    }
}
function roleId(data){
    for(var i=0; i<roleAndId.length; i++){
        if(data === roleAndId[i].title){
            return roleAndId[i].roleId;
        }
    }
}
function departId(data){
    for(var i=0; i<departAndId.length; i++){
        if(data ===departAndId[i].department){
            return departAndId[i].id;
        }
    }
}
var employeeByDepartment = function(){
    orm.viewByDepQuestion(depart, function(res){
        var department = "'" + res.department + "'";
        var listen = ["employee.id , employee.first_name, employee.last_name, role.title"];
        var table = ["department_list, role, employee"];
        var option = ["role.id = employee.role_id AND department_list.id = role.department_id AND department_list.department="+department];
        Queries.selectedView(listen, table, option, function(res){
            console.table(res);
            startDisplay();
        });
    })
}
var employeeByManager = function(){
    orm.viewByManagerQuestion(manager, (res)=>{
        var selectedManager= "'"+ res.manager + "'";
        const list = ["employee.first_name, employee.last_name, role.title, manager.manager_name"];
        const table = ["role, employee, manager"];
        const option = ["role.id = employee.role_id AND employee.manager_id = manager.manager_id AND manager.manager_name="+selectedManager];
        Queries.selectedView(list, table, option, res=>{
            console.table(res);
            startDisplay();
        })
    })
}
var addEmployee = function(){
    orm.addEmpQuestion(roles,manager, res=>{
        var role = roleId(res.role)
        var manager = managerId(res.manager);
        var first = "'" + res.first_name.trim() + "'";
        var last = "'" + res.last_name.trim() +"'";
        var insertData = [first, last, role, manager];
        Queries.insertEmployee(insertData, res=>{
            console.table(res);
            startDisplay();
        })
    })
}
var delEmployee = function(){
    orm.delEmployeeQuestion(employee, res =>{
        var splitName = res.employee.split(" ");
        if(res.confirm){
            Queries.deleteEmployee("'"+splitName[0]+"'", "'"+splitName[1]+"'", res =>{
            console.table(res);
            startDisplay();
            });
        }else{
            startDisplay();
        }
    })
}
var updateEmployee = function(){
    orm.updateEmployeeQuestion(employee, res =>{
        var name = res.employee.split(" ");
        var first = "'" + name[0] + "'";
        var last = "'" + name[1] + "'";
        if(res.updateSection==="role"){
            orm.displayTitle(roles, res =>{
                var result = roleId(res.title)
                console.log(result);
                Queries.updateData("role_id="+result, first, last, res =>{
                    console.table(res);
                    startDisplay();
                })
            });
        }else{
            orm.displayManager(manager, res =>{
                var result = managerId(res.managerName);
                console.log(result);
                Queries.updateData("manager_id="+result, first, last, res =>{
                    console.table(res);
                    startDisplay();
                })
            });
        }
    })
}
function addRoles(){
    orm.addRole(depart, res =>{
        var id = departId(res.department);
        Queries.addRole(res.title, res.salary, id, res =>{
            console.table(res);
            startDisplay();
        })
    })
}
function removeRole(){
    orm.delRole(roles, res =>{
        var title = res.role;
        Queries.removeRole(title, res =>{
            console.table(res);
            startDisplay();
        })
    })
}
function addDepartment(){
    orm.addNewDepartment(res =>{
        Queries.addDepart(res.newDep, res =>{
            console.table(res);
            startDisplay();
        })
    })
}
app.listen(PORT, function(){
    console.log("app is listening on port :" + PORT);
})
