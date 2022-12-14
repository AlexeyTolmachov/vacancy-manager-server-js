import { Request, Response, NextFunction } from "express";
const { Unauthorized } = require("http-errors");
const UserModel = require("../dbMongo/models/UserModel");

export async function auth (req: Request, res: Response, next: NextFunction) {
    try {
        //@ts-ignore
        const [bearer, userToken] = req.headers.authorization.split(" ");
        if (bearer !== "Bearer")
            throw new Unauthorized("Not authorized not find bearer");
        if (!userToken) throw new Unauthorized("Not authorized not find token");
        const user = await UserModel.findOne({ userToken });
        if (!user) {
            throw new Unauthorized("user not authorized ");
        }
        next();
    } catch (error) {
        console.log(error);
        res
            .status(401)
            .json({ message: " Вы не авторизованы, сходите авторизуйтесь" });
    }
};
