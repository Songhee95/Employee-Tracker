const Prompt = require("inquirer/lib/prompts/base");

class promptQ {
    addEmpQuestion =function(roles) {
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
            }
        ]   
        return question;
    }
    viewByDepQuestion = function(depart){
        var question = [
            {
                name: 'department',
                type: 'list',
                message: 'Which department would you like to see employees for? ',
                choices: depart,
            }
        ]
        return question;
    }
    viewByManagerQuestion = function(manager){
        var question = [
            {
                name: 'manager',
                type: 'list',
                message: 'Which department would you like to see employees for? ',
                choices: manager
            }
        ]
        return question;
    }
    delEmployeeQuestion = function(employee){
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
        ]
        return question;
    }
    updateEmployeeQuestion = function(employee){
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
                    "title",
                    "department",
                    "salary",
                    "manager_name"
                ]
            }
        ]
        return question;
    }
    displayTitle = function(roles){
        var question = [
            {
                name: "title",
                type: "list",
                message: "Select a role you want to change: ",
                choice: roles
            },
            {
                name: "confirm",
                type:'confirm',
                message: "Do you want to change the employee role? "
            }
        ]
        return question;
    }
    displayDepartment = function(depart){
        var question = [
            {
                name: "department",
                type: "list",
                message: "Select a department you want to change: ",
                choice: depart
            },
            {
                name: "confirm",
                type: "confirm",
                message: "Do you want to change the employee role? "
            }
        ]
        return question;
    }
}

module.exports = promptQ;