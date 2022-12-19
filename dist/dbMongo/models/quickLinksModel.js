"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickLinksModel = exports.joiUpdateQuickLink = exports.joiCreateQuickLink = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const quickLinksSchema = new mongoose_1.Schema({
    linkName: { type: String, required: [true, "link name is required"] },
    link: { type: String }
}, {
    versionKey: false,
    timestamps: true
});
exports.joiCreateQuickLink = joi_1.default.object({
    linkName: joi_1.default.string().required(),
    link: joi_1.default.string()
});
exports.joiUpdateQuickLink = joi_1.default.object({
    id: joi_1.default.string().required(),
    linkName: joi_1.default.string(),
    link: joi_1.default.string()
});
exports.QuickLinksModel = (0, mongoose_1.model)("quickLinks", quickLinksSchema);
// module.exports = { QuickLinksModel, joiUpdateQuickLink, joiCreateQuickLink };
