const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController.js");
router.post("/create", coursesController.create);
router.get("/getAll", coursesController.getAll);
router.get("/getById/:id", coursesController.getById);
router.post("/purchase/:id", coursesController.purchaseCourse);
router.put("/update/:id", coursesController.updateCourse);
router.delete("/delete/:id", coursesController.deleteCourse);

module.exports = router;
