const express = require("express");
const router = express.Router();
const WorkoutsContoller = require("../controllers/WorkoutsContoller");

const requireAuth = require("../middleware/requiredAuth");

router.use(requireAuth);

router.get("/", WorkoutsContoller.getAll);
router.get("/:id", WorkoutsContoller.getOne);
router.post("/", WorkoutsContoller.create);
router.delete("/:id", WorkoutsContoller.deleteOne);
router.patch("/:id", WorkoutsContoller.update);

module.exports = router;
