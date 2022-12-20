const router = require("express").Router();
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("../openapi-3.json");

router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerDoc));
//@ts-ignore
router.get("/test", (req, res) => res.json({message: "test is OK"}));

export default router;