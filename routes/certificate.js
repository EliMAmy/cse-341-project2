const express = require('express');
const router= express.Router();
const  certificateController = require("../controllers/certificate");
const validatorCertificate = require("../middleware/validator");
const { isAuthenticated } = require("../middleware/authenticate");


router.get("/",certificateController.getAll);
router.get("/:id",certificateController.getSingle);

router.post("/", isAuthenticated,
    validatorCertificate.validateCertificate,
    validatorCertificate.validate,
    certificateController.createCertificate);

router.put("/:id", isAuthenticated,
    validatorCertificate.validateCertificate,
    validatorCertificate.validate,
    certificateController.updateCertificate);

router.delete("/:id", isAuthenticated,
    validatorCertificate.validateDeleteCertificate,
    validatorCertificate.validate,
    certificateController.deleteCertificate);


module.exports = router;