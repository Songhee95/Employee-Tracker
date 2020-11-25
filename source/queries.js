class Queries{ 
    constructor(data, column, option){
        this.data = data;
        this.column = column;
        this.option = option;
    };
    tableDepartment(){
        var query = "SELECT * FROM department_list";
        return query;
    }
    tableRole(){
        var query = "SELECT * FROM role";
        return query;
    }
    viewAll(){
        var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department_list.department, role.salary, manager.manager_name ";
        query += "FROM employee ";
        query += "LEFT JOIN manager ON employee.manager_id = manager.manager_id ";
        query += "LEFT JOIN role ON role.id = employee.role_id ";
        query += "LEFT JOIN department_list ON department_list.id = role.department_id";
        return query;
    }
    selectedView(){
        var query = "SELECT " + this.data + " FROM " + this.column + " WHERE " + this.option;
        return query;
    }
    insertEmployee(){
        var query = "INSERT INTO employee (" + this.data +") VALUES (" + this.column +")";
        return query; 
    }
    deleteEmployee(){
        var query = "DELETE FROM employee WHERE employee.first_name =" + this.data+ " AND employee.last_name=" + this.column;
        return query;
    }
    updateData(){
        var query = "UPDATE employee SET "+this.data+" WHERE employee.first_name="+this.column+" AND employee.last_name="+ this.option;
        return query; 
    }
    addRole(){
        var query = "INSERT INTO role(title, salary, department_id) VALUES ('"+this.data+"',"+this.column+","+this.option+")";
        return query;
    }
}

module.exports =Queries;