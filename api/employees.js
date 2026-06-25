import express from "express";
import app from "#app";
import { getEmployee, getEmployees, getRandomEmployee } from "#db/employees";

const router = express.Router();

router.get("/", (req, res) => {
  const employees = getEmployees();
  res.status(200).send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
router.get("/random", (req, res) => {
  const employee = getRandomEmployee();
  res.send(employee);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = getEmployee(+id);

  if (!employee) {
    return res.status(404).send(`Employee #${id} not found.`);
  }

  res.send(employee);
});
// POST /employees adds a new employee with the provided name from the request body
// Send 400 if request body or name is not correctly provided
// Send 201 with the new employee if name is correctly provided
// The new employee's ID should be unique (using the array index is fine!)

router.post("/", (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).send();
  }
  const employees = getEmployees();
  const id = employees.length + 1;
  const newEmployee = { id, name: req.body.name };
  employees.push(newEmployee);
  return res.status(201).send(newEmployee);
});
export default router;
