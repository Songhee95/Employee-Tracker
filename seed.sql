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
CREATE TABLE manager(
    manager_id INT NOT NULL,
	manager_name VARCHAR(30) NOT NULL
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id)
);
INSERT INTO manager (manager_id, manager_name)
VALUES (1, "John Doe"), (2, "Ashley Rodriguez"), (3, "Kunal Singh"), (4, "Sarah Lourd");

INSERT INTO department_list (department) 
VALUES ("Sales") , ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2),
("Account Manager", 160000, 3), ("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL), ("Mike", "Chan", 2, 1), ("Ashley", "Rodriguez", 3, NULL), ("Kevin", "Tupik", 4,2), ("Kunal", "Singh", 5, NULL),
("Malia", "Brown", 6, 3), ("Sarah", "Lourd", 7, NULL), ("Tom", "Allen", 8, 4);
