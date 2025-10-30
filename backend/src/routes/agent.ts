import express, { Request, Response } from "express";

interface PropertyAgent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const router = express.Router();
let agents: PropertyAgent[] = [];

router.get("/", (req: Request, res: Response) => {
  res.json(agents);
});

export default router;