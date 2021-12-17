import {Request, Response} from "express";

export const getAll = async (req: Request, res: Response) => {
  res.status(200).json([
    {
      id: 1,
      message: "this is an example",
    },
  ]);
};
