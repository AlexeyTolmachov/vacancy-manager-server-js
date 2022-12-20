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
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequest, NotFound, Conflict } = require("http-errors");
const { validationResult } = require("express-validator");
const { secret } = require("../config/config");
const { UserModel } = require("../dbMongo/models/UserModel");
// const queryString = async () =>  await import("query-string");
const queryString = require('querystring');
const axios = require("axios");
const generateAccessToken = (id) => {
    return jwt.sign({ id }, secret);
};
module.exports.registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        throw new BadRequest("ошибка при валидации");
    const { username, password, email } = req.body;
    const candidate = yield UserModel.findOne({ email });
    if (candidate)
        throw new BadRequest("пользователь с таким именем уже существует");
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new UserModel({
        username,
        password: hashPassword,
        email,
        userToken: null,
    });
    yield user.save();
    return res.json({ message: "Пользователь успешно зарегестрирован" });
});
module.exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const user = yield UserModel.findOne({ email });
    if (!user)
        throw new Conflict(`пользователь ${username} не найден `);
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
        throw new BadRequest("введен не верный пароль");
    const token = generateAccessToken(user._id);
    user.userToken = token;
    yield user.save();
    return res.json({ user }); //user
});
module.exports.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [_bearer, token] = req.headers.authorization.split(" ");
    const user = yield UserModel.findOne({ userToken: token });
    if (!user)
        throw new NotFound("no such user");
    user.userToken = null;
    yield user.save();
    return res.json({ message: "User logged Out" });
});
module.exports.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getUsers = yield UserModel.find();
    res.send({ data: getUsers });
});
const { CLIENT_ID, CLIENT_SECRET, BASE_URL, FRONTEND_URL } = process.env;
module.exports.googleAuth = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stringifyedParams = queryString.stringify({
        client_id: CLIENT_ID,
        redirect_uri: `${BASE_URL}/auth/google-redirect`,
        scope: [
            "https://googleapis.com/auth/userinfo.email",
            "https://googleapis.com/auth/userinfo.profile"
        ].join(" "),
        response_type: "code",
        access_type: "offline",
        prompt: "consent"
    });
    return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${stringifyedParams}`);
});
module.exports.googleRedirect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fullURL = `${req.protocol}://${req.get("host")}${req.originalURL}`;
    const urlObj = new URL(fullURL);
    const { code } = queryString.parse(urlObj.search);
    // const code = urlParams.code
    const tokenData = yield axios({
        url: "https://oauth2.googleapis.com/token",
        method: "post",
        data: {
            client_id: CLIENT_ID,
            client_sectret: CLIENT_SECRET,
            redirect_uri: `${BASE_URL}/auth/google-redirect`,
            grant_type: "authorization code",
            code
        }
    });
    const userData = yield axios({
        url: "https://googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`
        }
    });
    if (!userData)
        throw BadRequest("Google have no data");
    // const getUser = UserModel.findOne({email: userData.data.email});
    // if (!getUser) {
    //   googleRegistration();
    // } else {
    //   googleLogin();
    // };
    res.json({
        message: "Google response",
        userData
    });
    // return res.redirect(`${FRONTEND_URL}?email=${userData.data.email}`)
});
