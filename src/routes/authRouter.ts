import Router from "express";
import { check } from "express-validator";
import controller from "../controller/userController";
import { auth } from "../middlewares/authMiddleware";
import { ctrlWrapper } from "../middlewares/ctrlWrapper";

const router = Router();

router.post("/register", [
    check("username", "username is required").notEmpty(),
    check("password", "from 4 to 10 symbols").isLength({ min: 4, max: 10 })

], ctrlWrapper(controller.registration));
router.post("/login", ctrlWrapper(controller.login));
router.get("/logout", auth, ctrlWrapper(controller.logout));
router.get("/users", auth, ctrlWrapper(controller.getUser));

export default router;