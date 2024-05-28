const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getCourses);
router.get("/:id", controller.getCoursesById);
router.get("/tasks/:id", controller.getTasksByCourseId);
router.get("/tasks/userSolution/:id/:email", controller.getUserSolution);

module.exports = router;
