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
const { VacancyModel } = require("../dbMongo/models/vacancyModel");
const httpErrors = require("http-errors");
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield VacancyModel.find(req.query);
    res.json({
        qtty: result.length,
        result
    });
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, companyURL, source, sourceURL, position, salary, status = "new", rank = 1 } = req.body;
    const result = yield VacancyModel.create({ companyName, companyURL, source, sourceURL, position, salary, status, rank });
    res.json({
        message: "Vacancy created",
        result
    });
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        throw httpErrors(400, "id in params is required");
    const result = yield VacancyModel.findByIdAndDelete(id);
    if (!result)
        throw httpErrors(404, `A vacancy with id:${id} not found`);
    res.json({
        message: "Vacancy removed",
    });
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, companyName, companyURL, source, sourceURL, position, salary, status, rank } = req.body;
    if (!companyName && !companyURL && !source && !sourceURL && !position && !salary && !status && !rank)
        throw httpErrors(400, "no fields to update");
    const newVacancy = yield VacancyModel.findByIdAndUpdate(id, { companyName, companyURL, source, sourceURL, position, salary, status, rank }, { new: true });
    res.json({
        message: "Vacancy updated",
        newVacancy
    });
});
module.exports = { get, create, remove, update };
