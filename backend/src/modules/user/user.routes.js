const express = require("express");
const router = express.Router();

const userController = require("./user.controller");
const requestIdMiddleware = require("../../middlewares/requestId.mddleware");

router.use(requestIdMiddleware);

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;