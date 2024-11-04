const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController.js");
router.post("/create", coursesController.create);
router.get("/getAll", coursesController.getAll);
router.get("/getById/:id", coursesController.getById);
router.post("/purchase/:id", coursesController.purchaseCourse);

module.exports = router;
