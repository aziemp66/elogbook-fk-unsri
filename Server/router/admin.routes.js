const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

router.post("/disease", adminController.addDisease);

module.exports = router;
