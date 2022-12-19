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
const httpErrors = require("http-errors");
const { QuickLinksModel } = require("../dbMongo/models/quickLinksModel");
const get = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const links = yield QuickLinksModel.find();
    res.json({ links });
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { linkName, link } = req.body;
    const newLinkName = yield QuickLinksModel.findOne({ linkName });
    if (newLinkName)
        throw httpErrors(409, "link name already exist");
    const newLink = yield QuickLinksModel.create({ linkName, link });
    res.json({
        message: "A new link created successfully",
        newLink
    });
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        throw httpErrors(400, "id in params is required");
    const result = yield QuickLinksModel.findByIdAndDelete(id);
    if (!result)
        throw httpErrors(404, `A link with id:${id} not found`);
    res.json({
        message: "Vacancy removed successfully",
    });
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, linkName, link } = req.body;
    if (!linkName && !link)
        throw httpErrors(400, "no fields to update");
    const newVacancy = yield QuickLinksModel.findByIdAndUpdate(id, { linkName, link }, { new: true });
    res.json({
        message: "Vacancy updated",
        newVacancy
    });
});
module.exports = { get, create, remove, update };
