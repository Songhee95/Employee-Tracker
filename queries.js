class ViewAll{ 
    constructor(data, column, option){
        this.data = data;
        this.column = column;
        this.option = option;
    };
    viewAll(){
        var query = "SELECT " + this.data + " FROM " 
        +  this.column +" WHERE " + this.option
        console.log(query)
        return query;
    }
    insertEmployee(){
        var query = "INSERT INTO employee (" + this.data +") VALUES (" + this.column +")";
        console.log(query);
        return query; 
    }
}

module.exports =ViewAll;