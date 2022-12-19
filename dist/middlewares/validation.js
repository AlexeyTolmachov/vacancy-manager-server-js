"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
//@ts-ignore
const validation = (schema) => (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        error.status = 400;
        next(error);
        return;
    }
    next();
};
exports.validation = validation;
