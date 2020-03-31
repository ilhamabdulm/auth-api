const router = require("express").Router();
const UserController = require("../controllers/userController");

router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
router.post("/users/verify/:id", UserController.verifyCode);
router.patch("/users/reset-password", UserController.resetPassword);

module.exports = router;
