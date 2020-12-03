const Queries = require('./queries');

const getData = {
    getDepart : function(cb){
        var depart = [];
        var departAndId =[];
        Queries.tableDepartment(res=>{
            res.map(data =>{
                var depName = data.department;
                var depId = data.id; 
                depart.push(depName);
                var obj ={};
                obj.department = depName;
                obj.id = depId; 
                departAndId.push(obj);
            })
            var result = {
                depart: depart,
                departAndId : departAndId
            }
            cb(result);
        });  
    },
    getRole: function(cb){
        var roles =[];
        var roleAndId =[];
        Queries.tableRole(res =>{
            res.map(data =>{
                var roleTitle = data.title;
                var roleId = data.id;
                var obj = {};
                obj.title = roleTitle;
                obj.roleId = roleId;
                roleAndId.push(obj);
                roles.push(roleTitle);
            })
            var result = {
                roles: roles,
                roleAndId: roleAndId
            }
            cb(result);
        })
    },
    getManager: function(cb){
        var manager =[];
        var managerAndId = [];
        Queries.tableManager(res =>{
            res.map(data =>{
                var managerId = data.manager_id;
                var managerName = data.manager_name;
                var obj = {};
                obj.managerName = managerName;
                obj.id = managerId;
                manager.push(managerName);
                managerAndId.push(obj);
            })
            var result = {
                manager: manager,
                managerAndId : managerAndId
            }
            cb(result);
        })
    },
    employee: function(cb){
        var employee =[];
        Queries.viewAll(res =>{
            res.map(data =>{
                var employeeName = data.first_name + " " + data.last_name;
                employee.push(employeeName);
            })
            cb(employee);
        })
    }
}

module.exports = getData;