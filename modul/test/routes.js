const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/:id", controller.getTest);

module.exports = router;
