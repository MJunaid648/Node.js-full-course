let employees = require("../model/employees.json");

const getAllEmployees = (req, res) => {
  res.json(employees);
};

const getEmployee = (req, res) => {
  const id = +req.params.id;
  const employee = employees.filter((emp) => emp.id === id);
  if (!employee) {
    res.status(400).send("Not employee found with the given id");
  } else {
    res.json(employee);
  }
};

const createNewEmployee = (req, res) => {
  newEmployee = {
    id: employees.length + 1,
    firstname: req.body.firstName,
    lastname: req.body.lastName,
  };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
};

const updateEmployee = (req, res) => {
  id = +req.params.id;
  let index = employees.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    let updatedEmployee = {
      id,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
    };
    updatedEmployee = { ...employees[index], ...req.body };
    employees[index] = updatedEmployee;
    res.json(updatedEmployee);
  } else {
    resstatus(400).send("Not employee found with the given id");
  }
  console.log(employees);
};

const deleteEmployee = (req, res) => {
  id = +req.params.id;
  let index = employees.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    res.json(employees[index]);
    employees.splice(index, 1);
  } else {
    res.status(400).send("Not employee found with the given id");
  }
  console.log(employees);
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
};
