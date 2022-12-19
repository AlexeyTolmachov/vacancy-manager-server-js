"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const userController_1 = __importDefault(require("../controller/userController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.default)();
router.post("/register", [
    (0, express_validator_1.check)("username", "username is required").notEmpty(),
    (0, express_validator_1.check)("password", "from 4 to 10 symbols").isLength({ min: 4, max: 10 })
], userController_1.default.registration);
router.post("/login", userController_1.default.login);
router.get("/logout", authMiddleware_1.auth, userController_1.default.logout);
router.get("/users", authMiddleware_1.auth, userController_1.default.getUser);
exports.default = router;
