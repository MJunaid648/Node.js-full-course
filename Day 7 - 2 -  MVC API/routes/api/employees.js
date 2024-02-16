const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employees-controller");
router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee);
router.route("/:id").get(employeesController.getEmployee);
router.route("/:id").put(employeesController.updateEmployee);
router.route("/:id").delete(employeesController.deleteEmployee);

module.exports = router;
