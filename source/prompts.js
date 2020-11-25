class promptQ {
    addEmpQuestion =function(roles, manager) {
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
                    "role",
                    "manager"
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
                choices: roles
            }
        ]
        return question;
    }
    displayManager = function(manager){
        var question = [
            {
                name: 'managerName',
                type: "list",
                message: "Select a Manager name you want to change: ",
                choices : manager
            }
        ]
        return question;
    }
    addRole = function(department){
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
        return question;
    }
    delRole = function(depart){
        var question =[
            {
                name: "department",
                type:"list",
                message: "Which department would you like to delete?",
                choices: depart
            }
        ]
        return question;
    }
}

module.exports = promptQ;