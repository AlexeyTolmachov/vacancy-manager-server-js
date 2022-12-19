"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("../openapi-3.json");
router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerDoc));
exports.default = router;
