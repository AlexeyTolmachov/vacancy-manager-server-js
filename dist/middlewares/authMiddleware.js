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
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const http_errors_1 = require("http-errors");
const UserModel_1 = require("../dbMongo/models/UserModel");
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //@ts-ignore
            if (!req.headers.authorization)
                throw new http_errors_1.Unauthorized("No header");
            const [bearer, userToken] = req.headers.authorization.split(" ");
            if (bearer !== "Bearer")
                throw new http_errors_1.Unauthorized("Not authorized not find bearer");
            if (!userToken)
                throw new http_errors_1.Unauthorized("Not authorized not find token");
            const user = yield UserModel_1.UserModel.findOne({ userToken });
            if (!user)
                throw new http_errors_1.Unauthorized("user not authorized ");
            next();
        }
        catch (error) {
            console.log(error);
            res
                .status(401)
                .json({ message: " Вы не авторизованы, сходите авторизуйтесь" });
        }
    });
}
exports.auth = auth;
;
