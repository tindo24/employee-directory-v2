import express from "express";
import employees from "#db/employees";

const router = express.Router();

// GET /employees - list all employees
router.get("/", (req, res) => {
  res.send(employees);
});

// GET /employees/random - get a random employee
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

// GET /employees/:id - get employee by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

// POST /employees - add new employee
router.post("/", (req, res) => {
  // Check if req.body exists
  if (!req.body) {
    return res.status(400).send("Request body required");
  }

  const { name } = req.body;

  // Validate name presence and type
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).send("Invalid employee name provided");
  }

  // Create new employee with unique ID
  const newId =
    employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
  const newEmployee = { id: newId, name: name.trim() };

  employees.push(newEmployee);

  res.status(201).send(newEmployee);
});

export default router;
