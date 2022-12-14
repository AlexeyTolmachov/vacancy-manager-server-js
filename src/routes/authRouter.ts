import Router from "express";
import { check } from "express-validator";
import controller from "../controller/userController";
import { auth } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", [
    check("username", "username is required").notEmpty(),
    check("password", "from 4 to 10 symbols").isLength({ min: 4, max: 10 })

], controller.registration);
router.post("/login", controller.login);
router.get("/logout", auth, controller.logout);
router.get("/users", auth, controller.getUser);

export default router;