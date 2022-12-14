import { Schema, model } from "mongoose";

const User = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    userToken: { type: String, }
});

export const UserModel= model("User", User);