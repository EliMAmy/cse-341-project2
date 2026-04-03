const express = require('express');
const router= express.Router();

const  coursesController = require("../controllers/courses");
const validatorCourse = require("../middleware/validator");
const { isAuthenticated } = require("../middleware/authenticate");

router.use(isAuthenticated);

router.get("/",coursesController.getAll);
router.get("/:id",coursesController.getSingle);

router.post("/",isAuthenticated,
    validatorCourse.validateCourse,
    validatorCourse.validate,
    coursesController.createCourse);

router.put("/:id", isAuthenticated,   
    validatorCourse.validateCourse,
    validatorCourse.validate,
    coursesController.updateCourse);

router.delete("/:id", isAuthenticated,
    validatorCourse.validateDeleteCourse,
    validatorCourse.validate,
    coursesController.deleteCourse);


module.exports = router;