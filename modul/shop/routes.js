const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getShop);
router.post("/:id", controller.postitemShopById);

module.exports = router;