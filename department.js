class Department{
    constructor(res, roleId, managerId ){
        this.res = res;
        this.roleId = roleId,
        this.managerId = managerId;
    }
    roleInDepartment = function(){
        switch(this.res){
            case ("Sales Lead"):
                this.roleId =1;
                this.managerId = 1;
                return [this.roleId, this.managerId];
            case("Salesperson"):
                this.roleId = 2;
                this.managerId = 1;
                return [this.roleId, this.managerId];
            case("Lead Engineer"):
                this.roleId = 3;
                this.managerId =2;
                return [this.roleId, this.managerId];
            case("Software Engineer"):
                this.roleId = 4;
                this.managerId =2;
                return [this.roleId, this.managerId];
            case("Account Manager"):
                this.roleId = 5;
                this.managerId =3;
                return [this.roleId, this.managerId];
            case("Accountant"):
                this.roleId = 6;
                this.managerId =3;
                return [this.roleId, this.managerId];
            case("Legal Team Lead"):
                this.roleId = 7;
                this.managerId =4;
                return [this.roleId, this.managerId];
            case("Lawyer"):
                this.roleId = 8;
                this.managerId =4;
                return [this.roleId, this.managerId];
        }
    }
}
module.exports = Department;