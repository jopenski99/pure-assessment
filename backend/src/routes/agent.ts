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

let idCounter = 1;

const router = express.Router();
let agents: PropertyAgent[] = [];

router.get("/", (req: Request, res: Response) => {
  res.json(agents);
});

router.post("/", (req: Request, res: Response) => {
  const { firstName, lastName, email, mobileNumber } = req.body;

  if (!firstName || !lastName || !email || !mobileNumber) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const emailExists = agents.some(agent => agent.email === email);
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists." });
  }


  const newAgent: PropertyAgent = {
    id: idCounter++,
    firstName,
    lastName,
    email,
    mobileNumber,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  agents.push(newAgent);
  return res.status(201).json(newAgent);
});

export default router;