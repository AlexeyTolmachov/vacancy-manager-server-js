"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacancyModel = exports.joiUpdateVacancy = exports.joiCreateVacancy = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const VacancySchema = new mongoose_1.Schema({
    companyName: { type: String, required: true },
    companyURL: { type: String },
    source: { type: String },
    sourceURL: { type: String },
    position: { type: String },
    salary: { type: Number },
    status: { type: String },
    notes: { type: String },
    rank: { type: Number }
}, {
    versionKey: false,
    timestamps: true
});
exports.joiCreateVacancy = joi_1.default.object({
    companyName: joi_1.default.string().min(3).max(30).required(),
    companyURL: joi_1.default.string(),
    source: joi_1.default.string().min(3).max(15),
    sourceURL: joi_1.default.string(),
    position: joi_1.default.string().min(3).max(15),
    salary: joi_1.default.number().min(0).max(999999),
    status: joi_1.default.string(),
    notes: joi_1.default.string().max(500),
    rank: joi_1.default.number().min(1).max(5)
});
exports.joiUpdateVacancy = joi_1.default.object({
    id: joi_1.default.string().required(),
    companyName: joi_1.default.string().min(3).max(30),
    companyURL: joi_1.default.string(),
    source: joi_1.default.string().min(3).max(15),
    sourceURL: joi_1.default.string(),
    position: joi_1.default.string().min(3).max(15),
    salary: joi_1.default.number().min(0).max(999999),
    status: joi_1.default.string(),
    notes: joi_1.default.string().max(500),
    rank: joi_1.default.number().min(1).max(5)
});
exports.VacancyModel = (0, mongoose_1.model)("Vacancies", VacancySchema);
// module.exports = { VacancyModel, joiCreateVacancy, joiUpdateVacancy };
