const { Router } = require("express");
const controller = require("../controllers/auth-controller");

const router = Router();

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/refresh", controller.refresh);

module.exports = router;
