const inquirer = require("inquirer");

var orm= {
    startPrompt : function(cb){
        var question =[
            {
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
        ]
        inquirer.prompt(question).then(res =>{
            cb(res);
        })
    },
    addEmpQuestion :function(roles, manager, cb) {
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
                name:"manager",
                type:"list",
                message: "Who is your manager?",
                choices: manager
            }
        ]   
        inquirer.prompt(question).then(res =>{
            cb(res);
        })
    },
    viewByDepQuestion : function(depart, cb){
        var question = [
            {
                name: 'department',
                type: 'list',
                message: 'Which department would you like to see employees for? ',
                choices: depart,
            }
        ]
        inquirer.prompt(question)
        .then(res => cb(res));
    },
    viewByManagerQuestion : function(manager,cb){
        return new Promise((resolve, reject) =>{
            var question = [
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Which department would you like to see employees for? ',
                    choices: manager
                }
            ]
            inquirer.prompt(question).then(res =>cb(res))
        })
    },
    delEmployeeQuestion : function(employee, cb){
        var question = [
            {
                name: "employee",
                type: "list",
                message: "Which employee data would you like to delete? ",
                choices: employee
            },
            {
                name: "confirm",
                type: "confirm",
                message:"Are you sure to delete this employee data?",
            }
        ];
        inquirer.prompt(question).then(res =>{
            cb(res);
        })
    },
    updateEmployeeQuestion : function(employee, cb){
        var question = [
            {
                name: "employee",
                type: 'list',
                message: "Which employee data would you like to update?",
                choices : employee
            },
            {
                name: "updateSection",
                type: "list",
                message: "Which part of data would you like to update?",
                choices: [
                    "role",
                    "manager"
                ]
            }
        ]
        inquirer.prompt(question).then(res =>{
            cb(res);
        })
    },
    displayTitle : function(roles, cb){
        var question = [
            {
                name: "title",
                type: "list",
                message: "Select a role you want to change: ",
                choices: roles
            }
        ]
        inquirer.prompt(question).then(res=>{
            cb(res);
        })
    },
    displayManager : function(manager, cb){
        var question = [
            {
                name: 'managerName',
                type: "list",
                message: "Select a Manager name you want to change: ",
                choices : manager
            }
        ]
        inquirer.prompt(question).then(res =>{
            cb(res);
        })
    },
    addRole : function(department, cb){
        var question = [
            {
                name: 'title',
                type: "input",
                message: "Create new employee role: "
            },
            {
                name:'salary',
                type: "input",
                message:"Input salary for this role: "
            },
            {
                name:"department",
                type: "list",
                message:"Select department where this role belongs to: ",
                choices: department
            }
        ]
        inquirer.prompt(question).then(res =>{
            cb(res);
        })
    },
    delRole : function(roles, cb){
        var question =[
            {
                name: "role",
                type:"list",
                message: "Which Role would you like to delete?",
                choices: roles
            }
        ]
        inquirer.prompt(question).then(res =>{
            cb(res);
        })
    },
    addNewDepartment : function(cb){
        var question = [
            {
                name: 'newDep',
                type: 'input',
                message: "Enter New department :"
            }
        ]
        inquirer.prompt(question).then(res =>{
            cb(res);
        })
    }
}

module.exports = orm ;