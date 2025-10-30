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

router.get("/:id", (req: Request, res: Response) => {
  const agent = agents.find(a => a.id === Number(req.params.id));
  if (!agent) return res.status(404).json({ message: "Agent not found." });
  res.json(agent);
});

router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const agentIndex = agents.findIndex(a => a.id === id);
  if (agentIndex === -1)
    return res.status(404).json({ message: "Agent not found." });

  const existing = agents[agentIndex];
  const { firstName, lastName, email, mobileNumber } = req.body;

  const updatedAgent: PropertyAgent = {
    ...existing,
    firstName: firstName ?? existing.firstName,
    lastName: lastName ?? existing.lastName,
    email: email ?? existing.email,
    mobileNumber: mobileNumber ?? existing.mobileNumber,
    updatedAt: new Date(),
  };

  agents[agentIndex] = updatedAgent;
  res.json(updatedAgent);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const agentIndex = agents.findIndex(a => a.id === id);
  if (agentIndex === -1)
    return res.status(404).json({ message: "Agent not found." });

  const deleted = agents.splice(agentIndex, 1);
  res.json({ message: "Agent deleted successfully.", deleted });
});

export default router;