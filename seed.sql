DROP DATABASE IF EXISTS employee_data;
CREATE DATABASE employee_data;
USE employee_data;

CREATE TABLE department_list(
	id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id)
);

INSERT INTO department_list (department) 
VALUES ("Sales") , ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2),
("Account Manager", 160000, 3), ("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4), ("lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1), ("Mike", "Chan", 2), ("Ashley", "Rodriguez", 3), ("Kevin", "Tupik", 4), ("Kunal", "Singh", 5),
("Malia", "Brown", 6), ("Sarah", "Lourd", 7), ("Tom", "Allen", 8);


SELECT employee.id, employee.first_name, employee.last_name, role.title, department_list.department, role.salary, employee.manager_id
FROM employee, role, department_list
WHERE role.id  = employee.role_id
AND department_list.id = role.department_id;