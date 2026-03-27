const express = require('express');
const router= express.Router();
const  certificateController = require("../controllers/certificate");
const validatorCertificate = require("../validators/validator");


router.get("/",certificateController.getAll);
router.get("/:id",certificateController.getSingle);

router.post("/",
    validatorCertificate.validateCertificate,
    validatorCertificate.validate,
    certificateController.createCertificate);

router.put("/:id",    
    validatorCertificate.validateCertificate,
    validatorCertificate.validate,
    certificateController.updateCertificate);

router.delete("/:id", 
    validatorCertificate.validateDeleteCertificate,
    validatorCertificate.validate,
    certificateController.deleteCertificate);


module.exports = router;