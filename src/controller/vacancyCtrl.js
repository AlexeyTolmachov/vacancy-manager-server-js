const { VacancyModel } = require("../dbMongo/models/vacancyModel");
const httpErrors = require("http-errors");

const get = async (req, res) => {
    const result = await VacancyModel.find(req.query);
    res.json({
        qtty: result.length,
        result
    });
};

const create = async (req, res) => {
    const { companyName, companyURL, source, sourceURL, position, salary, status = "new", rank = 1 } = req.body;
    const result = await VacancyModel.create({ companyName, companyURL, source, sourceURL, position, salary, status, rank });
    res.json({
        message: "Vacancy created",
        result
    });
};
const remove = async (req, res) => {
    const { id } = req.params;
    if (!id) throw httpErrors (400, "id in params is required");

    const result = await VacancyModel.findByIdAndDelete( id );
    if (!result) throw httpErrors (404, `A vacancy with id:${id} not found`);
    
    res.json({
        message: "Vacancy removed",
    });
};

const update = async (req, res) => {

    const { id, companyName, companyURL, source, sourceURL, position, salary, status, rank } = req.body;
    if (!companyName && !companyURL && !source && !sourceURL && !position && !salary && !status && !rank) throw httpErrors(400, "no fields to update");

    const newVacancy = await VacancyModel.findByIdAndUpdate(id, { companyName, companyURL, source, sourceURL, position, salary, status, rank }, { new: true });
    res.json({
        message: "Vacancy updated",
        newVacancy
    });
};
module.exports = { get, create, remove, update };