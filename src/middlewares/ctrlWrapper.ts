import { Request, Response, NextFunction } from "express";

export const ctrlWrapper = (ctrl: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ctrl(req, res, next);
  } catch (error) {
    // console.log("error in ctrl wrapper")
    next(error);
  }
};