const express = require('express');
const router= express.Router();

const  coursesController = require("../controllers/courses");
const validatorCourse = require("../validators/validator");

router.get("/",coursesController.getAll);
router.get("/:id",coursesController.getSingle);

router.post("/",
    validatorCourse.validateCourse,
    validatorCourse.validate,
    coursesController.createCourse);

router.put("/:id",    
    validatorCourse.validateCourse,
    validatorCourse.validate,
    coursesController.updateCourse);

router.delete("/:id", 
    validatorCourse.validateDeleteCourse,
    validatorCourse.validate,
    coursesController.deleteCourse);


module.exports = router;