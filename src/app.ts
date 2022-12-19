import express, { Request, Response, NextFunction } from "express";
import { IExpressErr } from './interfaces/interfaces';

const cors = require("cors");
import mainRouter from "./routes/mainRouter";
import vacancyRouter from "./routes/vacancies";
import authRouter from "./routes/authRouter";
import quickLinksRouter from "./routes/quickLinks";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", mainRouter);

app.use("/auth", authRouter);
app.use("/vacancy", vacancyRouter);
app.use("/quickLinks", quickLinksRouter);


app.use((req: Request, res: Response) => {
  res.json({ message: "Route not found" });
});

app.use(async (err: IExpressErr, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
