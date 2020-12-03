var connection = require("./connection.js");

var Queries = { 
    tableManager: function(cb){
        var query = "SELECT * FROM manager";
        connection.query(query, function (err, res){
            if(err) throw err;
            cb(res);
        })
    },
    tableDepartment: function(cb){
        var query = "SELECT * FROM department_list";
        connection.query(query, function(err, res){
            if(err) throw err;
            cb(res);
        })
    },
    tableRole: function(cb){
        var query = "SELECT * FROM role";
        connection.query(query, function(err, res){
            if(err) throw err;
            cb(res);
        })
    },
    viewAll: function(cb){
        var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department_list.department, role.salary, manager.manager_name ";
        query += "FROM employee ";
        query += "LEFT JOIN manager ON employee.manager_id = manager.manager_id ";
        query += "LEFT JOIN role ON role.id = employee.role_id ";
        query += "LEFT JOIN department_list ON department_list.id = role.department_id";
        connection.query(query, function(err, res){
            if(err) throw err;
            cb(res);
        })
    },
    selectedView: function(list, table, option, cb){
        var query = "SELECT " + list + " FROM " + table + " WHERE " + option;
        connection.query(query, function(err, res){
            if(err) throw err;
            cb(res);
        })
    },
    insertEmployee: function(insertData, cb){
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("+insertData+")";
        connection.query(query, function(err, res){
            if(err) throw err;
            cb(res);
        })
    },
    deleteEmployee: function(first, last, cb){
        var query = "DELETE FROM employee WHERE employee.first_name =" + first+ " AND employee.last_name=" + last;
        connection.query(query, function(err, res){
            if(err) throw err;
            cb(res);
        })
    },
    updateData: function(id, first, last, cb){
        var query = "UPDATE employee SET "+id+" WHERE employee.first_name="+first +" AND employee.last_name="+ last;
        connection.query(query, (err, res)=>{
            if(err) throw err;
            cb(res);
        })
    },
    addRole: function(title, salary, id, cb){
        var query = "INSERT INTO role(title, salary, department_id) VALUES ('"+title+"',"+salary+","+id+")";
        connection.query(query, (err, res) =>{
            if(err) throw err;
            cb(res);
        })
    },
    removeRole: function(role, cb){
        var query = "DELETE FROM role WHERE title='"+role+"'";
        connection.query(query, (err, res) =>{
            if(err) throw err;
            cb(res);
        })
    }, 
    addDepart: function(department, cb){
        var query = "INSERT INTO department_list (department) VALUES ('" + department+"')"
        connection.query(query,(err, res) =>{
            if(err) throw err;
            cb(res);
        })
    }
}

module.exports =Queries;