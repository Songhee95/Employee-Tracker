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
}

module.exports = promptQ;