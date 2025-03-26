const express = require("express");
const router = express.Router();
const CoatchContoller = require("../controllers/CoatchContoller");

router.get("/", CoatchContoller.getAllUsers);
router.post("/", CoatchContoller.createUser);
router.delete("/:id", CoatchContoller.deleteUser);
router.get("/user/:id", CoatchContoller.getAllWorkout);
router.post("/user/:id", CoatchContoller.createWorkout);
router.delete("/user/:id", CoatchContoller.deleteWorkout);
router.patch("/user/:id", CoatchContoller.updateWorkout);

module.exports = router;
