const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require("../../middlewaree/authMiddleware");
const roleMiddleware = require("../../middlewaree/roleMiddleware");

router.post("/login", controller.handleAuth);
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);
router.get("/auth", authMiddleware, controller.auth);
router.post("/updateUserData", authMiddleware, controller.updateUserData);
router.post(
  "/updateUserLocation",
  authMiddleware,
  controller.updateUserLocation
);

module.exports = router;
