const router = require("express").Router();
import { auth } from "../middlewares/authMiddleware";
import { validation } from "../middlewares/validation";
import { ctrlWrapper } from "../middlewares/ctrlWrapper";
import { joiCreateQuickLink, joiUpdateQuickLink } from "../dbMongo/models/quickLinksModel";
import quickLinks from"../controller/quickLinks";

router.get( "/", auth, ctrlWrapper(quickLinks.get) );

router.post( "/", auth, validation(joiCreateQuickLink), ctrlWrapper(quickLinks.create) );

router.put( "/", auth, validation(joiUpdateQuickLink), ctrlWrapper(quickLinks.update) );

router.delete( "/", auth, ctrlWrapper(quickLinks.remove) );

export default router;