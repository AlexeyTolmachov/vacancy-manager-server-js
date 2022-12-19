"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const authMiddleware_1 = require("../middlewares/authMiddleware");
const ctrlWrapper_1 = require("../middlewares/ctrlWrapper");
const validation_1 = require("../middlewares/validation");
const vacancyModel_1 = require("../dbMongo/models/vacancyModel");
const vacancyCtrl_1 = __importDefault(require("../controller/vacancyCtrl"));
router.get("/", authMiddleware_1.auth, (0, ctrlWrapper_1.ctrlWrapper)(vacancyCtrl_1.default.get));
router.post("/", authMiddleware_1.auth, (0, validation_1.validation)(vacancyModel_1.joiCreateVacancy), (0, ctrlWrapper_1.ctrlWrapper)(vacancyCtrl_1.default.create));
router.put("/", authMiddleware_1.auth, (0, validation_1.validation)(vacancyModel_1.joiUpdateVacancy), (0, ctrlWrapper_1.ctrlWrapper)(vacancyCtrl_1.default.update));
router.delete("/", authMiddleware_1.auth, (0, ctrlWrapper_1.ctrlWrapper)(vacancyCtrl_1.default.remove));
exports.default = router;
