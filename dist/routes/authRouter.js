"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const controller = __importStar(require("../controller/userController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const ctrlWrapper_1 = require("../middlewares/ctrlWrapper");
const router = (0, express_1.default)();
router.post("/register", [
    (0, express_validator_1.check)("username", "username is required").notEmpty(),
    (0, express_validator_1.check)("password", "from 4 to 10 symbols").isLength({ min: 4, max: 10 })
], (0, ctrlWrapper_1.ctrlWrapper)(controller.registration));
router.post("/login", (0, ctrlWrapper_1.ctrlWrapper)(controller.login));
router.get("/logout", authMiddleware_1.auth, (0, ctrlWrapper_1.ctrlWrapper)(controller.logout));
router.get("/users", authMiddleware_1.auth, (0, ctrlWrapper_1.ctrlWrapper)(controller.getUser));
router.get("/google", (0, ctrlWrapper_1.ctrlWrapper)(controller.googleAuth));
router.get("/google-redirect", (0, ctrlWrapper_1.ctrlWrapper)(controller.googleRedirect));
exports.default = router;
