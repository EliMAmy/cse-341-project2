const router= require("express").Router();

router.use("/",require("./swagger"));

router.get("/", (req, res) => {
    //#swagger.tags=["Hello World"]
    res.send("Hello pani");
});

router.use("/courses", require("./courses"));
router.use("/certificate", require("./certificate"));

module.exports= router;