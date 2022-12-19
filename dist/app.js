"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const mainRouter_1 = __importDefault(require("./routes/mainRouter"));
const vacancies_1 = __importDefault(require("./routes/vacancies"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const quickLinks_1 = __importDefault(require("./routes/quickLinks"));
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.get("/", mainRouter_1.default);
app.use("/auth", authRouter_1.default);
app.use("/vacancy", vacancies_1.default);
app.use("/quickLinks", quickLinks_1.default);
app.use((req, res) => {
    res.json({ message: "Route not found" });
});
app.use((err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
}));
exports.default = app;
