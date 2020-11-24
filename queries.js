class ViewAll{ 
    constructor(data, column, option){
        this.data = data;
        this.column = column;
        this.option = option;
    };
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
        console.log(query);
        return query; 
    }
}

module.exports =ViewAll;