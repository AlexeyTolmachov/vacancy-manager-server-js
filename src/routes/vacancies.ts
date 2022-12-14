const router = require("express").Router();
import { auth } from "../middlewares/authMiddleware";
import { ctrlWrapper } from "../middlewares/ctrlWrapper";
import { validation } from "../middlewares/validation";
import { joiCreateVacancy, joiUpdateVacancy } from "../dbMongo/models/vacancyModel";
import vacancy from "../controller/vacancyCtrl";

router.get("/", auth, ctrlWrapper(vacancy.get));

router.post("/", auth, validation(joiCreateVacancy), ctrlWrapper(vacancy.create));

router.put("/", auth, validation(joiUpdateVacancy), ctrlWrapper(vacancy.update));

router.delete("/", auth, ctrlWrapper(vacancy.remove));

export default router;
