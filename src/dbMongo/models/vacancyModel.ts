import { Schema, model } from "mongoose";
import Joi from "joi";

const VacancySchema = new Schema({
  companyName: { type: String, required: true },
  companyURL: { type: String },
  source: { type: String },
  sourceURL: { type: String },
  position: { type: String },
  salary: { type: Number },
  status: { type: String },
  notes: {type: String},
  rank: { type: Number }
}, {
  versionKey: false,
  timestamps: true
});

export const joiCreateVacancy = Joi.object({
  companyName: Joi.string().min(3).max(30).required(),
  companyURL: Joi.string(), // validate for URL ?
  source: Joi.string().min(3).max(15),
  sourceURL: Joi.string(),
  position: Joi.string().min(3).max(15),
  salary: Joi.number().min(0).max(999999),
  status: Joi.string(),
  notes: Joi.string().max(500),
  rank: Joi.number().min(1).max(5)
});

export const joiUpdateVacancy = Joi.object({
  id: Joi.string().required(),
  companyName: Joi.string().min(3).max(30),
  companyURL: Joi.string(), // validate for URL ?
  source: Joi.string().min(3).max(15),
  sourceURL: Joi.string(),
  position: Joi.string().min(3).max(15),
  salary: Joi.number().min(0).max(999999),
  status: Joi.string(),
  notes: Joi.string().max(500),
  rank: Joi.number().min(1).max(5)
});

export const VacancyModel = model("Vacancies", VacancySchema);
// module.exports = { VacancyModel, joiCreateVacancy, joiUpdateVacancy };
