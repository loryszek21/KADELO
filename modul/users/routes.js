const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/getuser", controller.getUser);
router.post("/insertuser", controller.insertUser);

module.exports = router;
