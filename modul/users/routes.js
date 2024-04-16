const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/getUser", controller.getUser);
router.post("/insertUser", controller.insertUser);

module.exports = router;
