import Joi from "joi";
import { Schema, model } from "mongoose";

const quickLinksSchema = new Schema({
    linkName: {type: String, required: [true, "link name is required"] },
    link: {type: String}
}, {
    versionKey: false,
    timestamps: true
});

export const joiCreateQuickLink = Joi.object({
    linkName: Joi.string().required(),
    link: Joi.string()
});

export const joiUpdateQuickLink = Joi.object({
    id: Joi.string().required(),
    linkName: Joi.string(),
    link: Joi.string()
});


export const QuickLinksModel = model("quickLinks", quickLinksSchema);

// module.exports = { QuickLinksModel, joiUpdateQuickLink, joiCreateQuickLink };